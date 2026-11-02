import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    type: String,
    example: 'Giới thiệu về NestJS',
    description: 'Tiêu đề bài viết',
  })
  @IsNotEmpty({ message: 'Title không được để trống' })
  @IsString()
  title: string;

  @ApiProperty({
    type: String,
    example: 'Software Gen 8 | GDG On Campus - DUT',
    description: 'Danh mục bài viết',
  })
  @IsNotEmpty({ message: 'Category không được để trống' })
  @IsString()
  category: string;

  @ApiProperty({
    type: String,
    example: 'Bài viết chia sẻ kiến thức lập trình backend NestJS cho thành viên Gen 8',
    description: 'Nội dung mô tả bài viết',
  })
  @IsNotEmpty({ message: 'Description không được để trống' })
  @IsString()
  description: string;
}
