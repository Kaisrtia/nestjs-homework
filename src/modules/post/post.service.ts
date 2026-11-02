import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from '@database/typeorm/entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const post = this.postRepository.create(createPostDto);
    return await this.postRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    return await this.postRepository.findAll();
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postRepository.findById(id);
    if (!post) {
      throw new NotFoundException(`Bài viết với ID ${id} không tồn tại`);
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.findOne(id);
    Object.assign(post, updatePostDto);
    return await this.postRepository.save(post);
  }

  async remove(id: number): Promise<Post> {
    const post = await this.findOne(id);
    await this.postRepository.softDelete(id);
    post.deleted_at = new Date();
    return post;
  }
}
