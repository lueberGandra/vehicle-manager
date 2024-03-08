import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCarUtilizationRecordDto } from './dto/create-car-utilization-record.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CarUtilizationRecord } from 'src/libs/typeorm/entities/car-utilization-record.entity';
import { Driver } from 'src/libs/typeorm/entities/driver.entity';
import { Vehicle } from 'src/libs/typeorm/entities/vehicle.entity';
import { FinishCarUtilizationRecordDto } from './dto/finish-car-utilization-record.dto';

@Injectable()
export class CarUtilizationRecordService {
  constructor(
    @InjectRepository(CarUtilizationRecord) private carUtilizationRecord: Repository<CarUtilizationRecord>,
    @InjectRepository(Driver) private driverRepository: Repository<Driver>,
    @InjectRepository(Vehicle) private vehicleRepository: Repository<Vehicle>

  ) { }
  async createsRecord(createCarUtilizationRecordData: CreateCarUtilizationRecordDto) {
    try {
      const { driverId, vehicleId, ...restOfCarUtilizationRecord } = createCarUtilizationRecordData
      const [driver, vehicle] = await Promise.all([
        await this.driverRepository.findOne({ where: { id: driverId } }),
        await this.vehicleRepository.findOne({ where: { id: vehicleId } })
      ])
      if (!driver) throw new Error(`Driver ${driverId} not found!`)
      if (!vehicle) throw new Error(`Vehicle ${vehicleId} not found!`)

      const [driverOccupied, vehicleOccupied] = await Promise.all([
        this.carUtilizationRecord.find({ where: { driver: { id: driverId }, utilizationEndDate: null } }),
        this.carUtilizationRecord.find({ where: { vehicle: { id: vehicleId }, utilizationEndDate: null } })
      ])

      if (driverOccupied.length) throw new Error(`Driver ${driverId} not available!`)
      if (vehicleOccupied.length) throw new Error(`Vehicle ${vehicleId} not available!`)

      return await this.carUtilizationRecord.save({ driver, vehicle, ...restOfCarUtilizationRecord })
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async finishCarUtilization(carUtilizationRecordId: number, finishCarUtilizationRecordData: FinishCarUtilizationRecordDto) {
    try {
      const { utilizationEndDate } = finishCarUtilizationRecordData
      const carUtilizationRecord = await this.carUtilizationRecord.findOne({ where: { id: carUtilizationRecordId } })
      if (!carUtilizationRecord) throw new Error(`Car Utilization Record ${carUtilizationRecordId} not found!`)

      if (carUtilizationRecord.utilizationStartDate > utilizationEndDate) {
        throw new Error(`utilizationEndDate must be greater than utilizationStartDate!`)
      }

      return await this.carUtilizationRecord.save({ ...carUtilizationRecord, utilizationEndDate })
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllCarUtilizationRecords() {
    try {
      return await this.carUtilizationRecord.find({ relations: { driver: true, vehicle: true } })
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
