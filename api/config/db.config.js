// module.exports = {
//     HOST: "localhost",
//     USER: "root",
//     PASSWORD: process.env.MY_PASSWORD,
//     DB: "bookdiva",
//     dialect: "mysql",
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000
//     }
//   };

  module.exports = {
    HOST: "bookdiva.cal8jirlbdvh.us-east-2.rds.amazonaws.com",
    USER: "admin",
    PASSWORD: process.env.MY_PASSWORD,
    DB: "bookdiva",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };