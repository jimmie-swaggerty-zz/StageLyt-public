  module.exports = {
    HOST: "us-cdbr-east-04.cleardb.com",
    USER: "bb86c15ad1494c",
    PASSWORD: process.env.MY_PASSWORD || "6dc5ac8e",
    DB: "heroku_ad535df570dec71",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
