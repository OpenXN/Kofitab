import path from "path";
import { fileURLToPath } from "url";
import CopyWebpackPlugin from "copy-webpack-plugin";
// import WebpackObfuscator from "webpack-obfuscator";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
    entry: "./src/main.ts",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: "src/manifest.json", to: "manifest.json" },
                { from: "src/views/index.html", to: "index.html" },
                { from: "src/assets", to: "assets" },
                { from: "_locales", to: "_locales" },
            ],
        }),
        /* new WebpackObfuscator(
            {
                rotateStringArray: true,
                compact: true,
                deadCodeInjection: true,
                deadCodeInjectionThreshold: 1,
                stringArray: true,
                stringArrayThreshold: 1,
            },
            [],
        ), */
    ],
    mode: "production",
};
