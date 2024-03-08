import { PartialType } from '@nestjs/mapped-types';
import { CreateCarUtilizationRecordDto } from './create-car-utilization-record.dto';

export class UpdateCarUtilizationRecordDto extends PartialType(CreateCarUtilizationRecordDto) {}
