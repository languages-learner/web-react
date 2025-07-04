#!/usr/bin/env node
// oxlint-disable no-require-imports
// oxlint-disable no-undef
/* global process, __dirname, require */

// npm-run-all doesn't provide a way to get the exit code when NodeJS crashes due to memory overflow.
// To handle this error, we need to catch it in stderr.
// https://github.com/mysticatea/npm-run-all/issues/243

const { spawn } = require("child_process");
const path = require("path");

const args = process.argv.slice(2);

const npmRunAllPath = path.resolve(__dirname, "../node_modules/.bin/npm-run-all");

const child = spawn(npmRunAllPath, args, {
    stdio: "pipe",
    shell: true,
});

child.stdout.on("data", (data) => {
    const output = data.toString();
    process.stdout.write(output);
});

child.stderr.on("data", (data) => {
    const output = data.toString();
    process.stderr.write(output);

    if (output.includes("FATAL ERROR:")) {
        child.kill();
        process.exit(1);
    }
});

child.on("error", (error) => {
    process.stderr.write(error.toString());
});

child.on("close", (code) => {
    process.exit(code);
});
