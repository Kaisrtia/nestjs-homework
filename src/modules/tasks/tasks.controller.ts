import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskResponseDto } from './dto/task-response.dto';
import { Task } from '@database/typeorm/entities/task.entity';

@ApiTags('tasks')
@Controller('v1/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Tạo mới một công việc',
    description: 'Tạo công việc mới hỗ trợ quản lý danh sách cá nhân',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Tạo công việc thành công',
    type: TaskResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Dữ liệu không hợp lệ',
  })
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Lấy danh sách công việc',
    description: 'Lấy toàn bộ công việc, có thể lọc theo isCompleted và category',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lấy danh sách thành công',
    type: [TaskResponseDto],
  })
  async findAll(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksService.findAll(filterDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Xem chi tiết công việc',
    description: 'Lấy thông tin chi tiết một công việc theo UUID',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'UUID của công việc',
    example: 'a3b2c1d0-1234-4567-89ab-cdef01234567',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Chi tiết công việc',
    type: TaskResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Không tìm thấy công việc',
  })
  async findOne(@Param('id') id: string): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Cập nhật thông tin công việc',
    description: 'Cập nhật một hoặc nhiều trường thông tin của công việc theo UUID',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'UUID của công việc cần cập nhật',
    example: 'a3b2c1d0-1234-4567-89ab-cdef01234567',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Cập nhật thành công',
    type: TaskResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Không tìm thấy công việc',
  })
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Xóa một công việc',
    description: 'Xóa hoàn toàn một công việc khỏi hệ thống theo UUID',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'UUID của công việc cần xóa',
    example: 'a3b2c1d0-1234-4567-89ab-cdef01234567',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Xóa công việc thành công',
    type: TaskResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Không tìm thấy công việc',
  })
  async remove(@Param('id') id: string): Promise<Task> {
    return this.tasksService.remove(id);
  }
}
