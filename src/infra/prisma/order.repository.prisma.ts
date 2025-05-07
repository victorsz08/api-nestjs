import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OrderEntity } from '../../domain/entities/order.entity';
import { StatusEnum } from '../../domain/enum/status.enum';
import {
  ListOrderInput,
  ListOrderOutput,
  OrderInterface,
} from '../../domain/interface/order.interface';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';
import { endOfDay, startOfDay, subDays } from 'date-fns';

@Injectable()
export class OrderService implements OrderInterface {
  constructor(private readonly repository: PrismaService) {}

  async create(order: OrderEntity): Promise<void> {
    const {
      number,
      local,
      price,
      contact,
      id,
      createdAt,
      updatedAt,
      schedulingDate,
      schedulingTime,
      status,
      userId,
    } = order;

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

    const data: Prisma.ContractCreateInput = {
      id,
      number,
      local,
      installationDate: schedulingDate,
      installationHour: schedulingTime,
      price,
      phone: contact,
      status,
      user: {
        connect: {
          id: userId,
        },
      },
      createdAt,
      updatedAt,
    };

    await this.repository.contract.create({
      data,
    });

    return;
  }

  async find(id: string): Promise<OrderEntity> {
    const order = await this.repository.contract.findUnique({
      where: {
        id,
      },
    });

    if (!order) {
      throw new HttpException(
        'pedido não encontrado com esse id',
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      id: order.id,
      number: order.number,
      local: order.local,
      price: order.price,
      contact: order.phone,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      schedulingDate: order.installationDate,
      schedulingTime: order.installationHour,
      status: order.status as StatusEnum,
      userId: order.userId,
    };
  }

  async list(input: ListOrderInput): Promise<ListOrderOutput> {
    const {
      page,
      limit,
      userId,
      createdAtEndDate,
      createdAtStartDate,
      schedulingEndDate,
      schedulingStartDate,
      sort,
      status,
    } = input;

    const queryArgs: Prisma.ContractFindManyArgs = {
      where: {
        user: {
          id: userId,
        },
      },
      take: limit,
      skip: (page - 1) * limit,
    };

    const countArgs: Prisma.ContractCountArgs = {
      where: {
        user: {
          id: userId,
        },
      },
    };

    if (createdAtStartDate && createdAtEndDate) {
      queryArgs.where = {
        ...queryArgs.where,
        createdAt: {
          gte: subDays(startOfDay(createdAtStartDate), 1),
          lte: endOfDay(createdAtEndDate),
        },
      };

      countArgs.where = {
        ...countArgs.where,
        createdAt: {
          gte: subDays(startOfDay(createdAtStartDate), 1),
          lte: endOfDay(createdAtEndDate),
        },
      };
    }

    if (schedulingStartDate && schedulingEndDate) {
      queryArgs.where = {
        ...queryArgs.where,
        installationDate: {
          gte: subDays(startOfDay(schedulingStartDate), 1),
          lte: endOfDay(schedulingEndDate),
        },
      };
      countArgs.where = {
        ...countArgs.where,
        installationDate: {
          gte: subDays(startOfDay(schedulingStartDate), 1),
          lte: endOfDay(schedulingEndDate),
        },
      };
    }

    if (status) {
      queryArgs.where = {
        ...queryArgs.where,
        status: {
            contains: status, mode: 'insensitive'
        },
      };

      countArgs.where = {
        ...countArgs.where,
        status: {
            contains: status, mode: 'insensitive'
        },
      };
    }

    const total = await this.repository.contract.count(countArgs);
    const orders = await this.repository.contract.findMany(queryArgs);

    const pages = Math.ceil(total / limit);

    return {
      orders: orders.map((order) => ({
        id: order.id,
        number: order.number,
        local: order.local,
        price: order.price,
        contact: order.phone,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        schedulingDate: order.installationDate,
        schedulingTime: order.installationHour,
        status: order.status as StatusEnum,
        userId: order.userId,
      })),
      pages,
      total,
      limit,
    };
  }

  async updateStatus(id: string, status: StatusEnum): Promise<void> {
    const order = await this.repository.contract.findUnique({
      where: {
        id,
      },
    });

    if (!order) {
      throw new HttpException(
        'pedido não encontrado com esse id',
        HttpStatus.NOT_FOUND,
      );
    }

    await this.repository.contract.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    return;
  }

  async updateSacheduling(
    id: string,
    schedulingDate: Date,
    schedulingTime: string,
  ): Promise<void> {
    const order = await this.repository.contract.findUnique({
      where: {
        id,
      },
    });

    if (!order) {
      throw new HttpException(
        'pedido não encontrado com esse id',
        HttpStatus.NOT_FOUND,
      );
    }

    await this.repository.contract.update({
      where: {
        id,
      },
      data: {
        installationDate: schedulingDate,
        installationHour: schedulingTime,
      },
    });

    return;
  }

  async update(
    id: string,
    number: number,
    local: string,
    price: number,
    contact: string,
  ): Promise<void> {
    const order = await this.repository.contract.findUnique({
      where: {
        id,
      },
    });

    if (!order) {
      throw new HttpException(
        'pedido não encontrado com esse id',
        HttpStatus.NOT_FOUND,
      );
    }

    await this.repository.contract.update({
      where: {
        id,
      },
      data: {
        number,
        local,
        price,
        phone: contact,
      },
    });

    return;
  };

  async delete(id: string): Promise<void> {
    const order = await this.repository.contract.findUnique({
      where: {
        id,
      },
    });

    if (!order) {
      throw new HttpException(
        'pedido não encontrado com esse id',
        HttpStatus.NOT_FOUND,
      );
    }

    await this.repository.contract.delete({
      where: {
        id,
      },
    });

    return;
  };
};