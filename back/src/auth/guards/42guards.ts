// import { Injectable, ExecutionContext } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';

// @Injectable()
// export class FortyTwoAuthGuard extends AuthGuard('42') {
//   canActivate(context: ExecutionContext) {
//     return super.canActivate(context);
//   }
// }
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class FortyTwoAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
    
    // Assuming you have a JWT validation service or function
    const isValid = this.validateToken(token);

    return isValid;
  }

  private validateToken(token: string): boolean {
    // Implement your JWT validation logic here
    // For example, verify the token's signature, expiration, etc.
    // Return true if the token is valid, false otherwise
    // You can use libraries like jsonwebtoken for token validation
    return true; // Replace this with your actual validation logic
  }
}
