import {useDeferredValue, useEffect, useRef, useState} from 'react';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import styles from './styles.module.css';

/**
 * A System Configurator key in a key table: `<Key>ZK_THEME</Key>`.
 *
 * Renders the key in code format with an anchor (#ZK_THEME), so links from
 * other pages land on its row, and registers the anchor with the Docusaurus
 * broken-link check. Use `<Key deprecated>` for a key that is no longer used.
 */
export function Key({children, deprecated = false}) {
  const id = String(children).trim();
  useBrokenLinks().collectAnchor(id);
  const code = <code>{id}</code>;
  return (
    <span id={id} className={styles.key}>
      {deprecated ? <del title="Deprecated">{code}</del> : code}
    </span>
  );
}

/**
 * Filter box for the System Configurator key tables.
 *
 * There are too many keys to scan, and their names cannot be grouped by
 * topic, so readers look a key up by typing part of its name or a word from
 * its description. Place the box right before the key tables in an MDX page.
 * It works on the tables and headings that follow it, so the tables stay
 * plain Markdown and contributors keep adding keys as rows.
 * Press "/" anywhere on the page to jump to the box.
 */
export default function SysConfigFilter() {
  const rootRef = useRef(null);
  const inputRef = useRef(null);
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const [counts, setCounts] = useState({shown: 0, total: 0});

  // The tables (and the heading before each) that follow the box.
  const getSections = () => {
    const sections = [];
    let heading = null;
    for (let el = rootRef.current?.nextElementSibling; el; el = el.nextElementSibling) {
      if (el.tagName === 'H2') break; // the next section of the page
      if (el.tagName === 'H3') heading = el;
      if (el.tagName === 'TABLE') sections.push({heading, table: el});
    }
    return sections;
  };

  // Bring the box to the top of the screen, so results start right below it
  // and the page does not jump while rows are hidden.
  const scrollBoxToTop = () => {
    const box = rootRef.current;
    if (!box) return;
    const navbar = document.querySelector('.navbar')?.offsetHeight ?? 60;
    const top = box.getBoundingClientRect().top + window.scrollY - navbar - 16;
    if (Math.abs(window.scrollY - top) > 4) window.scrollTo({top});
  };

  // Style the key tables once and count the keys.
  useEffect(() => {
    const sections = getSections();
    sections.forEach(({table}) => table.classList.add(styles.keyTable));
    const total = sections.reduce((n, {table}) => n + table.tBodies[0].rows.length, 0);
    setCounts({shown: total, total});
  }, []);

  // "/" focuses the box, as on GitHub and MDN.
  useEffect(() => {
    const onKey = (e) => {
      const t = e.target;
      const typing = t instanceof HTMLElement && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));
      if (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        scrollBoxToTop();
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Apply the filter.
  useEffect(() => {
    const words = deferredQuery.toLowerCase().split(/\s+/).filter(Boolean);
    let shown = 0;
    getSections().forEach(({heading, table}) => {
      let visible = 0;
      for (const row of table.tBodies[0].rows) {
        const match = words.every((w) => row.textContent.toLowerCase().includes(w));
        if (row.hidden === match) row.hidden = !match;
        if (match) visible += 1;
      }
      const hide = visible === 0;
      if (table.hidden !== hide) table.hidden = hide;
      if (heading && heading.hidden !== hide) heading.hidden = hide;
      shown += visible;
    });
    setCounts((c) => (c.shown === shown ? c : {...c, shown}));
  }, [deferredQuery]);

  const onChange = (e) => {
    if (!query && e.target.value) scrollBoxToTop(); // first keystroke of a search
    setQuery(e.target.value);
  };

  const clear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  const noMatch = deferredQuery.trim() !== '' && counts.shown === 0;

  return (
    <div ref={rootRef} className={styles.filter}>
      <div className={styles.box}>
        <label htmlFor="sysconfig-filter" className={styles.label}>
          Filter keys
          <span className={styles.hint}>
            Press <kbd>/</kbd> to jump here
          </span>
        </label>
        <div className={styles.row}>
          <input
            ref={inputRef}
            id="sysconfig-filter"
            type="search"
            className={styles.input}
            placeholder="Key name or word, for example EMAIL or login"
            value={query}
            onChange={onChange}
            onKeyDown={(e) => e.key === 'Escape' && clear()}
            autoComplete="off"
            spellCheck={false}
          />
          <span className={styles.count} aria-live="polite">
            {deferredQuery.trim() ? `${counts.shown} of ${counts.total} keys` : `${counts.total} keys`}
          </span>
        </div>
      </div>
      {noMatch && (
        <div className={styles.empty} role="status">
          <p className={styles.emptyTitle}>No key matches "{deferredQuery.trim()}"</p>
          <p className={styles.emptyText}>
            Try part of the key name, such as <code>ZK_</code> or <code>EMAIL</code>, or a word from the
            description.
          </p>
          <button type="button" className={styles.clear} onClick={clear}>
            Clear filter
          </button>
        </div>
      )}
    </div>
  );
}
