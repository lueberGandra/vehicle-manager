import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('vehicles')
export class Vehicle {
    @PrimaryGeneratedColumn()
    id: number;   

    @Column('text', { default: null })
    color: string;

    @Column('text', { default: null })
    brand: string;

    @Column('text', { default: null, unique: true })
    plate: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ default: null })
    deletedAt: Date;

}
