import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from 'src/libs/typeorm/entities/vehicle.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VehicleService {
  constructor(@InjectRepository(Vehicle) private vehicleRepository: Repository<Vehicle>) { }
  createVehicle(createVehicleDto: CreateVehicleDto) {
    return this.vehicleRepository.save({brand:'GM',color:'#010',plate:'787asfsa-az8afss'})
  }

  findAll() {
    return this.vehicleRepository.find()
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
