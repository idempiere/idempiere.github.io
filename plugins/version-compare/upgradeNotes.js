// Loads upgrade-notes/<version>.yml: the breaking changes, required actions
// and platform requirements per release that the feature articles don't
// record. Each file is validated against upgrade-notes/_schema.json and the
// build fails with the file name and the failing path when it doesn't match.

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const Ajv = require('ajv');

const NOTES_DIR = 'upgrade-notes';

function formatErrors(file, errors) {
  const lines = errors.map((e) => {
    const where = e.instancePath || '(root)';
    const extra = e.params && e.params.allowedValues
      ? ` (${e.params.allowedValues.join(', ')})`
      : '';
    return `  ${where}: ${e.message}${extra}`;
  });
  return `[version-compare] ${file} is invalid:\n${lines.join('\n')}`;
}

function loadUpgradeNotes(siteDir) {
  const dir = path.join(siteDir, NOTES_DIR);
  if (!fs.existsSync(dir)) return new Map();

  const schema = JSON.parse(fs.readFileSync(path.join(dir, '_schema.json'), 'utf8'));
  const validate = new Ajv({allErrors: true}).compile(schema);

  const notes = new Map();
  const ids = new Map();
  const files = fs.readdirSync(dir).filter((f) => /\.ya?ml$/.test(f)).sort();

  for (const file of files) {
    const rel = `${NOTES_DIR}/${file}`;
    let data;
    try {
      // CORE_SCHEMA keeps dates and version numbers such as 12.1 as strings.
      data = yaml.load(fs.readFileSync(path.join(dir, file), 'utf8'), {
        schema: yaml.CORE_SCHEMA,
      });
    } catch (e) {
      throw new Error(`[version-compare] ${rel} is not valid YAML: ${e.message}`);
    }
    if (!validate(data)) {
      throw new Error(formatErrors(rel, validate.errors));
    }
    if (notes.has(data.version)) {
      throw new Error(
        `[version-compare] ${rel}: version "${data.version}" is also used in ${notes.get(data.version).file}`,
      );
    }
    for (const change of data.changes) {
      if (ids.has(change.id)) {
        throw new Error(
          `[version-compare] ${rel}: duplicate id "${change.id}", already used in ${ids.get(change.id)}`,
        );
      }
      ids.set(change.id, rel);
    }
    notes.set(data.version, {
      file: rel,
      requirements: data.requirements || {},
      upgrade: data.changes.map((c) => ({
        ...c,
        steps: c.steps || [],
        refs: {jira: c.refs.jira || [], pr: c.refs.pr || []},
      })),
    });
  }
  return notes;
}

module.exports = {loadUpgradeNotes, NOTES_DIR};
