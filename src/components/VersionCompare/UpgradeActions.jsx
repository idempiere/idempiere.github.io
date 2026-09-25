import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import CodeBlock from '@theme/CodeBlock';
import styles from './styles.module.css';

const JIRA_BROWSE = 'https://idempiere.atlassian.net/browse/';

export const TYPE_LABELS = {
  breaking: 'Breaking change',
  incompatible: 'Backward incompatible',
  disruptive: 'Disruptive change',
  action: 'Action needed',
  requirement: 'Requirement',
  deprecation: 'Deprecated',
};

const AUDIENCE_PLURALS = {
  developer: 'developers',
  consultant: 'consultants and testers',
  admin: 'admins',
};

const REQUIREMENT_LABELS = {
  java: 'Java',
  postgresql: 'PostgreSQL',
  oracle: 'Oracle',
  zk: 'ZK',
};

// Renders `code` spans in otherwise plain text.
function InlineText({text}) {
  return text.split(/(`[^`]+`)/g).map((part, i) =>
    part.startsWith('`') && part.endsWith('`') ? (
      <code key={i}>{part.slice(1, -1)}</code>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    ),
  );
}

// The latest value of each requirement at or below `version`.
function requirementsAt(releases, version, compareVersions) {
  const result = {};
  for (const release of releases) {
    if (compareVersions(release.version, version) > 0) break;
    for (const [key, req] of Object.entries(release.requirements || {})) {
      result[key] = {...req, version: release.version};
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
  );
}

function storageKey(from, to, changeId, index) {
  return `vc:${from}-${to}:${changeId}:${index}`;
}

function Step({step, checked, onToggle, id}) {
  return (
    <li className={styles.step}>
      <label className={styles.stepLabel} htmlFor={id}>
        <input id={id} type="checkbox" checked={checked} onChange={onToggle} />
        <span className={clsx(checked && styles.stepDone)}>
          <InlineText text={step.text} />
        </span>
      </label>
      {step.code && (
        <div className={styles.stepCode}>
          <CodeBlock language={step.lang || 'text'}>{step.code.trimEnd()}</CodeBlock>
        </div>
      )}
    </li>
  );
}

function ActionItem({action, from, to, checked, toggle}) {
  return (
    <li className={styles.change}>
      <div className={styles.changeHeader}>
        <span className={clsx(styles.badge, styles[`type-${action.type}`])}>
          {TYPE_LABELS[action.type]}
        </span>
        <span className={styles.area}>{action.area}</span>
        <span className={styles.changeTitle}>{action.title}</span>
      </div>
      <p className={styles.changeDescription}>
        <InlineText text={action.description} />
      </p>
      {action.steps.length > 0 && (
        <ol className={styles.steps}>
          {action.steps.map((step, i) => {
            const key = storageKey(from, to, action.id, i);
            return (
              <Step
                key={key}
                id={key}
                step={step}
                checked={!!checked[key]}
                onToggle={() => toggle(key)}
              />
            );
          })}
        </ol>
      )}
      <div className={styles.refs}>
        <span className={styles.audience}>
          For {action.audience.map((x) => AUDIENCE_PLURALS[x]).join(' and ')}
        </span>
        {action.refs.jira.map((key) => (
          <a key={key} href={JIRA_BROWSE + key} target="_blank" rel="noopener noreferrer">
            {key}
          </a>
        ))}
        {action.refs.pr.map((url) => (
          <a key={url} href={url} target="_blank" rel="noopener noreferrer">
            {url.replace(/^https?:\/\/(www\.)?github\.com\//, '')}
          </a>
        ))}
        {action.docs && <Link to={action.docs}>Read more</Link>}
      </div>
    </li>
  );
}

// Checkbox ticks are kept per from/to range in localStorage. All access runs
// in effects and is wrapped in try/catch, since storage is unavailable during
// the static build and can be blocked in the browser.
function useChecklist(from, to, keys) {
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
  }, [from, to, keyList]);

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

export default function UpgradeActions({releases, selected, from, to, compareVersions}) {
  const withActions = selected.filter((r) => r.upgrade.length > 0);
  const keys = withActions.flatMap((r) =>
    r.upgrade.flatMap((a) => a.steps.map((_, i) => storageKey(from, to, a.id, i))),
  );
  const [checked, toggle] = useChecklist(from, to, keys);
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
      {withActions.length === 0 ? (
        <p className={styles.muted}>
          No upgrade notes are recorded for these releases yet. The features
          below are still worth reading.
        </p>
      ) : (
        <>
          {keys.length > 0 && (
            <p className={styles.progress} role="status">
              {done} of {keys.length} steps done
            </p>
          )}
          {withActions.map((release) => (
            <div key={release.version} className={styles.upgradeRelease}>
              <h3>iDempiere {release.version}</h3>
              <ul className={styles.changes}>
                {release.upgrade.map((action) => (
                  <ActionItem
                    key={action.id}
                    action={action}
                    from={from}
                    to={to}
                    checked={checked}
                    toggle={toggle}
                  />
                ))}
              </ul>
            </div>
          ))}
        </>
      )}
    </section>
  );
}
