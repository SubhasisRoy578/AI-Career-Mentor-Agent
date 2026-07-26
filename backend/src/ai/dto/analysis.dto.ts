import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CareerProfileDto } from './career-profile.dto';

export class SaveCareerProfileDto extends CareerProfileDto {}

export class GenerateCareerAnalysisDto {
  @ApiPropertyOptional({ type: CareerProfileDto }) @IsOptional() @ValidateNested() @Type(() => CareerProfileDto) profile?: CareerProfileDto;
}

export class GenerateSkillGapDto {
  @ApiPropertyOptional() @IsOptional() @IsString() targetCareer?: string;
  @ApiPropertyOptional({ type: CareerProfileDto }) @IsOptional() @ValidateNested() @Type(() => CareerProfileDto) profile?: CareerProfileDto;
}

export class GenerateRoadmapDto {
  @ApiProperty({ enum: ['30_DAYS', '60_DAYS', '90_DAYS', '6_MONTHS'] }) @IsIn(['30_DAYS', '60_DAYS', '90_DAYS', '6_MONTHS']) duration!: '30_DAYS' | '60_DAYS' | '90_DAYS' | '6_MONTHS';
  @ApiPropertyOptional() @IsOptional() @IsString() targetCareer?: string;
  @ApiPropertyOptional({ type: CareerProfileDto }) @IsOptional() @ValidateNested() @Type(() => CareerProfileDto) profile?: CareerProfileDto;
}
