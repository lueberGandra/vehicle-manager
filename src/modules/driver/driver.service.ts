import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from 'src/libs/typeorm/entities/driver.entity';
import { Repository } from 'typeorm';
import { GetAllDriversDto } from './dto/get-all-drivers.dto';
import { paginateRaw } from 'nestjs-typeorm-paginate';

@Injectable()
export class DriverService {
  constructor(@InjectRepository(Driver) private driverRepository: Repository<Driver>) { }

  async createDriver(createDriverData: CreateDriverDto) {
    try {
      const driver = await this.driverRepository.save(createDriverData)
      return driver
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllDrivers(queryData: GetAllDriversDto) {
    try {
      const { page, limit, ...filters } = queryData
      const drivers = this.driverRepository.createQueryBuilder('drivers');
      for (const key in filters) {
        drivers.andWhere(
          `LOWER(drivers.${key}) LIKE '%${filters[key].toLowerCase()}%'`,
        )
      }
      return paginateRaw(drivers, { page, limit });

    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findDriverById(id: number) {
    try {
      const driver = await this.driverRepository.findOne({ where: { id } })
      if (!driver) {
        throw new HttpException(`Driver ${id} not found!`, HttpStatus.NOT_FOUND);
      }
      return driver
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateDriver(id: number, updateDriverData: UpdateDriverDto) {
    try {
      const driver = await this.driverRepository.findOne({ where: { id } })
      if (!driver) throw new Error(`Driver ${id} not found!`)
      return await this.driverRepository.save({ ...driver, ...updateDriverData })
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteDriver(id: number) {
    try {
      const driver = await this.driverRepository.findOne({ where: { id } })
      if (!driver) throw new Error(`Driver ${id} not found!`)
      await this.driverRepository.softDelete({ id })
      return { msg: `Driver ${id} successfully deleted!` }
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
