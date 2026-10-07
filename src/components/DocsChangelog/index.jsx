import React, {useEffect, useMemo, useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {usePluginData} from '@docusaurus/useGlobalData';
import {useHistory, useLocation} from '@docusaurus/router';
import styles from './styles.module.css';

const VERBS = {A: 'added', M: 'updated', R: 'moved', D: 'removed'};
const HEADINGS = {A: 'Added', M: 'Updated', R: 'Moved', D: 'Removed'};

function monthLabel(date) {
  const [year, month] = date.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, 1)).toLocaleDateString('en', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

function summary(counts) {
  return Object.keys(VERBS)
    .filter((k) => counts[k])
    .map((k) => `${counts[k]} ${VERBS[k]}`)
    .join(' · ');
}

function SectionTags({sections, labels}) {
  if (sections.length > 2) {
    return <span className={styles.tag}>Several sections</span>;
  }
  return sections.map((s) => (
    <span key={s} className={styles.tag}>
      {labels[s] || s}
    </span>
  ));
}

// Links to where changes to the software itself are listed, joined with
// "and". Null when the site configures neither.
export function SoftwareChangesLinks() {
  const {releaseNotesUrl, compareUrl} = usePluginData('docs-changelog');
  const links = [
    releaseNotesUrl && <Link key="notes" to={releaseNotesUrl}>Release notes</Link>,
    compareUrl && <Link key="compare" to={compareUrl}>Compare versions</Link>,
  ].filter(Boolean);
  if (!links.length) return null;
  return links.length === 2 ? <>{links[0]} and {links[1]}</> : links[0];
}

function Details({entry}) {
  if (entry.kind === 'release-notes') {
    return (
      <p className={styles.detailText}>
        Release notes describe changes to the software itself. See{' '}
        <SoftwareChangesLinks />.
      </p>
    );
  }
  return (
    <div className={styles.details}>
      {Object.keys(HEADINGS).map((status) => {
        const pages = entry.pages.filter((p) => p.status === status);
        if (!pages.length) return null;
        return (
          <div key={status}>
            <h4 className={styles.detailHeading}>{HEADINGS[status]}</h4>
            <ul className={styles.pageList}>
              {pages.map((p) => (
                <li key={p.title + p.url}>
                  {p.url ? <Link to={p.url}>{p.title}</Link> : <span className={styles.gone}>{p.title}</span>}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
      {entry.source && (
        <p className={styles.source}>
          {entry.source.commitUrl ? (
            <a href={entry.source.commitUrl}>Commit {entry.source.commit}</a>
          ) : (
            `Commit ${entry.source.commit}`
          )}
          {entry.source.pr && (
            <>
              {' · '}
              <a href={entry.source.pr.url}>Pull request #{entry.source.pr.id}</a>
            </>
          )}
          {entry.source.tickets.map((t) => (
            <React.Fragment key={t.id}>
              {' · '}
              <a href={t.url}>{t.id}</a>
            </React.Fragment>
          ))}
          {' · '}
          {entry.source.author}
        </p>
      )}
    </div>
  );
}

function Entry({entry, compact, labels, questionsUrl}) {
  const day = Number(entry.date.slice(8, 10));
  return (
    <li className={clsx(styles.entry, compact && styles.compact)}>
      <span className={styles.day}>{day}</span>
      <details className={styles.body}>
        <summary className={styles.summary}>
          <span className={styles.title}>{entry.title}</span>
          <span className={styles.meta}>
            {summary(entry.counts)}
            {entry.answers.length > 0 && (
              <>
                {' · answers '}
                {entry.answers.map((id) =>
                  questionsUrl ? (
                    <a key={id} href={questionsUrl} className={styles.answer}>
                      {id}
                    </a>
                  ) : (
                    <span key={id} className={styles.answer}>
                      {id}
                    </span>
                  ),
                )}
              </>
            )}
          </span>
        </summary>
        <Details entry={entry} />
      </details>
      <span className={styles.tags}>
        <SectionTags sections={entry.sections} labels={labels} />
      </span>
    </li>
  );
}

function Month({label, entries, ...rest}) {
  const main = entries.filter((e) => e.kind !== 'small');
  const small = entries.filter((e) => e.kind === 'small');
  return (
    <section className={styles.month}>
      <h2 className={styles.monthHeading}>{label}</h2>
      <ul className={styles.list}>
        {main.map((e) => (
          <Entry key={e.id} entry={e} {...rest} />
        ))}
      </ul>
      {small.length > 0 && (
        <details className={styles.small}>
          <summary>
            + {small.length} small update{small.length === 1 ? '' : 's'}
          </summary>
          <ul className={styles.list}>
            {small.map((e) => (
              <Entry key={e.id} entry={e} compact {...rest} />
            ))}
          </ul>
        </details>
      )}
    </section>
  );
}

export default function DocsChangelog() {
  const {entries, sections, questionsUrl} = usePluginData('docs-changelog');
  const chips = [{id: 'all', label: 'All'}, ...sections];
  const labels = Object.fromEntries(sections.map((s) => [s.id, s.label]));
  const location = useLocation();
  const history = useHistory();
  // The static HTML is rendered without a query string, so the filter from
  // the URL is applied after hydration to keep the first render identical.
  const [section, setSection] = useState('all');
  useEffect(() => {
    const requested = new URLSearchParams(location.search).get('section');
    setSection(labels[requested] ? requested : 'all');
  }, [location.search]); // eslint-disable-line react-hooks/exhaustive-deps

  const months = useMemo(() => {
    const visible =
      section === 'all' ? entries : entries.filter((e) => e.sections.includes(section));
    const grouped = new Map();
    for (const entry of visible) {
      const key = entry.date.slice(0, 7);
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key).push(entry);
    }
    return [...grouped.entries()];
  }, [entries, section]);

  const select = (id) => {
    history.replace({search: id === 'all' ? '' : `?section=${encodeURIComponent(id)}`});
  };

  return (
    <div className={styles.changelog}>
      <div className={styles.chips} role="group" aria-label="Filter by section">
        {chips.map((s) => (
          <button
            key={s.id}
            type="button"
            className={clsx(styles.chip, s.id === section && styles.chipActive)}
            aria-pressed={s.id === section}
            onClick={() => select(s.id)}>
            {s.label}
          </button>
        ))}
      </div>
      {months.length === 0 && <p>No changes in this section yet.</p>}
      {months.map(([key, list]) => (
        <Month
          key={key}
          label={monthLabel(`${key}-01`)}
          entries={list}
          labels={labels}
          questionsUrl={questionsUrl}
        />
      ))}
    </div>
  );
}
