function clamp(value, min, max) { return Math.min(Math.max(value, min), max); }
function replaceFormulaKeywords(formula, keywordReplaceList) {
  if (formula === null || formula === undefined) return formula;
  let output = formula.toString();
  for (const replacement of (keywordReplaceList || [])) {
    output = output.replace(new RegExp(replacement.str1, 'g'), replacement.str2);
  }
  return output;
}
module.exports = { clamp, replaceFormulaKeywords };
