import { Controller, Get, Post, Body, Param, Delete, Query, Put } from '@nestjs/common';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { GetAllDriversDto } from './dto/get-all-drivers.dto';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) { }

  @Post()
  create(@Body() createDriverDto: CreateDriverDto) {
    return this.driverService.createDriver(createDriverDto);
  }

  @Get()
  findAll(@Query() query: GetAllDriversDto) {
    return this.driverService.findAllDrivers(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.driverService.findDriverById(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateDriverDto) {
    return this.driverService.updateDriver(+id, updateVehicleDto);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.driverService.deleteDriver(+id);
  }
}
