module.exports = (baseConfig, env, defaultWebpackConfig) => {
    defaultWebpackConfig.module.rules.push({
        test: /\.(ts|tsx)$/,
        loader: require.resolve('ts-loader')
    });

    defaultWebpackConfig.resolve.extensions.push('.ts', '.tsx');

    return defaultWebpackConfig;
};
