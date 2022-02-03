import bcrypt from "bcrypt";

import UsersCollection from "../database/users1.schema";

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
    return UsersCollection.findById(id);
  }

  static findByApiKey(apiKey, fields) {
    UsersCollection.findOne(
      { apiKey: req.headers["x-api-key"] },
      "firstname lastname email role"
    ).exec((err, record) => {
      if (!err && record) {
        const payload = {
          userId: record._id,
          email: record.email,
          role: record.role,
        };

        // Generate JWT
        let token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

        return res.status(200).json({
          userId: record._id,
          email: record.email,
          role: record.role,
          token: token,
        });
      } else {
        return res
          .status(400)
          .json({ message: "La demande n'est pas valide." });
      }
    });
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

    const hachedPass = await bcrypt.hash(this.password, 12);

    user.email = this.email;
    user.password = hachedPass;
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
