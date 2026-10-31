/* Stamps content hashes onto the links to the shared stylesheet and scripts, so
   a deploy can never pair fresh HTML with a styles.css or script.js that a
   browser or CDN cached from an earlier deploy: any change to a file changes
   its URL. `npm run dev` and `npm run build:pole` run this for you; otherwise
   run `npm run version-assets` after editing styles.css, script.js or
   pole3d.min.js. */
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

const hashOf = (file) =>
  crypto.createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex').slice(0, 10);

function rewrite(file, replacements) {
  const full = path.join(root, file);
  const before = fs.readFileSync(full, 'utf8');
  const after = replacements.reduce((text, [pattern, replacement]) => text.replace(pattern, replacement), before);
  if (after === before) return false;
  fs.writeFileSync(full, after);
  return true;
}

function htmlFiles() {
  const inDir = (dir) => fs.readdirSync(path.join(root, dir))
    .filter(name => name.endsWith('.html'))
    .map(name => path.join(dir, name));
  return [...inDir('.'), ...inDir('articles')];
}

function versionAssets() {
  const changed = [];

  // script.js imports the pole bundle, so stamp that first: script.js's own
  // hash then changes whenever the bundle does.
  const pole = hashOf('pole3d.min.js');
  if (rewrite('script.js', [[/import\('\.\/pole3d\.min\.js(?:\?v=[^']*)?'\)/g, `import('./pole3d.min.js?v=${pole}')`]])) {
    changed.push('script.js');
  }

  const styles = hashOf('styles.css');
  const script = hashOf('script.js');
  htmlFiles().forEach((file) => {
    const updated = rewrite(file, [
      [/((?:href|src)="(?:\.\.\/)?styles\.css)(?:\?v=[^"]*)?"/g, `$1?v=${styles}"`],
      [/((?:href|src)="(?:\.\.\/)?script\.js)(?:\?v=[^"]*)?"/g, `$1?v=${script}"`]
    ]);
    if (updated) changed.push(file);
  });

  return { versions: { 'styles.css': styles, 'script.js': script, 'pole3d.min.js': pole }, changed };
}

module.exports = { versionAssets };

if (require.main === module) {
  const { versions, changed } = versionAssets();
  console.log(Object.entries(versions).map(([file, v]) => `${file}?v=${v}`).join('  '));
  console.log(changed.length ? `Updated ${changed.length} file(s).` : 'Already up to date.');
}
