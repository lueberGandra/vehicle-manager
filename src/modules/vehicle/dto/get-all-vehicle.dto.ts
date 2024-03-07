// query.dto.ts
import { IsString, IsHexColor, IsNotEmpty, IsOptional } from 'class-validator';
import { IsBrazilianCarPlate } from 'src/utils/decorators/isBrazilianCarPlateValidator';

export class GetAllVehiclesDto {
    @IsString()
    @IsHexColor()
    @IsOptional()
    color?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    brand?: string;

    @IsString()
    @IsBrazilianCarPlate()
    @IsNotEmpty()
    @IsOptional()
    plate?: string;
}
