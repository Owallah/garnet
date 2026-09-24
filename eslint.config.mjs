import next from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/**
 * Accessibility is a project requirement, so the jsx-a11y rules run as errors
 * rather than the advisory warnings the Next preset ships with. The plugin
 * itself is already registered by next/core-web-vitals — re-adding it throws
 * "Cannot redefine plugin", so only the rules are overridden here.
 *
 * This config is also why TypeScript is pinned to 6 rather than 7:
 * typescript-eslint does not support the TS 7 compiler yet, and losing the
 * linter is the worse trade.
 */
export default [
  ...(Array.isArray(next) ? next : [next]),
  ...(Array.isArray(nextTs) ? nextTs : [nextTs]),
  {
    rules: {
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-has-content": "error",
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/aria-proptypes": "error",
      "jsx-a11y/aria-role": "error",
      "jsx-a11y/heading-has-content": "error",
      "jsx-a11y/label-has-associated-control": ["error", { assert: "either", depth: 3 }],
      "jsx-a11y/no-redundant-roles": "error",
      "jsx-a11y/role-has-required-aria-props": "error",
      "jsx-a11y/role-supports-aria-props": "error",
      "jsx-a11y/no-autofocus": "error",
    },
  },
  { ignores: [".next/**", "node_modules/**", "public/**", "scripts/**"] },
];
