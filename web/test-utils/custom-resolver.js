// Inspired from https://github.com/microsoft/accessibility-insights-web/pull/5421/commits/9ad4e618019298d82732d49d00aafb846fb6bac7
// to work around Jest/uuid issue when loading
// browser modules.

module.exports = (path, options) => {
  return options.defaultResolver(path, {
    ...options,
    packageFilter: (pkg) => {
      if (pkg.name === "uuid") {
        delete pkg["exports"];
        delete pkg["module"];
      }
      return pkg;
    },
  });
};
