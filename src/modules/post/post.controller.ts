import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostResponseDto } from './dto/post-response.dto';
import { Post as PostEntity } from '@database/typeorm/entities/post.entity';

@ApiTags('post')
@Controller('v1/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Tạo bài viết mới',
    description: 'API tạo bài viết cho Software Gen 8 | GDG On Campus - DUT',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Tạo bài viết thành công',
    type: PostResponseDto,
  })
  async create(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.postService.create(createPostDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Lấy danh sách tất cả bài viết',
    description: 'API lấy danh sách bài viết chưa bị xóa',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lấy danh sách bài viết thành công',
    type: [PostResponseDto],
  })
  async findAll(): Promise<PostEntity[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Lấy chi tiết một bài viết theo ID',
    description: 'API lấy thông tin chi tiết bài viết',
  })
  @ApiParam({ name: 'id', description: 'ID của bài viết', type: Number })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Chi tiết bài viết',
    type: PostResponseDto,
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<PostEntity> {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Cập nhật bài viết theo ID',
    description: 'API cập nhật một hoặc nhiều thông tin của bài viết',
  })
  @ApiParam({ name: 'id', description: 'ID của bài viết cần cập nhật', type: Number })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Cập nhật bài viết thành công',
    type: PostResponseDto,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostEntity> {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Xóa bài viết theo ID',
    description: 'API xóa mềm (soft delete) bài viết, cập nhật trường deleted_at',
  })
  @ApiParam({ name: 'id', description: 'ID của bài viết cần xóa', type: Number })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Xóa bài viết thành công',
    type: PostResponseDto,
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<PostEntity> {
    return this.postService.remove(id);
  }
}
