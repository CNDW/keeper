const defaultResolver = require('jest-resolve');

let originalIsCore;

function newIsCore(moduleName) {
  // the jest runtime differentiates node core packages by using the
  // 'is-builtin-module' module, which checks a static list. This horrible
  // peice of monkey patching short circuits that process to ensure that the
  // '_http_common' package is registered as a core module
  if (moduleName === '_http_common') return true;
  return originalIsCore && originalIsCore.call(this, moduleName);
}


module.exports = function CustomResolver(path, options) {
  if (this.isCoreModule !== newIsCore) {
    originalIsCore = this.isCoreModule;
    this.isCoreModule = newIsCore;
  }

  const module = defaultResolver.findNodeModule(path, options);
  return module || require(path, { ...options, isInternalModule: true });
};
