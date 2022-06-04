module.exports = (config) => {
  const newCompilerOptions = {
    ...config.compilerOptions,
    moduleResolution: "node16",
  };
  return {
    ...config,
    compilerOptions: newCompilerOptions,
  };
};
