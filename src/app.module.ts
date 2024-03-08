import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './libs/typeorm/ormconfig'
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { DriverModule } from './modules/driver/driver.module';
import { CarUtilizationRecordModule } from './modules/car-utilization-record/car-utilization-record.module';


@Module({
  imports: [VehicleModule, TypeOrmModule.forRoot(config), DriverModule, CarUtilizationRecordModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
