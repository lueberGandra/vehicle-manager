// query.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsNumberString } from 'class-validator';

export class GetAllDriversDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsNumberString()
    page: string = '1';

    @IsOptional()
    @IsNotEmpty()
    @IsNumberString()
    limit: string = '10';
}
