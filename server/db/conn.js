const mongoose = require("mongoose");

const DB =
  "mongodb+srv://admin:admin@cluster0.tifge1s.mongodb.net/Authusers?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB Connected....success fully");
  })
  .catch((err) => {
    console.log(err);
  });
