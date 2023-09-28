// auth/jwt-auth.guard.ts
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    getRequest(context: ExecutionContext) {
        return context.switchToHttp().getRequest();
      }
    
      handleRequest(error, user, info) {
        if (error || !user) {
          console.log(info);
          throw error || new UnauthorizedException();
        }
    
        return user;
      }
}