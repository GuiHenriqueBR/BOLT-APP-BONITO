import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { Category } from './entities/category.entity';
import { Subcategory } from './entities/subcategory.entity';
import { Service } from './entities/service.entity';
import { ServicePackage } from './entities/service_package.entity';
import { OpenRequest } from './entities/open_request.entity';
import { Proposal } from './entities/proposal.entity';
import { Booking } from './entities/booking.entity';
import { Conversation } from './entities/conversation.entity';
import { Message } from './entities/message.entity';
import { FinancialRecord } from './entities/financial_record.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ServicesModule } from './services/services.module';
import { RequestsModule } from './requests/requests.module';
import { BookingsModule } from './bookings/bookings.module';
import { FinancialsModule } from './financials/financials.module';
import { ChatModule } from './chat/chat.module';
import { CategoriesModule } from './categories/categories.module';
import { CacheModule } from './cache/cache.module';
import { EventsModule } from './events/events.module';
import { UploadModule } from './upload/upload.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('POSTGRES_HOST'),
        port: +(config.get<string>('POSTGRES_PORT') || 5432),
        username: config.get('POSTGRES_USER'),
        password: config.get('POSTGRES_PASSWORD'),
        database: config.get('POSTGRES_DB'),
        autoLoadEntities: true,
        synchronize: true, // Em produção, usar migrations!
        entities: [User, Profile, Category, Subcategory, Service, ServicePackage, OpenRequest, Proposal, Booking, Conversation, Message, FinancialRecord],
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    ServicesModule,
    RequestsModule,
    BookingsModule,
    FinancialsModule,
    ChatModule,
    CategoriesModule,
    CacheModule,
    EventsModule,
    UploadModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
