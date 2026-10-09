import React from 'react';
import Layout from '@theme/Layout';
import DocsChangelog, {SoftwareChangesLinks} from './index';

// Route component registered by plugins/docs-changelog. `changelog` is the
// data module the plugin created, so only this page loads it.
export default function ChangelogPage({changelog}) {
  const {releaseNotesUrl, compareUrl} = changelog;
  return (
    <Layout
      title="Docs changelog"
      description="What changed in this documentation, where, and for whom.">
      <main className="container margin-vert--lg">
        <div style={{maxWidth: 860, margin: '0 auto'}}>
          <h1>Docs changelog</h1>
          <p>
            What changed in this documentation, and in which section. Open an
            entry to see the pages.
            {(releaseNotesUrl || compareUrl) && (
              <>
                {' '}For changes to the software itself, see{' '}
                <SoftwareChangesLinks releaseNotesUrl={releaseNotesUrl} compareUrl={compareUrl} />.
              </>
            )}
          </p>
        </div>
        <DocsChangelog data={changelog} />
      </main>
    </Layout>
  );
}
