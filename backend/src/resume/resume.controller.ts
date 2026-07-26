import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { memoryStorage } from 'multer';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { apiResponse } from '../common/api-response';
import { AuthenticatedRequest } from '../common/types/authenticated-request';
import { ResumeService } from './resume.service';

@ApiTags('Resume ATS Analysis')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('resumes')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: { type: 'object', properties: { file: { type: 'string', format: 'binary' } }, required: ['file'] } })
  @ApiCreatedResponse({ description: 'Uploads, validates, parses, and stores a resume.' })
  async upload(@Req() request: AuthenticatedRequest, @UploadedFile() file?: { originalname: string; mimetype: string; size: number; buffer: Buffer }) { return apiResponse('Resume uploaded.', await this.resumeService.upload(request.user.sub, file)); }

  @Get()
  @ApiOkResponse({ description: 'Lists uploaded resumes for the authenticated user.' })
  async list(@Req() request: AuthenticatedRequest) { return apiResponse('Resumes retrieved.', await this.resumeService.list(request.user.sub)); }

  @Get('reports')
  @ApiOkResponse({ description: 'Returns previous ATS analysis reports.' })
  async reports(@Req() request: AuthenticatedRequest) { return apiResponse('ATS reports retrieved.', await this.resumeService.reports(request.user.sub)); }

  @Get(':id')
  @ApiOkResponse({ description: 'Returns a single owned resume.' })
  async view(@Req() request: AuthenticatedRequest, @Param('id') id: string) { return apiResponse('Resume retrieved.', await this.resumeService.view(request.user.sub, id)); }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Deletes an owned resume and storage object.' })
  async remove(@Req() request: AuthenticatedRequest, @Param('id') id: string) { return apiResponse('Resume deleted.', await this.resumeService.remove(request.user.sub, id)); }

  @Post(':id/analyze')
  @ApiCreatedResponse({ description: 'Generates and saves an AI ATS analysis.' })
  async analyze(@Req() request: AuthenticatedRequest, @Param('id') id: string) { return apiResponse('ATS analysis generated.', await this.resumeService.analyze(request.user.sub, id)); }

  @Post(':id/regenerate')
  @ApiCreatedResponse({ description: 'Regenerates and saves a fresh AI ATS analysis.' })
  async regenerate(@Req() request: AuthenticatedRequest, @Param('id') id: string) { return apiResponse('ATS analysis regenerated.', await this.resumeService.regenerate(request.user.sub, id)); }

  @Get(':id/reports')
  @ApiOkResponse({ description: 'Returns previous ATS analysis reports for one resume.' })
  async resumeReports(@Req() request: AuthenticatedRequest, @Param('id') id: string) { return apiResponse('Resume ATS reports retrieved.', await this.resumeService.reports(request.user.sub, id)); }
}
