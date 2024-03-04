import { DataSourceOptions } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';

export const dataSource: DataSourceOptions = {
    type: 'sqlite',
    database: '.db/sql',
    synchronize: true,
    entities: [Vehicle],
};
