import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtUser } from '../../common/types/authenticated-request';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
 codex/set-up-project-structure-for-ai-career-mentor-agent-7da4ey
      secretOrKey: config.get<string>('JWT_SECRET') ?? 'development-only-change-me',
=======
      secretOrKey: config.get<string>('JWT_SECRET'),
 main
    });
  }

  validate(payload: JwtUser): JwtUser {
    return payload;
  }
}
