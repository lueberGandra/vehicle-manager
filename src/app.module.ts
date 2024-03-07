import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './libs/typeorm/ormconfig'
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { DriverModule } from './modules/driver/driver.module';


@Module({
  imports: [VehicleModule, TypeOrmModule.forRoot(config), DriverModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
