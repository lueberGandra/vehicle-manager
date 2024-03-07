import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import { IsCPF } from 'src/utils/decorators/isValidCPFValidator';

export class CreateDriverDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsNumberString()
    @IsCPF()
    cpf: string;
}
