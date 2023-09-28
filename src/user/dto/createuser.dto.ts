// src/user/dto/create-user.dto.ts
import { IsArray, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(4, 20)
  username: string;

  @IsString()
  @Length(6, 20)
  password: string;

  @IsString()
  @IsArray()
  addresses: string[];
}