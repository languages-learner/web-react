// https://typicode.github.io/husky/how-to.html
// Skip Husky install in production and CI
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === "production" || process.env.CI === "true") {
    // eslint-disable-next-line no-undef
    process.exit(0);
}
const husky = (await import("husky")).default;
// eslint-disable-next-line no-console
console.log(husky());
