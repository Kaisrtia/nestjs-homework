import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePostDto {
  @ApiPropertyOptional({
    type: String,
    example: 'Giới thiệu về NestJS (Cập nhật)',
    description: 'Tiêu đề bài viết',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    type: String,
    example: 'Software Gen 8 | GDG On Campus - DUT',
    description: 'Danh mục bài viết',
  })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({
    type: String,
    example: 'Nội dung mô tả cập nhật mới',
    description: 'Nội dung mô tả bài viết',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
