import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const JIRA_BROWSE = 'https://idempiere.atlassian.net/browse/';

const REQUIREMENT_LABELS = {
  java: 'Java',
  zk: 'ZK',
  jetty: 'Jetty',
  postgresql: 'PostgreSQL',
  oracle: 'Oracle',
};

const AUDIENCE_PLURALS = {
  developer: 'developers',
  consultant: 'consultants and testers',
  admin: 'admins',
};

const ACRONYMS = new Set(['api', 'sql', 'ui', 'zk', 'uuid', 'jdbc', 'osgi']);

// "breaking-change" -> "Breaking change", "removed-api" -> "Removed API"
export function tagLabel(tag) {
  const words = tag.split(/[-_]+/).map((w) => (ACRONYMS.has(w) ? w.toUpperCase() : w));
  const text = words.join(' ');
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// The latest value of each requirement at or below `version`.
function requirementsAt(releases, version, compareVersions) {
  const result = {};
  for (const release of releases) {
    if (compareVersions(release.version, version) > 0) break;
    for (const [key, req] of Object.entries(release.requirements || {})) {
      result[key] = req;
    }
  }
  return result;
}

function RequirementsDelta({releases, from, to, compareVersions}) {
  const before = requirementsAt(releases, from, compareVersions);
  const after = requirementsAt(releases, to, compareVersions);
  const rows = Object.keys(REQUIREMENT_LABELS).filter(
    (key) => after[key] && (!before[key] || before[key].value !== after[key].value),
  );
  if (rows.length === 0) return null;
  return (
    <div className={styles.requirementsBox}>
      <h3>Platform changes</h3>
      <ul className={styles.requirements}>
        {rows.map((key) => (
          <li key={key}>
            <strong>{REQUIREMENT_LABELS[key]}</strong>{' '}
            {before[key] ? `${before[key].value} → ${after[key].value}` : after[key].value}{' '}
            <a href={after[key].source} target="_blank" rel="noopener noreferrer">
              source
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function storageKey(from, to, itemId) {
  return `vc:${from}-${to}:${itemId}`;
}

// "Reviewed" ticks are kept per from/to range in localStorage. All access runs
// in effects or event handlers and is wrapped in try/catch, since storage is
// unavailable during the static build and can be blocked in the browser.
function useChecklist(keys) {
  const [checked, setChecked] = useState({});
  const keyList = keys.join('|');

  useEffect(() => {
    const next = {};
    try {
      for (const key of keys) {
        if (window.localStorage.getItem(key) === '1') next[key] = true;
      }
    } catch {
      // Storage blocked: ticks only last for this visit.
    }
    setChecked(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyList]);

  const toggle = (key) => {
    setChecked((prev) => {
      const value = !prev[key];
      try {
        if (value) window.localStorage.setItem(key, '1');
        else window.localStorage.removeItem(key);
      } catch {
        // Storage blocked: keep the tick in memory only.
      }
      return {...prev, [key]: value};
    });
  };
  return [checked, toggle];
}

function NoteItem({item, checkKey, checked, toggle}) {
  return (
    <li className={styles.note}>
      <input
        id={checkKey}
        type="checkbox"
        checked={checked}
        onChange={toggle}
        aria-label={`Reviewed: ${item.title}`}
      />
      <div className={clsx(styles.noteBody, checked && styles.noteDone)}>
        <Link to={item.permalink} className={styles.changeTitle}>
          {item.title}
        </Link>
        {item.summary && <p className={styles.changeDescription}>{item.summary}</p>}
        {item.jira.length > 0 && (
          <div className={styles.refs}>
            {item.jira.map((key) => (
              <a key={key} href={JIRA_BROWSE + key} target="_blank" rel="noopener noreferrer">
                {key}
              </a>
            ))}
          </div>
        )}
      </div>
    </li>
  );
}

export default function UpgradeActions({releases, selected, from, to, compareVersions}) {
  const withNotes = selected.filter((r) => r.notes.length > 0);
  const keys = withNotes.flatMap((r) =>
    r.notes.flatMap((page) => page.items.map((item) => storageKey(from, to, item.id))),
  );
  const [checked, toggle] = useChecklist(keys);
  const done = keys.filter((k) => checked[k]).length;

  return (
    <section className={styles.upgrade} aria-labelledby="before-you-upgrade">
      <h2 id="before-you-upgrade">Before you upgrade</h2>
      <RequirementsDelta
        releases={releases}
        from={from}
        to={to}
        compareVersions={compareVersions}
      />
      {withNotes.length === 0 ? (
        <p className={styles.muted}>
          No migration notes match this range and filter. The features below
          are still worth reading.
        </p>
      ) : (
        <>
          <p className={styles.progress} role="status">
            {done} of {keys.length} notes reviewed. Tick a note once you have
            checked it for your installation.
          </p>
          {withNotes.map((release) => (
            <div key={release.version} className={styles.upgradeRelease}>
              <h3>iDempiere {release.version}</h3>
              {release.notes.map((page) => (
                <div key={page.id} className={styles.notePage}>
                  <div className={styles.notePageHeader}>
                    <Link to={page.permalink} className={styles.notePageTitle}>
                      {page.kind} notes
                    </Link>
                    <span className={styles.audience}>
                      For {page.audience.map((a) => AUDIENCE_PLURALS[a]).join(', ')}
                    </span>
                    {page.tags.map((tag) => (
                      <span key={tag} className={clsx(styles.badge, styles[`tag-${tag}`])}>
                        {tagLabel(tag)}
                      </span>
                    ))}
                  </div>
                  <ul className={styles.notes}>
                    {page.items.map((item) => {
                      const key = storageKey(from, to, item.id);
                      return (
                        <NoteItem
                          key={key}
                          item={item}
                          checkKey={key}
                          checked={!!checked[key]}
                          toggle={() => toggle(key)}
                        />
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </>
      )}
    </section>
  );
}
