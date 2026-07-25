import { Body, Controller, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticatedRequest } from '../common/types/authenticated-request';
import { apiResponse } from '../common/api-response';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOkResponse({ description: 'Returns the logged-in user profile.' })
  async me(@Req() request: AuthenticatedRequest) {
    return apiResponse('Profile retrieved.', await this.usersService.findProfile(request.user.sub));
  }

  @Patch('me')
  @ApiOkResponse({ description: 'Updates the logged-in user profile.' })
  async updateMe(@Req() request: AuthenticatedRequest, @Body() dto: UpdateProfileDto) {
    return apiResponse('Profile updated.', await this.usersService.updateProfile(request.user.sub, dto));
  }

  @Post('change-password')
  @ApiOkResponse({ description: 'Changes the logged-in user password.' })
  async changePassword(@Req() request: AuthenticatedRequest, @Body() dto: ChangePasswordDto) {
    return apiResponse('Password changed.', await this.usersService.changePassword(request.user.sub, dto));
  }
}
