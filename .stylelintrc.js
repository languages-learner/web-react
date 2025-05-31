export default {
    extends: ["stylelint-config-recommended-scss", "stylelint-config-rational-order"],
    plugins: ["stylelint-order", "stylelint-scss"],

    rules: {
        "selector-pseudo-class-no-unknown": [
            true,
            {
                ignorePseudoClasses: ["deep", ""],
            },
        ],
    },
};
