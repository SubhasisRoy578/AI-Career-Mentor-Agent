import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

export enum ExperienceLevelDto { BEGINNER = 'BEGINNER', INTERMEDIATE = 'INTERMEDIATE', ADVANCED = 'ADVANCED', PROFESSIONAL = 'PROFESSIONAL' }

export class CareerProfileDto {
  @ApiProperty() @IsString() currentEducation!: string;
  @ApiProperty() @IsString() degree!: string;
  @ApiProperty() @IsString() university!: string;
  @ApiProperty() @IsString() yearOfStudy!: string;
  @ApiProperty({ type: [String] }) @IsArray() @IsString({ each: true }) currentSkills!: string[];
  @ApiProperty({ type: [String] }) @IsArray() @IsString({ each: true }) preferredTechnologies!: string[];
  @ApiProperty() @IsString() careerGoal!: string;
  @ApiProperty() @IsString() preferredIndustry!: string;
  @ApiProperty({ enum: ExperienceLevelDto }) @IsEnum(ExperienceLevelDto) experienceLevel!: ExperienceLevelDto;
  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() @IsString({ each: true }) certifications?: string[];
  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() @IsString({ each: true }) projects?: string[];
  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() @IsString({ each: true }) interests?: string[];
}
