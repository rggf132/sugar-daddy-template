import DOMPurify from 'dompurify'
import parse from 'html-react-parser'

export function sanitizeAndParse(html: string) {
  const clean = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'b',
      'i',
      'em',
      'strong',
      'a',
      'p',
      'br',
      'ul',
      'ol',
      'li',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'blockquote',
      'span',
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'style'],
  })
  return parse(clean)
}
