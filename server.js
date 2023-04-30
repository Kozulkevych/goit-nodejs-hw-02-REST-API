const mongoose = require("mongoose");

const app = require("./app");
// 5MUYSwUNQP7NcE9x
// const DB_HOST =
//   "mongodb+srv://nkozulkevych:5MUYSwUNQP7NcE9x@cluster0.11m7j3z.mongodb.net/db-contacts?retryWrites=true&w=majority";
const { DB_HOST, PORT = 3000 } = process.env;
// console.log(process.env.DB_HOST);
mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });