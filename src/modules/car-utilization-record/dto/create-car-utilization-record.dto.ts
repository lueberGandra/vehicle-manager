import { Transform } from 'class-transformer';
import { IsDate,  IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCarUtilizationRecordDto {
    @IsInt()
    @IsNotEmpty()
    vehicleId: number;

    @IsInt()
    @IsNotEmpty()
    driverId: number;

    @IsString()
    @IsNotEmpty()
    reason: string;

    @IsDate()
    @IsNotEmpty()
    @Transform(value=>new Date(value.value))
    utilizationStartDate: Date
}
