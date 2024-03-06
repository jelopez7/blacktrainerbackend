module.exports = ({ env }) => ({
  connection: {
    client: "mysql2",
    connection: {
      host: env("DATABASE_HOST", "localhost"),
      port: env.int("DATABASE_PORT", 3306),
      database: env("DATABASE_NAME", "anime"),
      user: env("DATABASE_USERNAME", "root"),
      password: env("DATABASE_PASSWORD", ""),
    },
  },
});
