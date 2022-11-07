const mongoose = require("mongoose");

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

mongoose
  .connect(
    `mongodb+srv://${username}:${password}@cluster0.qsoyho4.mongodb.net/projet7`
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

module.exports = mongoose;
