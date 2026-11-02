import { ApiProperty } from '@nestjs/swagger';

export class PostResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Giới thiệu về NestJS' })
  title: string;

  @ApiProperty({ example: 'Software Gen 8 | GDG On Campus - DUT' })
  category: string;

  @ApiProperty({ example: 'Bài viết chia sẻ kiến thức lập trình backend NestJS cho thành viên Gen 8' })
  description: string;

  @ApiProperty({ example: '2026-10-26T14:48:00.000Z' })
  created_at: Date;

  @ApiProperty({ example: null, nullable: true })
  deleted_at: Date | null;
}
