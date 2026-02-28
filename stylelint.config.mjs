/** @type {import('stylelint').Config} */
export default {
    extends: [
        "stylelint-config-standard",
        "stylelint-config-standard-scss",
        "stylelint-config-rational-order",
    ],
    rules: {
        "selector-pseudo-class-no-unknown": [
            true,
            {
                ignorePseudoClasses: ["deep", ""],
            },
        ],
    },
};
