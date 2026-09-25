// Loads platform-requirements/<version>.yml: the Java, ZK, Jetty and database
// versions each release needs. Each file is validated against
// platform-requirements/_schema.json and the build fails with the file name
// and the failing path when it doesn't match.

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const Ajv = require('ajv');

const REQUIREMENTS_DIR = 'platform-requirements';

function formatErrors(file, errors) {
  const lines = errors.map((e) => {
    const where = e.instancePath || '(root)';
    const extra = e.params && e.params.additionalProperty
      ? ` ("${e.params.additionalProperty}")`
      : '';
    return `  ${where}: ${e.message}${extra}`;
  });
  return `[version-compare] ${file} is invalid:\n${lines.join('\n')}`;
}

function loadRequirements(siteDir) {
  const dir = path.join(siteDir, REQUIREMENTS_DIR);
  const result = new Map();
  if (!fs.existsSync(dir)) return result;

  const schema = JSON.parse(fs.readFileSync(path.join(dir, '_schema.json'), 'utf8'));
  const validate = new Ajv({allErrors: true}).compile(schema);
  const files = fs.readdirSync(dir).filter((f) => /\.ya?ml$/.test(f)).sort();

  for (const file of files) {
    const rel = `${REQUIREMENTS_DIR}/${file}`;
    let data;
    try {
      // CORE_SCHEMA keeps values such as 12.1 or 2024-12-15 as strings.
      data = yaml.load(fs.readFileSync(path.join(dir, file), 'utf8'), {
        schema: yaml.CORE_SCHEMA,
      });
    } catch (e) {
      throw new Error(`[version-compare] ${rel} is not valid YAML: ${e.message}`);
    }
    if (!validate(data)) {
      throw new Error(formatErrors(rel, validate.errors));
    }
    if (result.has(data.version)) {
      throw new Error(
        `[version-compare] ${rel}: version "${data.version}" is also used in ${result.get(data.version).file}`,
      );
    }
    result.set(data.version, {file: rel, requirements: data.requirements});
  }
  return result;
}

module.exports = {loadRequirements, REQUIREMENTS_DIR};
