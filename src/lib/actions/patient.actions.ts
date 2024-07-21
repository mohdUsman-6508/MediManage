import { ID, Query } from "node-appwrite";
import { users } from "../appwrite.config";

export const createUser = async (user: CreateUserParams) => {
  try {
    console.log("Creating user with email:", user.email);
    console.log("Creating user with phone:", user.phone);
    console.log("Creating user with fullname:", user.fullname);
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.fullname
    );

    console.log("NEW USER CREATED:", newUser);
    return newUser;
  } catch (error: any) {
    console.log(error);
    if (error && error?.code === 409) {
      const documents = await users.list([Query.equal("email", [user.email])]);
      return documents?.users[0];
    }
  }
};
