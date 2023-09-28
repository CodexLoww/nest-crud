// user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { AddressEntity } from '../entity/address.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dto/createuser.dto';
import { UpdateUserDto } from '../dto/updateuser.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto';
import { UserOutput } from '../output/user.output';
import { UsersMapper } from '../mapper/users.mapper';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { username, password } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Create a new user entity
    const user = this.userRepository.create({
      username,
      password: hashedPassword,
    });
    // if (addresses) {
    //   user.addresses = addresses.map((addressString) => {
    //     const addressEntity = new AddressEntity();
    //     addressEntity.address = addressString;
    //     addressEntity.user = user;
    //     return addressEntity;
    //   });
    // }
    return await this.userRepository.save(user);
  }
  
  async findAllUsers(): Promise<UserOutput[]> { //
    const users = await this.userRepository.find() // new line ko
    return UsersMapper.displayAll(users);
  }
  
  async findUserById(id: string): Promise<UserEntity> {//
    const user = await this.userRepository.findOne({ where: { id }});
    console.log(user)
    if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user; //
  }

  // async updateUser(updateUserDto: UpdateUserDto) {
  //   const { id, password, address } = updateUserDto;
    
  //   const updatedData: Partial<UserEntity> = {
  //     ...(password && { password: await this.hashPassword(password) }), // Update password if provided
  //   };
  //   if (address && Array.isArray(address)) {
  //     const user = await this.userRepository.findOne({where:{id}}); // Fetch the user entity by ID
  //   if (!user) {
  //     throw new NotFoundException(`User with ID ${id} not found`);
  //   }

  //     updatedData.addresses = address.map((addressString) => {
  //       const addressEntity = new AddressEntity();
  //       addressEntity.address = addressString;
  //       addressEntity.user = user;
  //       return addressEntity;
  //     });
  //   }
  //   const result = await this.userRepository.update(id, updatedData);
  //   if (result.affected > 0) {
  //     return this.findUserById(id);
  //   }
  //   return undefined;
  // }
  
  async getUserAddressesById(id: string){
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // async updateUser(updateUserDto: UpdateUserDto): Promise<UserEntity | undefined> {
  //   const user = await this.userRepository.findOne({ where: { id: updateUserDto.id } });
  //   if (!user) {
  //     throw new NotFoundException(`User with ID ${updateUserDto.id} not found`);
  //   }
  //   await this.userRepository.update(updateUserDto.id, {...updateUserDto, password: await this.hashPassword(updateUserDto.password)});
  //   return await this.userRepository.findOne({ where: { id: updateUserDto.id } });
  // }

  async deleteUser(id: string): Promise<UserEntity | undefined> {
    const user = await this.userRepository.findOne( { where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return await this.userRepository.remove(user);
  }

  // async findByUsername(username: string): Promise<UserEntity | undefined> {
  //   const user = await this.userRepository.findOne({ where: { username } });
  //   if (!user) {
  //     throw new NotFoundException(`User with username ${username} not found`);
  //   }
  //   return user;
  // }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({where:{username: loginDto.username}})
      if (user && await bcrypt.compare(loginDto.password, user.password)) {
        const payload = {id: user.id, username: user.username}
        const accessToken: string = this.jwtService.sign(payload)
        return {accessToken}
      } else {
        throw new NotFoundException('Invalid Credentials')
      }
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
}
