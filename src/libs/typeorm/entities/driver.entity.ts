import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('driver')
export class Driver {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text', { nullable: false })
    name: string;

    @Column('text', { nullable: false })
    cpf: string;   

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ default: null })
    deletedAt: Date;

}
