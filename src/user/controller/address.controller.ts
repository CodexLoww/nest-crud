import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AddressService } from "../service/address.service";
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "src/auth/jwt/jwt-auth-guard";

import { CurrentUser } from "src/auth/current-user";
import { UserEntity } from "../entity/user.entity";

@Controller('address')
export class AddressController{
constructor(
    private readonly addressService: AddressService, 
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post('assign')
    async assignedAddressUser(@Body('address') address: string, @CurrentUser() user: UserEntity) {
        //console.log({aaa : user.id})
        return await this.addressService.assignAddresstoUser(address, user.id)
    }
}