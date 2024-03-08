import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Driver } from './driver.entity';
import { Vehicle } from './vehicle.entity';

@Entity('carUtilizationRecords')
export class CarUtilizationRecord {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    reason: string;

    @Column('datetime')
    utilizationStartDate: Date;

    @Column('datetime', { default: null })
    utilizationEndDate: Date;

    @ManyToOne(() => Vehicle, (vehicle) => vehicle.assignments)
    vehicle: Vehicle;

    @ManyToOne(() => Driver, (driver) => driver.assignments)
    driver: Driver;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ default: null })
    deletedAt: Date;
}
