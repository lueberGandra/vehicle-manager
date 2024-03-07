import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from 'src/libs/typeorm/entities/vehicle.entity';
import { Repository } from 'typeorm';
import { GetAllVehiclesDto } from './dto/get-all-vehicle.dto';

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

  async findAllVehicles(queryData: GetAllVehiclesDto) {
    try {
      const vehicles = await this.vehicleRepository.find({ where: queryData })
      return vehicles
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findVehicleById(id: number) {
    try {
      const vehicle = await this.vehicleRepository.findOne({ where: { id } })
      if (!vehicle) throw new Error(`Vehicle ${id} not found!`)
      return vehicle
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateVehicle(id: number, updateVehicleData: UpdateVehicleDto) {
    try {
      const vehicle = await this.vehicleRepository.findOne({ where: { id } })
      if (!vehicle) throw new Error(`Vehicle ${id} not found!`)
      return await this.vehicleRepository.save({ ...vehicle, ...updateVehicleData })
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteVehicle(id: number) {
    try {
      const vehicle = await this.vehicleRepository.findOne({ where: { id } })
      if (!vehicle) throw new Error(`Vehicle ${id} not found!`)
      await this.vehicleRepository.softDelete({ id })
      return { msg: `Vehicle ${id} successfully deleted!` }
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
