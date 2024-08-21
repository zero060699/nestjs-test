import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const salt = await bcrypt.genSalt();
      const user = new User();
      user.username = createUserDto.username;
      user.password = await bcrypt.hash(createUserDto.password, salt);
      user.email = createUserDto.email;
      const { username, email } = createUserDto;
      const existingUserByUsername = await this.userRepository.findOneBy({ username });
      if (existingUserByUsername) {
        throw new ConflictException('Username already exists');
      }
      const existingUserByEmail = await this.userRepository.findOneBy({ email });
      if (existingUserByEmail) {
        throw new ConflictException('Email already exists');
      }
      return this.userRepository.save(user);
    } catch (error) {
      throw new BadRequestException('Create user failed');
    }
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ username });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const salt = await bcrypt.genSalt();
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    user.password = await bcrypt.hash(updateUserDto.password, salt);
    const { username, email } = updateUserDto;
    const existingUserByUsername = await this.userRepository.findOneBy({ username });
    if (existingUserByUsername) {
      throw new ConflictException('Username already exists');
    }
    const existingUserByEmail = await this.userRepository.findOneBy({ email });
    if (existingUserByEmail) {
      throw new ConflictException('Email already exists');
    }
    await this.userRepository.update({ id }, updateUserDto);
    return user;
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    await this.userRepository.delete(id);
  }

  async removeall() {
    await this.userRepository.clear();
  }
}
