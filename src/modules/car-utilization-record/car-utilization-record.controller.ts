import { Controller, Get, Post, Body,  Param } from '@nestjs/common';
import { CarUtilizationRecordService } from './car-utilization-record.service';
import { CreateCarUtilizationRecordDto } from './dto/create-car-utilization-record.dto';
import { FinishCarUtilizationRecordDto } from './dto/finish-car-utilization-record.dto';

@Controller('car-utilization-record')
export class CarUtilizationRecordController {
  constructor(
    private readonly carUtilizationRecordService: CarUtilizationRecordService
  ) { }

  @Post()
  create(@Body() createCarUtilizationRecordData: CreateCarUtilizationRecordDto) {
    return this.carUtilizationRecordService.createsRecord(createCarUtilizationRecordData);
  }

  @Post('finish/:id')
  findAll(
    @Body() finishCarUtilizationRecordData: FinishCarUtilizationRecordDto,
    @Param('id') id: string
  ) {
    return this.carUtilizationRecordService.finishCarUtilization(+id, finishCarUtilizationRecordData);
  }

  @Get()
  find() {
    return this.carUtilizationRecordService.findAllCarUtilizationRecords();
  }

}
