const { Pool } = require("pg")

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "rk_life_science",
  password: "1121",
  port: 5432
})

module.exports = pool