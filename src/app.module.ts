import { Module } from '@nestjs/common';
import { UserModule } from './infra/modules/user.module';
import { PrismaService } from './infra/prisma/prisma.service';
import { OrderModule } from './infra/modules/order.module';
import { NoteModule } from './infra/modules/note.module';
import { AuthModule } from './infra/modules/auth.module';
import { RolesGuard } from './middleware/role.guard';
import { APP_GUARD } from '@nestjs/core';
import { SecurityModule } from './infra/modules/security.module';
import { ReportModule } from './infra/modules/report.module';

@Module({
  imports: [
    UserModule,
    OrderModule,
    NoteModule,
    AuthModule,
    SecurityModule,
    ReportModule
  ],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
