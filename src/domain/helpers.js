(function (global) {
  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function replaceFormulaKeywords(formula, keywordReplaceList) {
    if (formula === null || formula === undefined) return formula;
    let output = formula.toString();
    for (const replacement of (keywordReplaceList || [])) {
      output = output.replace(new RegExp(replacement.str1, 'g'), replacement.str2);
    }
    return output;
  }

  function aggregateEffectValue(effectRecords, effectTypeId, options) {
    const records = (effectRecords || []).filter((record) =>
      (record.effectlist || []).some((effect) => effect.EffectType.id === effectTypeId)
    );

    if (effectTypeId === 'FixedCastPercent') {
      return records
        .map((record) => (record.effectlist.find((effect) => effect.EffectType.id === effectTypeId) || { Enable: false, EffectNumber: 0 }))
        .filter((effect) => effect.Enable)
        .reduce((max, effect) => Math.max(max, effect.EffectNumber), 0);
    }

    const parts = records.map((record) => {
      const effect = (record.effectlist || []).find((x) => x.EffectType.id === effectTypeId);
      if (!effect || !effect.Enable) return 0;
      if (typeof effect.EffectNumber === 'string' && Object.prototype.hasOwnProperty.call(record, 'baseIndex')) {
        return effect.EffectNumber.replaceAll('GEARR', `${options.refinePrefix}${record.baseIndex}${options.refineSuffix}`);
      }
      return effect.EffectNumber;
    });

    return parts.length ? `(${parts.join(')+(')})` : 0;
  }

  global.RODomainHelpers = { clamp, replaceFormulaKeywords, aggregateEffectValue };
})(window);
