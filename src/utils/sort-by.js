const lowerCase = v => (typeof v === 'string' ? v.toLowerCase() : v);

module.exports = (arr, prop) => arr.sort((a, b) => {
  const v1 = lowerCase(a[prop]);
  const v2 = lowerCase(b[prop]);
  if (v1 < v2) return -1;
  if (v1 > v2) return 1;
  return 0;
});
