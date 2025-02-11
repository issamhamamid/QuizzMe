import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [UserModule ,
    TypeOrmModule.forRootAsync({
      useFactory : ()=>({

        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '1234',
        database: 'quizzme',
        autoLoadEntities : true,
        synchronize: true,
        logging : true

      })
    }),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
