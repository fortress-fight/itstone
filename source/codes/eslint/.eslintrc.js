module.exports = {
    root: true,
    parser: "babel-eslint",
    parserOptions: {
        sourceType: "module",
        ecmaVersion: 6
    },
    env: {
        es6: true,
        browser: true,
        node: true
    },
    plugins: ["eslint-plugin-html", "prettier"],
    extends: ["standard", "prettier"],
    rules: {
        "prettier/prettier": "error"
    }
};