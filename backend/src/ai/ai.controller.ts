import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { apiResponse } from '../common/api-response';
import { AuthenticatedRequest } from '../common/types/authenticated-request';
import { AiService } from './ai.service';
import { GenerateCareerAnalysisDto, GenerateRoadmapDto, GenerateSkillGapDto, SaveCareerProfileDto } from './dto/analysis.dto';

@ApiTags('AI Career Analysis')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Get('career-profile') @ApiOkResponse({ description: 'Returns the saved career profile.' })
  async getProfile(@Req() request: AuthenticatedRequest) { return apiResponse('Career profile retrieved.', await this.aiService.getProfile(request.user.sub)); }

  @Post('career-profile') @HttpCode(HttpStatus.OK) @ApiOkResponse({ description: 'Creates or updates the career profile.' })
  async saveProfile(@Req() request: AuthenticatedRequest, @Body() dto: SaveCareerProfileDto) { return apiResponse('Career profile saved.', await this.aiService.saveProfile(request.user.sub, dto)); }

  @Post('career-analysis') @ApiCreatedResponse({ description: 'Generates and saves a career analysis report.' })
  async careerAnalysis(@Req() request: AuthenticatedRequest, @Body() dto: GenerateCareerAnalysisDto) { return apiResponse('Career analysis generated.', await this.aiService.generateCareerAnalysis(request.user.sub, dto)); }

  @Get('career-analysis/latest') @ApiOkResponse({ description: 'Returns the latest career analysis report.' })
  async latestCareerAnalysis(@Req() request: AuthenticatedRequest) { return apiResponse('Latest career analysis retrieved.', await this.aiService.latestCareerAnalysis(request.user.sub)); }

  @Post('skill-gap') @ApiCreatedResponse({ description: 'Generates and saves a skill gap analysis.' })
  async skillGap(@Req() request: AuthenticatedRequest, @Body() dto: GenerateSkillGapDto) { return apiResponse('Skill gap analysis generated.', await this.aiService.generateSkillGap(request.user.sub, dto)); }

  @Post('roadmap') @ApiCreatedResponse({ description: 'Generates and saves a learning roadmap.' })
  async roadmap(@Req() request: AuthenticatedRequest, @Body() dto: GenerateRoadmapDto) { return apiResponse('Learning roadmap generated.', await this.aiService.generateRoadmap(request.user.sub, dto)); }

  @Get('reports') @ApiOkResponse({ description: 'Returns saved AI report history.' })
  async reports(@Req() request: AuthenticatedRequest) { return apiResponse('AI report history retrieved.', await this.aiService.listReports(request.user.sub)); }
}
