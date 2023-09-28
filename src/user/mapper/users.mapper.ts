import { AddressEntity } from '../entity/address.entity';
import { UserEntity } from '../entity/user.entity';
import { UserOutput } from '../output/user.output';

export class UsersMapper {
  static displayOne(user: UserEntity): UserOutput {
    if (!user) {
      return undefined;
    }
    // console.log({user: user})
    const addresses = AddressEntity.addresses;
    
    return {
      id: user.id,
      username: user.username,
      address: addresses,
    };
  }

  static displayAll(users: UserEntity[]): UserOutput[] {
    if (!users || users.length <= 0) {
      return [];
    }
    return users.map((user) => this.displayOne(user)).filter(Boolean);
  }
}
