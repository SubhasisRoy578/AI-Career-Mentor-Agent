import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Difficulty, InterviewType } from '@prisma/client';
import { IsArray, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
export class GenerateQuestionsDto { @ApiProperty({ enum: InterviewType }) @IsEnum(InterviewType) type!: InterviewType; @ApiProperty({ enum: Difficulty }) @IsEnum(Difficulty) difficulty!: Difficulty; @ApiPropertyOptional() @IsOptional() @IsString() targetRole?: string; }
export class SaveInterviewSessionDto extends GenerateQuestionsDto { @ApiPropertyOptional({ type: Array }) @IsOptional() @IsArray() questions?: unknown[]; @ApiPropertyOptional({ type: Array }) @IsOptional() @IsArray() answers?: unknown[]; @ApiPropertyOptional() @IsOptional() @IsString() summary?: string; @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0) @Max(100) performanceScore?: number; @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0) @Max(100) confidenceScore?: number; }
