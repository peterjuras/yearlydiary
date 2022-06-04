module.exports = (packageJson) => {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    prebuild,
    ...scriptsWithoutPrebuild
  } = packageJson.scripts;

  return {
    ...packageJson,
    scripts: scriptsWithoutPrebuild,
  };
};
