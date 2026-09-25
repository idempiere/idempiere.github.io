import React, {useEffect, useMemo, useState} from 'react';
import clsx from 'clsx';
import {usePluginData} from '@docusaurus/useGlobalData';
import {useHistory, useLocation} from '@docusaurus/router';
import ChangeItem from './ChangeItem';
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
        Copy link
      </button>
      <span role="status" className={styles.copyStatus}>
        {status}
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

  const [state, setState] = useState({...defaults, category: 'all'});
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
            (c) => state.category === 'all' || c.category === state.category,
          ),
        })),
    [releases, state],
  );

  const labels = useMemo(
    () => Object.fromEntries(categories.map((c) => [c.id, c.label])),
    [categories],
  );

  const changes = selected.flatMap((r) => r.changes);
  const countBy = (category) => changes.filter((c) => c.category === category).length;

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

      <div className={styles.chips} role="group" aria-label="Filter by category">
        {[{id: 'all', label: 'All'}, ...categories].map(({id, label}) => (
          <button
            key={id}
            type="button"
            aria-pressed={state.category === id}
            className={clsx(styles.chip, state.category === id && styles.chipActive)}
            onClick={() => update({category: id})}>
            {label}
          </button>
        ))}
      </div>

      {invalidRange ? (
        <div className="alert alert--danger" role="alert">
          Pick a target version newer than the starting one.
        </div>
      ) : (
        <>
          <p className={styles.range}>
            Features added after iDempiere {state.from}, up to and including {state.to}.
          </p>

          <dl className={styles.summary}>
            <div className={styles.card}>
              <dt>Releases</dt>
              <dd>{selected.length}</dd>
            </div>
            <div className={styles.card}>
              <dt>Features</dt>
              <dd>{changes.length}</dd>
            </div>
            {state.category === 'all' &&
              categories
                .filter(({id}) => countBy(id) > 0)
                .map(({id, label}) => (
                  <div key={id} className={styles.card}>
                    <dt>{label}</dt>
                    <dd>{countBy(id)}</dd>
                  </div>
                ))}
          </dl>

          {changes.length === 0 && (
            <p>No features in this range match the selected category.</p>
          )}

          {selected
            .filter((r) => r.changes.length > 0)
            .map((release) => (
              <section key={release.version} className={styles.release}>
                <h2 id={`v${release.version}`}>
                  iDempiere {release.version}{' '}
                  <span className={styles.releaseCount}>
                    {release.changes.length}{' '}
                    {release.changes.length === 1 ? 'feature' : 'features'}
                  </span>
                </h2>
                <ul className={styles.changes}>
                  {release.changes.map((change) => (
                    <ChangeItem
                      key={change.id}
                      change={change}
                      categoryLabel={labels[change.category] || change.category}
                    />
                  ))}
                </ul>
              </section>
            ))}
        </>
      )}
    </div>
  );
}
