import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import { AuthModule } from './auth/auth.module';
import * as process from "node:process";
import {ConfigModule} from '@nestjs/config'
import { QuestionsModule } from './questions/questions.module';
import {GatewayModule} from "./gateway/gateway.module";

@Module({
  imports: [UserModule , GatewayModule ,
    TypeOrmModule.forRootAsync({
      useFactory : ()=>({

        type: 'mysql',
        host: 'localhost',
        port: parseInt(process.env.DB_PORT || '3000') ,
        username: process.env.DB_USERNAME  ,
        password: process.env.DB_PASSWORD ,
        database: process.env.DB_NAME ,
        autoLoadEntities : true,
        synchronize: true,

      })
    }),
    AuthModule,

    ConfigModule.forRoot({
      isGlobal : true ,
      expandVariables : true
    }),

    QuestionsModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
