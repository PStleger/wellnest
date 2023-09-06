export function sanitiseHTML(input) {
  // Define a list of allowed HTML tags and attributes
  const allowedTags = [
    'p', 'a', 'span', 'strong', 'em', 'ul', 'ol', 'li',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'u'
  ];
  const allowedAttributes = ['href'];

  // Use a regular expression to remove disallowed tags and attributes
  return input.replace(/<\/?[^>]+(>|$)/g, (tag) => {
    const tagName = tag.split(' ')[0].slice(1);
    if (allowedTags.includes(tagName)) {
      // If the tag is allowed, check and clean its attributes
      const cleanedTag = `<${tagName}`;
      const tagAttributes = tag.match(/[^<\s]+="[^"]*"/g);
      if (tagAttributes) {
        tagAttributes.forEach((attr) => {
          const [attrName, attrValue] = attr.split('=');
          if (allowedAttributes.includes(attrName)) {
            cleanedTag += ` ${attr}`;
          }
        });
      }
      return `${cleanedTag}>`;
    }
    return '';
  });
}
