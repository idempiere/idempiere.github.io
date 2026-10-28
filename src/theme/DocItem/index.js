import React from 'react';
import DocItem from '@theme-original/DocItem';
import Giscus from '@giscus/react';
import { useColorMode } from '@docusaurus/theme-common';

export default function DocItemWrapper(props) {
  const { colorMode } = useColorMode();
  return (
    <>
      <DocItem {...props} />
      <Giscus
              id = "comments"
              repo = "idempiere/idempiere.github.io"
              repoId = "R_kgDOJPlqug"
              category = "Announcements"
              categoryId = "DIC_kwDOJPlqus4CXavE"
              mapping = "title"
              strict = "1"
              reactionsEnabled = "1"
              emitMetadata = "0"
              inputPosition = "top"
              theme = {colorMode === 'dark' ? 'transparent_dark' : 'light'}
              lang = "en"
              loading = "lazy"
              crossorigin = "anonymous"
          />
    </>
  );
}
