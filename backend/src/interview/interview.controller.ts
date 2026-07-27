import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { apiResponse } from '../common/api-response';
import { AuthenticatedRequest } from '../common/types/authenticated-request';
import { GenerateQuestionsDto, SaveInterviewSessionDto } from './dto/interview.dto';
import { InterviewService } from './interview.service';
@ApiTags('Interview Preparation') @ApiBearerAuth() @UseGuards(JwtAuthGuard) @Controller('interviews')
export class InterviewController{constructor(private service:InterviewService){}
@Post('questions') generate(@Req() r:AuthenticatedRequest,@Body() d:GenerateQuestionsDto){return this.service.generate(r.user.sub,d).then(x=>apiResponse('Interview questions generated.',x));}
@Post('sessions') save(@Req() r:AuthenticatedRequest,@Body() d:SaveInterviewSessionDto){return this.service.save(r.user.sub,d).then(x=>apiResponse('Interview session saved.',x));}
@Get('sessions') list(@Req() r:AuthenticatedRequest){return this.service.list(r.user.sub).then(x=>apiResponse('Interview sessions retrieved.',x));}}
