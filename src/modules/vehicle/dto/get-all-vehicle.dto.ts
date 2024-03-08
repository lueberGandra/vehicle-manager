// query.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsNumberString } from 'class-validator';
import { IsBrazilianCarPlate } from 'src/utils/decorators/isBrazilianCarPlateValidator';

export class GetAllVehiclesDto {
    @IsString()
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

    @IsOptional()
    @IsNotEmpty()
    @IsNumberString()
    page: string = '1';

    @IsOptional()
    @IsNotEmpty()
    @IsNumberString()
    limit: string = '10';
}
