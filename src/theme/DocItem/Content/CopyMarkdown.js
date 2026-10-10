import React, { useEffect, useState } from 'react';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import styles from './styles.module.css';

// docusaurus-plugin-llms writes a Markdown copy of each page to <permalink>.md
// at build time. Older release notes are excluded, and the files do not exist
// in `npm start`, so the button only shows when the file is there.
export default function CopyMarkdown() {
  const { metadata } = useDoc();
  const mdUrl = `${metadata.permalink}.md`;
  const [available, setAvailable] = useState(false);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    let cancelled = false;
    fetch(mdUrl, { method: 'HEAD' })
      .then((res) => {
        if (!cancelled) setAvailable(res.ok);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [mdUrl]);

  if (!available) {
    return null;
  }

  const copy = async () => {
    try {
      const text = fetch(mdUrl).then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.text();
      });
      if (typeof ClipboardItem !== 'undefined') {
        // Passing a promise keeps the user gesture alive in Safari.
        await navigator.clipboard.write([
          new ClipboardItem({
            'text/plain': text.then((t) => new Blob([t], { type: 'text/plain' })),
          }),
        ]);
      } else {
        await navigator.clipboard.writeText(await text);
      }
      setStatus('copied');
    } catch (e) {
      setStatus('failed');
    }
    setTimeout(() => setStatus('idle'), 2000);
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
