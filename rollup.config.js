import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import dts from "rollup-plugin-dts";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "lib/index.js",
        format: "umd",
        name: "Qlik",
        sourcemap: true
      },
      {
        file: "lib/index.mjs",
        format: "es",
        sourcemap: true
      },
      {
        file: "lib/index.cjs",
        format: "cjs",
        sourcemap: true
      }
    ],
    external: ['react', 'react-dom'],
    plugins: [
      resolve({
        browser: true
      }),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json"
      }),
      terser()
    ]
  },
  {
    input: "src/index.ts",
    output: [{ file: "lib/index.d.ts", format: "es" }],
    plugins: [dts()]
  }
];
