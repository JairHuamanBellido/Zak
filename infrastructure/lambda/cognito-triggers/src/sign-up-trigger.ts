import { config } from "dotenv";
import { MongoClient } from "mongodb";
import { PostConfirmationConfirmSignUpTriggerEvent } from "aws-lambda";
import { IUser } from "./interface/User.interface";

config();

const uri = process.env.MONGODB_URI || "";

const client = new MongoClient(uri);

export const handler = async (
  event: PostConfirmationConfirmSignUpTriggerEvent,
  context: any,
  callback: any
) => {
  try {
    const db = await client.db("zak");

    const userCollections = db.collection("users");

    const { sub, gender, given_name, family_name, email } =
      event.request.userAttributes;
    const newUser: IUser = {
      id: sub,
      email,
      gender,
      name: given_name,
      lastname: family_name,
    };

    await userCollections.insertOne(newUser);

    client.close();
    callback(null, event);
  } catch (error) {
    console.log(error);
    callback(error, event);
  }
};
