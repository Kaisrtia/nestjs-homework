import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    type: String,
    example: 'Học NestJS cơ bản',
    description: 'Tiêu đề công việc (1 - 255 ký tự)',
  })
  @IsNotEmpty({ message: 'Title không được để trống' })
  @IsString({ message: 'Title phải là chuỗi ký tự' })
  @MaxLength(255, { message: 'Title tối đa 255 ký tự' })
  title: string;

  @ApiPropertyOptional({
    type: String,
    example: 'Backend',
    description: 'Chủ đề của công việc',
  })
  @IsOptional()
  @IsString({ message: 'Category phải là chuỗi ký tự' })
  @MaxLength(100, { message: 'Category tối đa 100 ký tự' })
  category?: string;

  @ApiPropertyOptional({
    type: String,
    example: 'Tìm hiểu về DTO, Controller, Service và Module',
    description: 'Mô tả chi tiết công việc',
  })
  @IsOptional()
  @IsString({ message: 'Description phải là chuỗi ký tự' })
  description?: string;

  @ApiPropertyOptional({
    type: Boolean,
    example: false,
    default: false,
    description: 'Trạng thái hoàn thành công việc',
  })
  @IsOptional()
  @IsBoolean({ message: 'isCompleted phải là giá trị boolean' })
  isCompleted?: boolean;
}
