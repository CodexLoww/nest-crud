// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersRepository } from 'src/user/repository/users.repository';
import { JWT_SECRET } from 'src/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersRepository : UsersRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, 
      secretOrKey: JWT_SECRET, 
    });
  }

  async validate(payload: any) {
    const id = payload.id
    // console.log(payload)
    return await this.usersRepository.findOne({where : {id}});
  }
}
