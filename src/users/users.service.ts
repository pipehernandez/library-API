import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>){}

  async create(createUserDto: CreateUserDto): Promise<Partial<User>> {
    try {
      const {email} = createUserDto;
      const existingUser = await this.userRepository.findOneBy({email})
      if (existingUser) {
        throw new BadRequestException('Email already exists')
      }
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const user = this.userRepository.create({ ...createUserDto, password: hashedPassword });
      await this.userRepository.save(user);
      return {
        name: user.name,
        email: user.email,
        role: user.role,
        id: user.id
      }
      // const user = this.userRepository.create(createUserDto);
      // return await this.userRepository.save(user);
    } catch (error) {
      throw new BadRequestException('Failed creating user ' + error.message);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
