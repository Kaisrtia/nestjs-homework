import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class GetTasksFilterDto {
  @ApiPropertyOptional({
    type: Boolean,
    example: false,
    description: 'Lọc các task theo trạng thái hoàn thành (true/false)',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return value;
  })
  @IsBoolean({ message: 'isCompleted phải là true hoặc false' })
  isCompleted?: boolean;

  @ApiPropertyOptional({
    type: String,
    example: 'Backend',
    description: 'Lọc theo danh mục / chủ đề công việc',
  })
  @IsOptional()
  @IsString({ message: 'Category phải là chuỗi ký tự' })
  category?: string;
}
