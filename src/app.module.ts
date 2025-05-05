import { Module } from '@nestjs/common';
import { UserModule } from './infra/modules/user.module';
import { PrismaService } from './infra/prisma/prisma.service';
import { OrderModule } from './infra/modules/order.module';
import { NoteModule } from './infra/modules/note.module';

@Module({
  imports: [
    UserModule,
    OrderModule,
    NoteModule
  ],
  providers: [
    PrismaService
  ],
})
export class AppModule {}
