  module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: process.env.MY_PASSWORD,
    DB: "stagelyt",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };