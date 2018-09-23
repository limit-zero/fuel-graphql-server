module.exports = (obj, prop, idProp) => {
  if (typeof obj !== 'object') return null;
  const ref = obj[prop];
  if (typeof ref !== 'object') return null;
  return ref[idProp] || null;
};
