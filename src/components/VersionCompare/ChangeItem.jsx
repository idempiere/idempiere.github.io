import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const JIRA_BROWSE = 'https://idempiere.atlassian.net/browse/';

export default function ChangeItem({change, categoryLabel}) {
  return (
    <li className={styles.change}>
      <div className={styles.changeHeader}>
        <span className={clsx(styles.badge, styles[`badge-${change.category}`])}>
          {categoryLabel}
        </span>
        <Link to={change.permalink} className={styles.changeTitle}>
          {change.title}
        </Link>
      </div>
      {change.description && (
        <p className={styles.changeDescription}>{change.description}</p>
      )}
      {change.jira.length > 0 && (
        <div className={styles.refs}>
          {change.jira.map((key) => (
            <a key={key} href={JIRA_BROWSE + key} target="_blank" rel="noopener noreferrer">
              {key}
            </a>
          ))}
        </div>
      )}
    </li>
  );
}
