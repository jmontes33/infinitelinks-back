import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<Users>);
    createUser(createUserDto: CreateUserDto): Promise<Users>;
    findAllUser(): Promise<Users[]>;
    findOneUser(username: string): Promise<Users>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<Users>;
    removeUser(id: number): Promise<{
        affected?: number;
    }>;
}
