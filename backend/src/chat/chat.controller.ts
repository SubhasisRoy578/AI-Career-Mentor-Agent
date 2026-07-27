import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { apiResponse } from '../common/api-response';
import { AuthenticatedRequest } from '../common/types/authenticated-request';
import { ChatService } from './chat.service';
import { ContinueConversationDto, StartConversationDto } from './dto/chat.dto';
@ApiTags('AI Career Mentor Chat') @ApiBearerAuth() @UseGuards(JwtAuthGuard) @Controller('chat')
export class ChatController { constructor(private service: ChatService) {}
@Post('conversations') @ApiOkResponse({ description:'Start a mentor conversation.' }) start(@Req() r: AuthenticatedRequest, @Body() d: StartConversationDto){ return this.service.start(r.user.sub,d).then(x=>apiResponse('Conversation started.',x)); }
@Post('conversations/:id/messages') continue(@Req() r: AuthenticatedRequest,@Param('id') id:string,@Body() d: ContinueConversationDto){ return this.service.continue(r.user.sub,id,d).then(x=>apiResponse('Message sent.',x)); }
@Get('conversations') list(@Req() r: AuthenticatedRequest,@Query('search') s?:string){ return this.service.list(r.user.sub,s).then(x=>apiResponse('Conversations retrieved.',x)); }
@Get('conversations/:id') get(@Req() r: AuthenticatedRequest,@Param('id') id:string){ return this.service.get(r.user.sub,id).then(x=>apiResponse('Conversation retrieved.',x)); }
@Delete('conversations/:id') remove(@Req() r: AuthenticatedRequest,@Param('id') id:string){ return this.service.remove(r.user.sub,id).then(x=>apiResponse('Conversation deleted.',x)); }}
