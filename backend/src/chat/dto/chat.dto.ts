import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class StartConversationDto {
  @ApiPropertyOptional({ example: 'Frontend interview prep' }) @IsOptional() @IsString() @MaxLength(120) title?: string;
  @ApiProperty({ example: 'Help me prepare for a React developer interview.' }) @IsString() @MaxLength(6000) message!: string;
}
export class ContinueConversationDto { @ApiProperty({ example: 'Ask me a harder system design question.' }) @IsString() @MaxLength(6000) message!: string; }
