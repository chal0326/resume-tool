module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  "extends": [
    "react-app",
    "plugin:react/recommended",
    "eslint:recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
  "settings": {
    "react": {
      "version": "detect",        // Automatically detect the react version
      "pragma": "React",          // Pragma to use, default to "React"
      "fragment": "Fragment",     // Fragment to use, default to "Fragment"
      "jsxRuntime": "automatic"   // Use the new JSX runtime
    }
  }
};