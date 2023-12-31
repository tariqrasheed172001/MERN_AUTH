import mongoose from "mongoose";

const connectDB = (url) => {
  return mongoose.connect(url, {}).then(() =>
  console.log(`Connected To Database`)
);
};

export default connectDB;