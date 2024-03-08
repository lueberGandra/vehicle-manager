// query-validation.pipe.ts
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { GetAllVehiclesDto } from 'src/modules/vehicle/dto/get-all-vehicle.dto';

@Injectable()
export class QueryValidationPipe implements PipeTransform {
    async transform(value: any): Promise<any> {
        const dto = plainToClass(GetAllVehiclesDto, value, { excludeExtraneousValues: true });

        const errors = await validate(dto);
        if (errors.length > 0) {
            const message = errors.map(error => Object.values(error.constraints)).join(', ');
            throw new BadRequestException(message);
        }

        return value;
    }
}
