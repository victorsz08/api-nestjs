import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { NoteEntity } from 'src/domain/entities/note.entity';
import {
  ListNoteInput,
  ListNoteOutput,
  NoteInterface,
} from 'src/domain/interface/note.interface';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class NoteService implements NoteInterface {
  constructor(private readonly repository: PrismaService) {}

  async create(note: NoteEntity): Promise<void> {
    const { id, content, userId, createdAt, updatedAt } = note;

    const user = await this.repository.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new HttpException(
        'usuário não encontrado com esse id',
        HttpStatus.NOT_FOUND,
      );
    }

    const data: Prisma.NotesCreateInput = {
      id,
      text: content,
      user: {
        connect: {
          id: userId,
        },
      },
      createdAt,
      updatedAt,
    };

    await this.repository.notes.create({
      data,
    });

    return;
  }

  async find(id: string): Promise<NoteEntity> {
    const note = await this.repository.notes.findUnique({
      where: {
        id,
      },
    });

    if (!note) {
      throw new HttpException(
        'Nota não encontrada com esse id',
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      id: note.id,
      content: note.text,
      userId: note.user_id,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
    };
  }

  async list(query: ListNoteInput): Promise<ListNoteOutput> {
    const { page, limit, userId, startDate, endDate } = query;

    const queryArgs: Prisma.NotesFindManyArgs = {
      where: {
        user: {
          id: userId,
        },
      },
      take: limit,
      skip: (page - 1) * limit,
    };

    const countArgs: Prisma.NotesCountArgs = {
      where: {
        user: {
          id: userId,
        },
      },
    };

    if (startDate && endDate) {
      queryArgs.where = {
        ...queryArgs.where,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      };

      countArgs.where = {
        ...countArgs.where,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      };
    }

    const notes = await this.repository.notes.findMany(queryArgs);
    const total = await this.repository.notes.count(countArgs);

    const pages = Math.ceil(total / limit);

    return {
      notes: notes.map((note) => ({
        id: note.id,
        content: note.text,
        userId: note.user_id,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
      })),
      total,
      pages,
      limit,
    };
  }

  async update(id: string, content: string): Promise<void> {
    const note = await this.repository.notes.findUnique({
      where: {
        id,
      },
    });

    if (!note) {
      throw new HttpException(
        'Nota não encontrada com esse id',
        HttpStatus.NOT_FOUND,
      );
    }

    await this.repository.notes.update({
      where: {
        id,
      },
      data: {
        text: content,
        updatedAt: new Date(),
      },
    });

    return;
  }

  async delete(id: string): Promise<void> {
    const note = await this.repository.notes.findUnique({
      where: {
        id,
      },
    });

    if (!note) {
      throw new HttpException(
        'Nota não encontrada com esse id',
        HttpStatus.NOT_FOUND,
      );
    }

    await this.repository.notes.delete({
      where: {
        id,
      },
    });

    return;
  }
}
