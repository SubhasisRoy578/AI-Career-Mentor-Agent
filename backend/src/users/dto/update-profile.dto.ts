import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

enum ExperienceLevelDto {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  PROFESSIONAL = 'PROFESSIONAL',
}

export class UpdateProfileDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  education?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  university?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  currentSkills?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  careerGoal?: string;

  @ApiPropertyOptional({ enum: ExperienceLevelDto })
  @IsOptional()
  @IsEnum(ExperienceLevelDto)
  experienceLevel?: ExperienceLevelDto;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  profileImage?: string;
}
