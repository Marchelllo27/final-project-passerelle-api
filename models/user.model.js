import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UsersCollection from "../database/users.schema";
import HttpError from "./http-error";

class User {
  constructor(
    email,
    password,
    lastName,
    firstName,
    phoneNumber,
    street,
    postalCode,
    city,
    apiKey
  ) {
    this.email = email;
    this.password = password;
    this.lastName = lastName;
    this.firstName = firstName;
    this.phoneNumber = phoneNumber;
    this.address = {
      street,
      postalCode,
      city,
    };
    this.apiKey = apiKey;
  }

  // FIND ALL USERS
  static findAllUsers() {
    // display wihout password and apiKey
    return UsersCollection.find({}, { password: 0, apiKey: 0 });
  }

  // FIND USER BY ID
  static findUserById(id) {
    return UsersCollection.findById(id, {password: 0, created_at: 0, edited_at: 0});
  }

  static findByApiKey(apiKey) {
    return UsersCollection.findOne({ apiKey: apiKey });
  }

  getUserWithSameEmail() {
    return UsersCollection.findOne({ email: this.email });
  }

  async userExistAlready() {
    const userExist = await this.getUserWithSameEmail();
    if (userExist) return true;
    if (!userExist) return false;
  }

  comparePassword(hachedPassword) {
    return bcrypt.compare(this.password, hachedPassword);
  }

  //ADD USER IN DATABASE
  async addUserInDB() {
    const hachedPass = await bcrypt.hash(this.password, 12);

    const response = await UsersCollection.create({
      email: this.email,
      password: hachedPass,
      lastName: this.lastName,
      firstName: this.firstName,
      phoneNumber: this.phoneNumber,
      address: this.address,
      apiKey: this.apiKey,
    });
    return response;
  }

  // UPDATE USER
  async updateUserData(id) {
    const user = await User.findUserById(id);

    // const hachedPass = await bcrypt.hash(this.password, 12);

    user.email = this.email;
    // user.password = hachedPass;
    user.lastName = this.lastName;
    user.firstName = this.firstName;
    user.phoneNumber = this.phoneNumber;
    user.address = this.address;

    await user.save();
  }

  // DELETE USER
  static deleteUser(id) {
    return UsersCollection.findByIdAndDelete(id);
  }
}

export default User;

