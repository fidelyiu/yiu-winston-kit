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
        external: ['logform', 'winston'],
        plugins: [typescript()],
    },
    /* es min no map */
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/esm/yiu-winston-kit.min.nomap.js',
            format: 'esm',
        },
        external: ['logform', 'winston'],
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
        external: ['logform', 'winston'],
        plugins: [typescript(), terser()],
    },
    /* commonjs */
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/cjs/yiu-winston-kit.cjs',
            format: 'cjs',
        },
        external: ['logform', 'winston'],
        plugins: [typescript()],
    },
    /* commonjs min nomap*/
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/cjs/yiu-winston-kit.min.nomap.cjs',
            format: 'cjs',
        },
        external: ['logform', 'winston'],
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
        external: ['logform', 'winston'],
        plugins: [typescript(), terser()],
    },
]

export default defineConfig(bundles)
