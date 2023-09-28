// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/module/user.module';
import { UserController } from './user/controller/user.controller';
import { UserEntity } from './user/entity/user.entity';
import { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } from './common/index';
import { AddressEntity } from './user/entity/address.entity';

@Module({
    imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DB,
        entities: [UserEntity, AddressEntity],
        synchronize: true,
      }),
    UserModule,
  ],
  controllers: [],
})
export class AppModule {}
