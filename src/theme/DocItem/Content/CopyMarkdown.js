import React, { useEffect, useRef, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
// Docusaurus 3 exports useDoc from the docs plugin's client entry. Check this
// import when upgrading Docusaurus.
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import styles from './styles.module.css';

// docusaurus-plugin-llms writes a Markdown copy of each page to <permalink>.md
// at build time, except for the folders in llmsExcludedDirs. The check runs on
// the source path, so the buttons render on the server with no extra request
// and no layout shift. The files do not exist in `npm start`.
function hasMarkdownCopy(source, excludedDirs) {
  if (process.env.NODE_ENV === 'development') {
    return false;
  }
  const docPath = source.replace(/^@site\/docs\//, '');
  return !excludedDirs.some((dir) => docPath.startsWith(`${dir}/`));
}

async function writeToClipboard(textPromise) {
  if (typeof ClipboardItem !== 'undefined') {
    try {
      // Passing a promise keeps the user gesture alive in Safari.
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/plain': textPromise.then((t) => new Blob([t], { type: 'text/plain' })),
        }),
      ]);
      return;
    } catch (e) {
      // Fall through to writeText.
    }
  }
  await navigator.clipboard.writeText(await textPromise);
}

export default function CopyMarkdown() {
  const { metadata } = useDoc();
  const { siteConfig } = useDocusaurusContext();
  const [status, setStatus] = useState('idle');
  const resetTimer = useRef(null);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  if (!hasMarkdownCopy(metadata.source, siteConfig.customFields.llmsExcludedDirs)) {
    return null;
  }

  const mdUrl = `${metadata.permalink}.md`;

  const copy = async () => {
    const text = fetch(mdUrl).then((res) => {
      if (!res.ok) throw new Error(res.statusText);
      return res.text();
    });
    try {
      await writeToClipboard(text);
      setStatus('copied');
    } catch (e) {
      setStatus('failed');
    }
    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setStatus('idle'), 2000);
  };

  const label =
    status === 'copied' ? 'Copied' : status === 'failed' ? 'Copy failed' : 'Copy page as Markdown';

  return (
    <div className={styles.bar}>
      <button type="button" className={styles.button} onClick={copy}>
        {label}
      </button>
      <a className={styles.button} href={mdUrl} target="_blank" rel="noopener">
        View as Markdown
      </a>
    </div>
  );
}
