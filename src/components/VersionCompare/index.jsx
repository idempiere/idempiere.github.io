import React, {useEffect, useMemo, useState} from 'react';
import clsx from 'clsx';
import {usePluginData} from '@docusaurus/useGlobalData';
import {useHistory, useLocation} from '@docusaurus/router';
import ChangeItem from './ChangeItem';
import UpgradeActions, {tagLabel} from './UpgradeActions';
import styles from './styles.module.css';

function compareVersions(a, b) {
  const pa = a.split('.').map(Number);
  const pb = b.split('.').map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const diff = (pa[i] || 0) - (pb[i] || 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

const AUDIENCES = [
  {id: 'all', label: 'Everyone'},
  {id: 'developer', label: 'Developers'},
  {id: 'consultant', label: 'Consultants and testers'},
  {id: 'admin', label: 'Admins'},
];

function readQuery(search, versions, defaults) {
  const params = new URLSearchParams(search);
  const pick = (key) => {
    const value = params.get(key);
    return versions.includes(value) ? value : defaults[key];
  };
  return {
    from: pick('from'),
    to: pick('to'),
    category: params.get('category') || 'all',
    notes: params.get('notes') === '1',
    topic: params.get('topic') || 'all',
    audience: AUDIENCES.some((a) => a.id === params.get('audience'))
      ? params.get('audience')
      : 'all',
  };
}

function CopyLinkButton() {
  const [status, setStatus] = useState(null);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setStatus('Link copied');
    } catch {
      setStatus('Copy failed. Copy the address bar instead.');
    }
  };
  return (
    <div className={styles.copyLink}>
      <button type="button" className="button button--secondary button--sm" onClick={copy}>
        Copy link to this view
      </button>
      <span role="status" className={styles.copyStatus}>
        {status || 'Opens this exact comparison, filters included.'}
      </span>
    </div>
  );
}

export default function VersionCompare() {
  const {releases, categories} = usePluginData('version-compare');
  const location = useLocation();
  const history = useHistory();

  const versions = useMemo(() => releases.map((r) => r.version), [releases]);
  // Default to the last two releases, so the page opens on a short, current
  // list instead of every feature since 1.0.
  const defaults = useMemo(
    () => ({
      from: versions[Math.max(0, versions.length - 3)],
      to: versions[versions.length - 1],
    }),
    [versions],
  );

  const [state, setState] = useState({
    ...defaults,
    category: 'all',
    audience: 'all',
    notes: false,
    topic: 'all',
  });
  const [ready, setReady] = useState(false);

  // The page is prerendered without a query string, so the URL is read after
  // hydration instead of during render.
  useEffect(() => {
    setState(readQuery(location.search, versions, defaults));
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!ready) return;
    const params = new URLSearchParams();
    params.set('from', state.from);
    params.set('to', state.to);
    if (state.category !== 'all') params.set('category', state.category);
    if (state.notes) params.set('notes', '1');
    if (state.notes && state.audience !== 'all') params.set('audience', state.audience);
    if (state.notes && state.topic !== 'all') params.set('topic', state.topic);
    const search = `?${params.toString()}`;
    if (search !== location.search) {
      history.replace({...location, search});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, state]);

  const update = (patch) => setState((s) => ({...s, ...patch}));
  const invalidRange = compareVersions(state.from, state.to) >= 0;

  const selected = useMemo(
    () =>
      releases
        .filter(
          (r) =>
            compareVersions(r.version, state.from) > 0 &&
            compareVersions(r.version, state.to) <= 0,
        )
        .map((r) => ({
          ...r,
          changes: r.changes.filter(
            (c) => state.category === 'all' || c.categories.includes(state.category),
          ),
          notes: r.notes.filter(
            (page) =>
              !state.notes ||
              ((state.audience === 'all' || page.audience.includes(state.audience)) &&
                (state.topic === 'all' || page.tags.includes(state.topic))),
          ),
        })),
    [releases, state],
  );

  const labels = useMemo(
    () => Object.fromEntries(categories.map((c) => [c.id, c.label])),
    [categories],
  );

  const changes = selected.flatMap((r) => r.changes);
  const rangeChanges = useMemo(
    () =>
      releases
        .filter(
          (r) =>
            compareVersions(r.version, state.from) > 0 &&
            compareVersions(r.version, state.to) <= 0,
        )
        .flatMap((r) => r.changes),
    [releases, state.from, state.to],
  );
  const noteCount = selected.reduce(
    (n, r) => n + r.notes.reduce((m, page) => m + page.items.length, 0),
    0,
  );
  // Topics are the thematic tags of the migration pages in this range.
  const topics = useMemo(() => {
    const found = new Set();
    for (const r of releases) {
      if (compareVersions(r.version, state.from) <= 0) continue;
      if (compareVersions(r.version, state.to) > 0) continue;
      for (const page of r.notes) page.tags.forEach((t) => found.add(t));
    }
    return [...found].sort((a, b) => tagLabel(a).localeCompare(tagLabel(b)));
  }, [releases, state.from, state.to]);
  const countBy = (category) =>
    rangeChanges.filter((c) => c.categories.includes(category)).length;

  return (
    <div className={styles.compare}>
      <div className={styles.controls}>
        <label className={styles.field}>
          <span>From</span>
          <select value={state.from} onChange={(e) => update({from: e.target.value})}>
            {versions.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.field}>
          <span>To</span>
          <select value={state.to} onChange={(e) => update({to: e.target.value})}>
            {versions.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </label>
        <CopyLinkButton />
      </div>

      {invalidRange ? (
        <div className="alert alert--danger" role="alert">
          Pick a target version newer than the starting one.
        </div>
      ) : (
        <>
          <p className={styles.range}>
            Changes after iDempiere {state.from}, up to and including {state.to}.
          </p>

          <dl className={styles.summary}>
            <div className={styles.card}>
              <dt>Releases</dt>
              <dd>{selected.length}</dd>
            </div>
            <div className={styles.card}>
              <dt>Migration notes</dt>
              <dd>{noteCount}</dd>
            </div>
            <div className={styles.card}>
              <dt>New features</dt>
              <dd>{changes.length}</dd>
            </div>
          </dl>

          <label className={styles.notesToggle} htmlFor="vc-show-notes">
            <input
              id="vc-show-notes"
              type="checkbox"
              checked={state.notes}
              onChange={(e) => update({notes: e.target.checked})}
            />
            <span>
              Show migration notes
              <span className={styles.notesHint}>
                What to check when you upgrade: breaking changes, removed APIs,
                database and platform changes, from the Migration Notes docs.
              </span>
            </span>
          </label>

          {state.notes && (
            <>
              <div className={styles.chips} role="group" aria-label="Show migration notes for">
                {AUDIENCES.map(({id, label}) => (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={state.audience === id}
                    className={clsx(styles.chip, state.audience === id && styles.chipActive)}
                    onClick={() => update({audience: id})}>
                    {label}
                  </button>
                ))}
              </div>

              {topics.length > 0 && (
                <div className={styles.chips} role="group" aria-label="Filter migration notes by topic">
                  {[{id: 'all', label: 'All topics'}, ...topics.map((t) => ({id: t, label: tagLabel(t)}))].map(
                    ({id, label}) => (
                      <button
                        key={id}
                        type="button"
                        aria-pressed={state.topic === id}
                        className={clsx(styles.chip, state.topic === id && styles.chipActive)}
                        onClick={() => update({topic: id})}>
                        {label}
                      </button>
                    ),
                  )}
                </div>
              )}

              <UpgradeActions
                releases={releases}
                selected={selected}
                from={state.from}
                to={state.to}
                compareVersions={compareVersions}
              />
            </>
          )}

          <section aria-labelledby="new-features">
            <h2 id="new-features">New features</h2>
            <div className={styles.chips} role="group" aria-label="Filter features by category">
              {[{id: 'all', label: 'All'}, ...categories].map(({id, label}) => {
                const count = id === 'all' ? rangeChanges.length : countBy(id);
                return (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={state.category === id}
                    disabled={count === 0 && state.category !== id}
                    className={clsx(styles.chip, state.category === id && styles.chipActive)}
                    onClick={() => update({category: id})}>
                    {label} <span className={styles.chipCount}>{count}</span>
                  </button>
                );
              })}
            </div>

            {changes.length === 0 && (
              <p>No features in this range match the selected category.</p>
            )}

            {selected
              .filter((r) => r.changes.length > 0)
              .map((release) => (
                <div key={release.version} className={styles.release}>
                  <h3 id={`v${release.version}`}>
                    iDempiere {release.version}{' '}
                    <span className={styles.releaseCount}>
                      {release.changes.length}{' '}
                      {release.changes.length === 1 ? 'feature' : 'features'}
                    </span>
                  </h3>
                  <ul className={styles.changes}>
                    {release.changes.map((change) => (
                      <ChangeItem
                        key={change.id}
                        change={change}
                        labels={labels}
                      />
                    ))}
                  </ul>
                </div>
              ))}
          </section>
        </>
      )}
    </div>
  );
}
