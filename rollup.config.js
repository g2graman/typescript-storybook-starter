import typescriptPlugin from 'rollup-plugin-typescript';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import peerDeps from 'rollup-plugin-peer-deps-external';

import typescript from 'typescript';

import pkg from './package.json';

const plugins = [
    peerDeps(),
    replace({
        // The react sources include a reference to process.env.NODE_ENV so we need to replace it here with the actual value
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    // nodeResolve makes rollup look for dependencies in the node_modules directory
    nodeResolve(),
    commonjs({
        // All of our own sources will be ES6 modules, so only node_modules need to be resolved with cjs
        include: 'node_modules/**',
        namedExports: {
            // The commonjs plugin can't figure out the exports of some modules, so if rollup gives warnings like:
            // ⚠️   'render' is not exported by 'node_modules/react-dom/index.js'
            // Just add the mentioned file / export here
            'node_modules/react-dom/index.js': [
                'render',
            ],
            'node_modules/react/index.js': [
                'Children',
                'Component',
                'createElement',
            ],
        },
    }),
    typescriptPlugin({
        // The current rollup-plugin-typescript includes an old version of typescript, so we import and pass our own version
        typescript,
        // rollup-plugin-typescript will inject some typescript helpers to your files (normally tsc will
        // do this). They however have some ES6 keywords like const so they break older browsers.
        // This instructs rollup-plugin-typescript to import tslib instead, which includes the same helpers
        // in proper format.
        importHelpers: true,
    }),
    uglify()
];

export default {
    plugins,
    treeshake: true,
    perf: true,
    /*external: [
        "react",
        "react-dom",
        "react-redux",
        "react-router",
        "redux",
        "redux-logger",
    ],*/
    output: [
        {
            format: 'cjs',
            file: pkg.main,
        },
        {
            format: 'iife',
            file: pkg.browser,
        },
        {
            format: 'es',
            file: pkg.module,
        }
    ],

    input: 'src/index.js',
};

