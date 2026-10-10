import React from 'react';
import Content from '@theme-original/DocItem/Content';
import CopyMarkdown from './CopyMarkdown';

export default function ContentWrapper(props) {
  return (
    <>
      <CopyMarkdown />
      <Content {...props} />
    </>
  );
}
