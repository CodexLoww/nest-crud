// jwt.config.ts
import { JwtModule } from '@nestjs/jwt';

export const jwtConfig = JwtModule.register({
  secret: 'okinawaaa', // Replace with your secret key
  signOptions: {
    expiresIn: '1h', // Token expiration time
  },
});
