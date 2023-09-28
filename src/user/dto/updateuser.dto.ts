import { IsNotEmpty, IsOptional, IsString, Length, IsArray } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  id: string;

  @IsOptional()
  @IsString()
  @Length(4, 20)
  username?: string;

  @IsOptional()
  @IsString()
  @Length(6, 20)
  password?: string;

  @IsOptional()
  @IsArray()
  address?: string;
}
