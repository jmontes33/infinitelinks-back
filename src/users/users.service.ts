import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import validator from 'validator';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<Users> {
    const user: Users = new Users();

    const existingUser = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });

    const existingEmail = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    if (existingEmail) {
      throw new Error('User with the same email already exists');
    }

    const isValidPassword = validator.isStrongPassword(createUserDto.password);

    if (!isValidPassword) {
      throw new Error('Password must be strong');
    }

    const { username, password, email } = createUserDto;

    if (!username || !password || !email) {
      throw new Error('Invalid createUserDto');
    }

    user.username = createUserDto.username;
    user.email = createUserDto.email;
    user.password = await bcrypt.hash(createUserDto.password, 10);
    return this.userRepository.save(user);
  }

  findAllUser(): Promise<Users[]> {
    return this.userRepository.find();
  }

  findOneUser(username: string): Promise<Users> {
    return this.userRepository.findOneBy({ username });
  }

  updateUser(id: number, updateUserDto: UpdateUserDto): Promise<Users> {
    const user: Users = new Users();
    user.username = updateUserDto.username;
    user.email = updateUserDto.email;
    user.password = updateUserDto.password;
    user.id = id;
    return this.userRepository.save(user);
  }

  removeUser(id: number): Promise<{ affected?: number }> {
    return this.userRepository.delete(id);
  }
}
