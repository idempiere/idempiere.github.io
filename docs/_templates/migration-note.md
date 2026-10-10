<!--
Migration notes are sections in an existing file, not separate pages.
Add the section to docs/migration-notes/v<NN>/<file>.md, where <file> is:

- technical-notes.md: developers and administrators
- functional-notes.md: consultants and functional users
- removed-deprecated-apis.md: removed or deprecated APIs, for plug-in developers

The version compare page treats each ## section as one note and shows its
first prose paragraph as the summary. Keep that paragraph plain: no list,
code, table or admonition before it.
-->

## <What changed, in a few words>

<One plain paragraph: what changed in this release and why.>

**Who is affected:** <developers with plug-ins that use X | administrators | users of window Y>  
**Ticket:** [IDEMPIERE-####](https://idempiere.atlassian.net/browse/IDEMPIERE-####)

### What to do

1. <Action.>
2. <Action.>

```java
// Before
<old code>

// After
<new code>
```

:::warning

<Only for the step that breaks a system if skipped.>

:::

See [<feature page title>](</docs/new-features/vNN/page>).
