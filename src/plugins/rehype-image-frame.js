/**
 * Marks standalone images so custom.css can frame them.
 *
 * CSS cannot tell a paragraph that holds only an image from one where an
 * image sits inside a sentence: `:only-child` ignores text nodes. This
 * plugin decides at build time instead:
 *
 * - A paragraph whose only content is images (or links around images), one
 *   or more, gets the class `doc-image-frame`.
 * - An image placed straight in a list item, on its own line after the
 *   item's text, gets the class `doc-image-block`.
 *
 * Images inside a sentence get no class and stay inline.
 * Images can be plain `img` elements or MDX JSX elements, because
 * Docusaurus rewrites local images to JSX before this plugin runs.
 */

const isWhitespace = (node) => node.type === 'text' && node.value.trim() === '';

const nameOf = (node) => {
  if (node.type === 'element') return node.tagName;
  if (node.type === 'mdxJsxTextElement' || node.type === 'mdxJsxFlowElement') return node.name;
  return null;
};

const isImage = (node) => nameOf(node) === 'img';

const content = (node) => (node.children || []).filter((c) => !isWhitespace(c));

const isLinkedImage = (node) => {
  if (nameOf(node) !== 'a') return false;
  const inner = content(node);
  return inner.length === 1 && isImage(inner[0]);
};

function addClass(node, cls) {
  if (node.type === 'element') {
    const current = node.properties.className || [];
    node.properties.className = [...(Array.isArray(current) ? current : [current]), cls];
    return;
  }
  const attrs = node.attributes || (node.attributes = []);
  const existing = attrs.find((a) => a.type === 'mdxJsxAttribute' && a.name === 'className');
  if (existing && typeof existing.value === 'string') {
    existing.value = `${existing.value} ${cls}`;
  } else if (!existing) {
    attrs.push({type: 'mdxJsxAttribute', name: 'className', value: cls});
  }
}

function walk(node) {
  const name = nameOf(node);
  if (name === 'p') {
    // Only images (one or more, each on its own line), no text.
    const inner = content(node).filter((c) => nameOf(c) !== 'br');
    if (inner.length > 0 && inner.every((c) => isImage(c) || isLinkedImage(c))) {
      addClass(node, 'doc-image-frame');
    }
  }
  if (name === 'li') {
    const kids = node.children || [];
    kids.forEach((child, i) => {
      if (!isImage(child)) return;
      const prev = kids.slice(0, i).reverse().find((c) => !(c.type === 'text' && c.value === ''));
      // On its own line: first in the item, or right after a line break.
      const ownLine = !prev || (prev.type === 'text' && /\n\s*$/.test(prev.value)) || nameOf(prev) === 'br';
      if (ownLine) addClass(child, 'doc-image-block');
    });
  }
  (node.children || []).forEach(walk);
}

module.exports = function rehypeImageFrame() {
  return (tree) => walk(tree);
};
