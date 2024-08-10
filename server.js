const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');
console.log(process.env);

const port = 3000;
// const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('app is running');
});

// npm i eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-config-airbnb eslint-plugin-node eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react --save-dev
