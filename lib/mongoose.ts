import mongoose, { mongo } from "mongoose";

let isConnected = false; //this variable will be used to check if the connection is already established or not

export const connectToDB = async () => {
  mongoose.set("strictQuery", true); //will throw an error if we try to query a field that is not defined in the schema

  if (!process.env.MONGODB_URL)
    return console.log("MONGODB_URL is not defined");
  if (isConnected) return console.log("Already connected to the database");

  try {
    await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true;
    console.log("Connected to the database");
  } catch (err) {
    console.log("Error connecting to the database", err);
  }
};
