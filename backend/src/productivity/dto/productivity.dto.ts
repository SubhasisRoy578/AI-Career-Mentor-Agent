import { ApiPropertyOptional } from '@nestjs/swagger';
import { GoalStatus, JobStatus } from '@prisma/client';
import { IsBoolean, IsDateString, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
export class JobDto { @IsString() company!: string; @IsString() role!: string; @IsOptional() @IsString() location?: string; @IsOptional() @IsString() source?: string; @IsOptional() @IsEnum(JobStatus) status?: JobStatus; @IsOptional() @IsDateString() appliedAt?: string; @IsOptional() @IsString() notes?: string; }
export class GoalDto { @IsString() title!: string; @IsOptional() @IsString() description?: string; @IsOptional() @IsEnum(GoalStatus) status?: GoalStatus; @IsOptional() @IsDateString() deadline?: string; @IsOptional() @IsInt() @Min(0) @Max(100) progress?: number; }
export class MilestoneDto { @IsString() title!: string; @IsOptional() @IsBoolean() completed?: boolean; @IsOptional() @IsDateString() dueDate?: string; }
export class NotificationDto { @IsString() title!: string; @IsString() body!: string; @ApiPropertyOptional() @IsOptional() @IsDateString() dueAt?: string; }
