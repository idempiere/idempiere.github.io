import React from 'react';
import Layout from '@theme/Layout';
import {usePluginData} from '@docusaurus/useGlobalData';
import DocsChangelog, {SoftwareChangesLinks} from '@site/src/components/DocsChangelog';

export default function ChangelogPage() {
  const {releaseNotesUrl, compareUrl} = usePluginData('docs-changelog');
  const hasSoftwareLinks = Boolean(releaseNotesUrl || compareUrl);
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
            {hasSoftwareLinks && (
              <>
                {' '}For changes to the software itself, see <SoftwareChangesLinks />.
              </>
            )}
          </p>
        </div>
        <DocsChangelog />
      </main>
    </Layout>
  );
}
