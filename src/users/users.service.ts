import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./user.schema";
import { createUserDto } from "./dto/createUserDto";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUser: createUserDto) {
    const existingUser = await this.userModel
      .findOne({
        username: createUser.username,
      })
      .exec();
    if (existingUser) {
      throw new Error("User with the same username already exists");
    }

    const { username, password, email } = createUser;

    if (!username || !password || !email) {
      throw new Error("Invalid createUserDto");
    }

    const hashedPassword = await bcrypt.hash(createUser.password, 10);

    const newUser = new this.userModel({
      ...createUser,
      password: hashedPassword,
    });
    return newUser.save();
  }

  async findOne(username: string): Promise<User | undefined> {
    const user = await this.userModel
      .findOne({ username: username })
      .select("password")
      .lean()
      .exec();

    return user;
  }
}
