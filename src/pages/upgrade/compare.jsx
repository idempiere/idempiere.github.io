import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import VersionCompare from '@site/src/components/VersionCompare';

export default function ComparePage() {
  return (
    <Layout
      title="Compare versions"
      description="See the iDempiere features added between two versions.">
      <main className="container margin-vert--lg">
        <h1>Compare versions</h1>
        <p>
          Pick the version you run and the version you want to move to. The list
          shows every feature documented in{' '}
          <Link to="/docs/category/new-features">New Features</Link> for the releases
          in between.
        </p>
        <VersionCompare />
      </main>
    </Layout>
  );
}
