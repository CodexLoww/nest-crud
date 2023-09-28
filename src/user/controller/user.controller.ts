// src/user/user.controller.ts
import { Controller, Post, Body, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/createuser.dto';
import { UpdateUserDto } from '../dto/updateuser.dto';
import { LoginDto } from '../dto/login.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth-guard';
import { UserEntity } from '../entity/user.entity';
import { CurrentUser } from 'src/auth/current-user';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService, 
    ) {}

  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    return { message: 'User registered successfully', user };
  }

  @Post('login')
    async login(@Body() loginDto: LoginDto) {
      return await this.userService.login(loginDto);
    }

  @Get()
  async findAllUsers() {
    return this.userService.findAllUsers();
  }
  
  @Get('current-user')
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@CurrentUser() user: UserEntity){
    return await this.userService.findUserById(user.id)
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findUserById(@Param('id') id: string) {
    return await this.userService.findUserById(id);
  }

  //address
  @UseGuards(JwtAuthGuard)
  @Get(':id/address')
  async getUserAddressesById(@Param('id') id: string) {
    const userAddresses = await this.userService.getUserAddressesById(id);
    return userAddresses;
  }

  // @Get(':username')
  // async findByUsername(@Param('username') username: string) {
  //   return await this.userService.findByUsername(username);
  // }  

  // @UseGuards(JwtAuthGuard)
  // @Post('update')
  // async updateUser(@Body() updateUserDto: UpdateUserDto) {
  //   const updatedUser = await this.userService.updateUser(updateUserDto);
  //   return { message: 'User updated successfully', user: updatedUser };
  // }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string){
    return this.userService.deleteUser(id);
  }
}
