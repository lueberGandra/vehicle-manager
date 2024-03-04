import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from 'src/libs/typeorm/entities/vehicle.entity';
import { Repository } from 'typeorm';
import { GetAllVehiclesDto } from './dto/get-all-vehicle.dto copy';

@Injectable()
export class VehicleService {
  constructor(@InjectRepository(Vehicle) private vehicleRepository: Repository<Vehicle>) { }
  async createVehicle(createVehicleDto: CreateVehicleDto) {
    try {
      const vehicle = await this.vehicleRepository.save(createVehicleDto)
      return vehicle
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllVehicles(queryData:GetAllVehiclesDto) {
    try {
      const vehicles = await this.vehicleRepository.find({ where: queryData })
      return vehicles
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} vehicle`;
  }

  update(id: number, updateVehicleDto: UpdateVehicleDto) {
    return `This action updates a #${id} vehicle`;
  }

  remove(id: number) {
    return `This action removes a #${id} vehicle`;
  }
}
