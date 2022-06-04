module.exports = (config) => {
  return {
    ...config,
    compilerOptions: {
      ...config.compilerOptions,
      declaration: false,
      incremental: true,
    },
  };
};
