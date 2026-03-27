/* eslint-disable @typescript-eslint/no-explicit-any */
import { SignJWT, jwtVerify } from 'jose';
import { ITokenService } from '@/domain/services/auth-service';

export class JwtService implements ITokenService {
  private getSecret() {
    return new TextEncoder().encode(process.env.JWT_SECRET);
  }

  async generate(payload: Record<string, any>): Promise<string> {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1d')
      .sign(this.getSecret());
  }

  async verify(token: string): Promise<Record<string, any> | null> {
    try {
      const { payload } = await jwtVerify(token, this.getSecret());
      return payload as Record<string, any>;
    } catch (error) {
      console.error('[JWT_VERIFY_ERROR]:', error);
      return null;
    }
  }
}
