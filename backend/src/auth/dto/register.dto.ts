import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';

enum ExperienceLevelDto {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  PROFESSIONAL = 'PROFESSIONAL',
}

export class RegisterDto {
  @ApiProperty({ example: 'Avery Johnson' })
  @IsString()
  fullName!: string;

  @ApiProperty({ example: 'avery@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ minLength: 8, example: 'StrongPass123!' })
  @IsString()
  @MinLength(8)
  password!: string;

  @ApiPropertyOptional({ example: 'B.S. Computer Science' })
  @IsOptional()
  @IsString()
  education?: string;

  @ApiPropertyOptional({ example: 'State University' })
  @IsOptional()
  @IsString()
  university?: string;

  @ApiPropertyOptional({ example: 'TypeScript, React, SQL' })
  @IsOptional()
  @IsString()
  currentSkills?: string;

  @ApiPropertyOptional({ example: 'Become a full-stack AI engineer' })
  @IsOptional()
  @IsString()
  careerGoal?: string;

  @ApiPropertyOptional({ enum: ExperienceLevelDto })
  @IsOptional()
  @IsEnum(ExperienceLevelDto)
  experienceLevel?: ExperienceLevelDto;
}
