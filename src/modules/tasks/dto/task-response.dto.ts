import { ApiProperty } from '@nestjs/swagger';

export class TaskResponseDto {
  @ApiProperty({
    example: 'a3b2c1d0-1234-4567-89ab-cdef01234567',
    description: 'Mã định danh UUID của công việc',
  })
  id: string;

  @ApiProperty({
    example: 'Học NestJS cơ bản',
    description: 'Tiêu đề công việc',
  })
  title: string;

  @ApiProperty({
    example: 'Backend',
    description: 'Chủ đề của công việc',
    nullable: true,
  })
  category: string | null;

  @ApiProperty({
    example: 'Tìm hiểu về DTO, Controller, Service và Module',
    description: 'Mô tả chi tiết công việc',
    nullable: true,
  })
  description: string | null;

  @ApiProperty({
    example: false,
    description: 'Trạng thái hoàn thành',
  })
  isCompleted: boolean;

  @ApiProperty({
    example: '2026-10-27T08:30:00.000Z',
    description: 'Thời điểm tạo bản ghi',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2026-10-27T08:30:00.000Z',
    description: 'Thời điểm cập nhật bản ghi gần nhất',
  })
  updatedAt: Date;
}
