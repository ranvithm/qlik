import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import dts from "rollup-plugin-dts";

export default [
  {
    input: "qlik/src/index.ts",
    output: [
      {
        file: "qlik/lib/index.js",
        format: "umd",
        name: "index",
      },
      {
        file: "qlik/lib/index.mjs",
        format: "es",
      },
      {
        file: "qlik/lib/index.cjs",
        format: "cjs",
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        declaration: false,
      }),
    ],
  },
  {
    input: "qlik/src/index.ts",
    output: [
      {
        file: "qlik/lib/index.d.ts",
        format: "es",
      },
    ],
    plugins: [dts()],
  },
];
