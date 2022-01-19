module.exports = {
  overrides: [
    {
      // JavaScript and JSX
      files: ['*.{js,jsx}'],
      parserOptions: {
        sourceType: 'module',
      },
      extends: ['airbnb', 'airbnb/hooks', 'prettier', 'prettier/react'],
      plugins: ['prettier'],
    },
    {
      // Typescript and TSX
      // See https://github.com/toshi-toma/eslint-config-airbnb-typescript-prettier/blob/master/index.js
      files: ['*.{jsx,ts,tsx}'],
      extends: ['airbnb-typescript-prettier'],
      rules: {
        'react/react-in-jsx-scope': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
      },
    },
  ],
};
