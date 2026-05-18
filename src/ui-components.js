(function () {
  const shell = { template: '<section><slot></slot></section>' };
  Vue.component('character-panel', shell);
  Vue.component('target-panel', shell);
  Vue.component('skill-panel', shell);
  Vue.component('equip-panel', shell);
  Vue.component('damage-panel', shell);
})();
