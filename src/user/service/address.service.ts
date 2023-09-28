import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AddressEntity } from "../entity/address.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "./user.service";


@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

async assignAddresstoUser(address: string, userId: string){
    const user = await this.userService.findUserById(userId)
    console.log(userId)
    if (!user){
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    const saveAddress = await this.addressRepository.save({address, userId})
    console.log({save: await saveAddress})
    return await this.userService.findUserById(userId)
  }
}