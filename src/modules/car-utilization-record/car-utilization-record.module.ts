import { Module } from '@nestjs/common';
import { CarUtilizationRecordService } from './car-utilization-record.service';
import { CarUtilizationRecordController } from './car-utilization-record.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarUtilizationRecord } from 'src/libs/typeorm/entities/car-utilization-record.entity';
import { Driver } from 'src/libs/typeorm/entities/driver.entity';
import { Vehicle } from 'src/libs/typeorm/entities/vehicle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarUtilizationRecord,Driver,Vehicle])],
  controllers: [CarUtilizationRecordController],
  providers: [CarUtilizationRecordService],
})
export class CarUtilizationRecordModule {}
