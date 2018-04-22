// load the default config generator.

module.exports = (baseConfig, env, defaultWebpackConfig) => {
    // Extend it as you need.

    // For example, add typescript loader:
    defaultWebpackConfig.module.rules.push({
        test: /\.(ts|tsx)$/,
        loader: require.resolve('ts-loader')
    });

    defaultWebpackConfig.resolve.extensions.push('.ts', '.tsx');

    return defaultWebpackConfig;
};
