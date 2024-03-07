import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './libs/typeorm/ormconfig'
import { VehicleModule } from './modules/vehicle/vehicle.module';


@Module({
  imports: [VehicleModule, TypeOrmModule.forRoot(config)],
  controllers: [],
  providers: [],
})
export class AppModule { }
