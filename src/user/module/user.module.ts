// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../controller/user.controller';
import { UserService } from '../service/user.service';
import { UserEntity } from '../entity/user.entity';
import { UsersRepository } from '../repository/users.repository';
import { JwtStrategy } from 'src/auth/jwt/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET, JWT_EXPIRATION } from 'src/common';
import { AddressController } from '../controller/address.controller';
import { AddressService } from '../service/address.service';
import { AddressRepository } from '../repository/address.repository';
import { AddressEntity } from '../entity/address.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, AddressEntity]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: JWT_SECRET,
        signOptions: {
          expiresIn: JWT_EXPIRATION,
        },
      }),
    }),
  ],
  controllers: [UserController, AddressController],
  providers: [UserService, UsersRepository, JwtStrategy, AddressService, AddressRepository],
  exports: [UserService],
})
export class UserModule {}
