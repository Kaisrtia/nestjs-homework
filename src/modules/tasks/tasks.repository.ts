import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Task } from '@database/typeorm/entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

@Injectable()
export class TasksRepository {
  constructor(
    @InjectRepository(Task)
    private readonly repository: Repository<Task>,
  ) {}

  create(createTaskDto: CreateTaskDto): Task {
    return this.repository.create(createTaskDto);
  }

  async save(task: Task): Promise<Task> {
    return await this.repository.save(task);
  }

  async findAll(filter?: GetTasksFilterDto): Promise<Task[]> {
    const where: FindOptionsWhere<Task> = {};

    if (filter?.isCompleted !== undefined) {
      where.isCompleted = filter.isCompleted;
    }

    if (filter?.category) {
      where.category = filter.category;
    }

    return await this.repository.find({
      where,
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findById(id: string): Promise<Task | null> {
    if (!UUID_REGEX.test(id)) {
      return null;
    }
    return await this.repository.findOne({
      where: { id },
    });
  }

  async remove(task: Task): Promise<Task> {
    return await this.repository.remove(task);
  }
}
