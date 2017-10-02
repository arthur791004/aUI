module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "globals": {
    "document": true,
    "FileReader": true
  },
  "settings": {
    "import/resolver": {
      "babel-module": {}
    }
  },
  "rules": {
    "no-mixed-operators": "off",
    "react/jsx-filename-extension": [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    "react/require-default-props": "off",
  },
};
