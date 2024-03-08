import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CarUtilizationRecord } from './car-utilization-record.entity';

@Entity('vehicles')
export class Vehicle {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text', { nullable: false })
    color: string;

    @Column('text', { nullable: false })
    brand: string;

    @Column('text', { nullable: false, unique: true })
    plate: string;

    @OneToMany(() => CarUtilizationRecord, (assignment) => assignment.vehicle)
    assignments: CarUtilizationRecord[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ default: null })
    deletedAt: Date;
    
}
