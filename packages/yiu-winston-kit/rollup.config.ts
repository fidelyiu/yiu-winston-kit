import type { RollupOptions } from 'rollup'
import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'

const bundles: RollupOptions[] = [
    /* es */
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/esm/yiu-winston-kit.js',
            format: 'esm',
        },
        plugins: [typescript()],
    },
    /* es min no map */
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/esm/yiu-winston-kit.min.nomap.js',
            format: 'esm',
        },
        plugins: [typescript(), terser()],
    },
    /* es min */
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/esm/yiu-winston-kit.min.js',
            format: 'esm',
            sourcemap: true,
            sourcemapFile: 'dist/esm/yiu-winston-kit.min.map',
        },
        plugins: [typescript(), terser()],
    },
    /* commonjs */
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/cjs/yiu-winston-kit.cjs',
            format: 'cjs',
        },
        plugins: [typescript()],
    },
    /* commonjs min nomap*/
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/cjs/yiu-winston-kit.min.nomap.cjs',
            format: 'cjs',
        },
        plugins: [typescript(), terser()],
    },
    /* commonjs min */
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/cjs/yiu-winston-kit.min.cjs',
            format: 'cjs',
            sourcemap: true,
            sourcemapFile: 'dist/cjs/yiu-winston-kit.min.map',
        },
        plugins: [typescript(), terser()],
    },
    /* umd */
    {
        input: 'src/index.ts',
        output: {
            name: 'YiuWinstonKit',
            file: 'dist/umd/yiu-winston-kit.js',
            format: 'umd',
        },
        plugins: [typescript()],
    },
    /* umd min no map */
    {
        input: 'src/index.ts',
        output: {
            name: 'YiuWinstonKit',
            file: 'dist/umd/yiu-winston-kit.min.nomap.js',
            format: 'umd',
        },
        plugins: [typescript(), terser()],
    },
    /* umd min */
    {
        input: 'src/index.ts',
        output: {
            name: 'YiuWinstonKit',
            file: 'dist/umd/yiu-winston-kit.min.js',
            format: 'umd',
            sourcemap: true,
            sourcemapFile: 'dist/umd/yiu-winston-kit.min.map',
        },
        plugins: [typescript(), terser()],
    },
]

export default defineConfig(bundles)
