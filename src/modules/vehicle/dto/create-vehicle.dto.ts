import {  IsNotEmpty, IsString} from 'class-validator'
import { IsBrazilianCarPlate } from 'src/utils/decorators/isBrazilianCarPlateValidator';
export class CreateVehicleDto {
    @IsString()
    @IsNotEmpty()
    color: string;

    @IsString()
    @IsNotEmpty()
    brand: string;

    @IsString()
    @IsBrazilianCarPlate()
    @IsNotEmpty()
    plate: string;
}
