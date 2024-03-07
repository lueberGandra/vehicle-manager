import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPaginationOptions, paginateRaw } from 'nestjs-typeorm-paginate';
import { Vehicle } from 'src/libs/typeorm/entities/vehicle.entity';

export class VehicleRepository extends Repository<Vehicle> {
    constructor(
        @InjectRepository(Vehicle) private vehicleRepository: Repository<Vehicle>,
    ) {
        super(
            vehicleRepository.target,
            vehicleRepository.manager,
            vehicleRepository.queryRunner,
        );
    }

    async findAllVehiclesPaginated(filters: Partial<Vehicle>, paginate: IPaginationOptions) {
        const query = this.vehicleRepository.createQueryBuilder('vehicles');
        for (const key in filters) {
            query.andWhere(
                `LOWER(vehicles.${key}) = '${filters[key].toLowerCase()}'`,
            )
        }        
        return paginateRaw(query, paginate);
    }
}
