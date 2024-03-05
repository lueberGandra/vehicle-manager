import { Controller, Get, Post, Body, Param, Delete, Query, Put } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { GetAllVehiclesDto } from './dto/get-all-vehicle.dto copy';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) { }

  @Post()
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehicleService.createVehicle(createVehicleDto);
  }

  @Get()
  findAll(@Query() query: GetAllVehiclesDto) {
    return this.vehicleService.findAllVehicles(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehicleService.findVehicleById(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehicleService.updateVehicle(+id, updateVehicleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehicleService.remove(+id);
  }
}
