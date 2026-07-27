import { Controller, Get, Header, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ExportFormat, ExportType } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PrismaService } from '../common/prisma.service';
import { AuthenticatedRequest } from '../common/types/authenticated-request';
@ApiTags('Report Export') @ApiBearerAuth() @UseGuards(JwtAuthGuard) @Controller('exports')
export class ExportController{constructor(private prisma:PrismaService){} @Get() @Header('Content-Type','application/json') async export(@Req()r:AuthenticatedRequest,@Query('type')type:ExportType,@Query('format')format:ExportFormat='JSON' as ExportFormat){const userId=r.user.sub;const payload={careerReports:await this.prisma.careerAnalysis.findMany({where:{userId}}),atsReports:await this.prisma.resumeAnalysis.findMany({where:{userId}}),roadmaps:await this.prisma.learningRoadmap.findMany({where:{userId}}),interviews:await this.prisma.interviewSession.findMany({where:{userId},include:{questions:true}}),jobs:await this.prisma.jobApplication.findMany({where:{userId}})};await this.prisma.exportHistory.create({data:{userId,type:type ?? 'CAREER_REPORT',format,payload}});return {success:true,message:`${format} export prepared. PDF consumers can render this JSON payload client-side.`,data:payload}}}
