import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AddressEntity } from './address.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  // // Establish a one-to-many relationship with AddressEntity
  // @OneToMany(() => AddressEntity, (address) => address.userId)
  // addresses: AddressEntity[];
}
