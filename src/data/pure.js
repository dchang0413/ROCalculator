function sortByDamageString(a, b) {
  const numA = parseFloat((a.damage.match(/\d+/g) || ['0']).join(''));
  const numB = parseFloat((b.damage.match(/\d+/g) || ['0']).join(''));
  return numA - numB;
}
module.exports = { sortByDamageString };
