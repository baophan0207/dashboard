module.exports = {
    webpack: {
        configure: (webpackConfig, { env, paths }) => {
            // Add a rule to handle reactflow and ag-grid error
            webpackConfig.module.rules.push({
                test: /\.(js|jsx)$/,
                include: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                        plugins: [
                            "@babel/plugin-proposal-class-properties",
                            "@babel/plugin-transform-class-properties",
                            "@babel/plugin-proposal-optional-chaining",
                            "@babel/plugin-proposal-nullish-coalescing-operator"
                        ]
                    }
                }
            });
            webpackConfig.resolve = {
                extensions: ['*', '.mjs', '.js', '.json'],
                ...webpackConfig.resolve
            };

            // Add a rule to handle .mjs files
            webpackConfig.module.rules.push({
                test: /\.mjs$/,
                include: /node_modules/,
                type: 'javascript/auto'
            });
            return webpackConfig;
        },
    },
};