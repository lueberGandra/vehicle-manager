// query.dto.ts
import { IsString, IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';

export class GetAllDriversDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name?: string;

    @IsString()
    @IsNotEmpty()
    @IsNumberString()
    @IsOptional()
    cpf?: string;
}
