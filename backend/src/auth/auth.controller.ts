import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { apiResponse } from '../common/api-response';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiCreatedResponse({ description: 'Registers a new user and returns an access token.' })
  async register(@Body() dto: RegisterDto) {
    return apiResponse('Registration successful.', await this.authService.register(dto));
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Authenticates a user and returns an access token.' })
  async login(@Body() dto: LoginDto) {
    return apiResponse('Login successful.', await this.authService.login(dto));
  }
}
