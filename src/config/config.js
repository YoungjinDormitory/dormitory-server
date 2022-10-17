export default {
  development: {
    username: process.env.DEV_USERNAME,
    password: process.env.DEV_PASSWORD,
    database: process.env.DEV_DATABASE,
    host: process.env.DEV_HOST,
    dialect: process.env.DEV_DIALECT,
    dateStrings: true,
    timezone: "+09:00",
  },
  test: {
    username: "",
    password: "",
    database: "",
    host: "",
    dialect: "",
  },
  production: {
    username: process.env.PRODUCT_USERNAME,
    password: process.env.PRODUCT_PASSWORD,
    database: process.env.PRODUCT_DATABASE,
    host: process.env.PRODUCT_HOST,
    dialect: process.env.PRODUCT_DIALECT,
  },
};
