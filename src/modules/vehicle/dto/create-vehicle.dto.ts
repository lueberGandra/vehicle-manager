import { IsHexColor, IsNotEmpty, IsString} from 'class-validator'
export class CreateVehicleDto {
    @IsString()
    @IsHexColor()
    @IsNotEmpty()
    color: string;

    @IsString()
    @IsNotEmpty()
    brand: string;

    @IsString()
    @IsNotEmpty()
    plate: string;
}
