module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "globals": {
    "document": true
  },
  "settings": {
    "import/resolver": {
      "babel-module": {}
    }
  },
  "rules": {
    "react/jsx-filename-extension": [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
  },
};
