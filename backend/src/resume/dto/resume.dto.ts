import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResumeIdDto { @ApiProperty() @IsString() id!: string; }
