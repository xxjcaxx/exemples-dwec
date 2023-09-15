# Preparació de l'entorn

 npm init -y
 echo -e '\nnode_modules\n' >> .gitignore

## Tests en Jasmine

En package.json :   "type" : "module"


 npm install jasmine-browser-runner jasmine-core
 npx jasmine-browser-runner init --esm
 npx jasmine-browser-runner serve
 mkdir src

Crear spec/spec.mjs

## EsLint

 npm install eslint --save-dev
 ./node_modules/.bin/eslint --init

Instal·lar extensió

## Webpack

 npm install webpack webpack-cli webpack-dev-server autoprefixer style-loader css-loader postcss-loader sass sass-loader html-webpack-plugin clean-webpack-plugin --save-dev

Fer el fitxer webpack.config.cjs (o copiar d’un projecte anterior)
Fer el directori src amb el style.css index.html i index.js.
Afegir els scripts al package.json



