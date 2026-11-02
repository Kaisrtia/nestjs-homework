import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '@database/typeorm/entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostRepository {
  constructor(
    @InjectRepository(Post)
    private readonly repository: Repository<Post>,
  ) {}

  create(createPostDto: CreatePostDto): Post {
    return this.repository.create(createPostDto);
  }

  async save(post: Post): Promise<Post> {
    return await this.repository.save(post);
  }

  async findAll(): Promise<Post[]> {
    return await this.repository.find({
      order: {
        created_at: 'DESC',
      },
    });
  }

  async findById(id: number): Promise<Post | null> {
    return await this.repository.findOne({
      where: { id },
    });
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }
}
