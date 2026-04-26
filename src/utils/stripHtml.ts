export const stripHtml = (html?: string) => {
  if (!html) return '';

  return (
    new DOMParser().parseFromString(html, 'text/html').body.textContent ?? ''
  );
};
