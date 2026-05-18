(function (global) {
  function parseTemplateMetadata(entries) {
    return (entries || []).map((entry) => ({ ...entry, date: entry.lastupdate ? entry.lastupdate.split('T')[0] : '' }));
  }

  function sortByDamageString(a, b) {
    const numA = parseFloat((a.damage.match(/\d+/g) || ['0']).join(''));
    const numB = parseFloat((b.damage.match(/\d+/g) || ['0']).join(''));
    return numA - numB;
  }

  function filterByClass(metadata, classId) {
    return (metadata || []).filter((item) => item.class === classId);
  }

  global.RODataHelpers = { parseTemplateMetadata, sortByDamageString, filterByClass };
})(window);
