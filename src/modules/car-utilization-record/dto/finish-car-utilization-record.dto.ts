import { Transform } from 'class-transformer';
import { IsDate,  IsNotEmpty } from 'class-validator';

export class FinishCarUtilizationRecordDto {

    @IsDate()
    @IsNotEmpty()
    @Transform(value => new Date(value.value))
    utilizationEndDate: Date
}
