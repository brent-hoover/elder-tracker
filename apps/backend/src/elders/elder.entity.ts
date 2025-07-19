import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { StatusUpdate } from '../status-updates/status-update.entity';

@Entity('elders')
export class Elder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date | null;

  @Column({ type: 'varchar', nullable: true })
  address: string | null;

  @Column({ type: 'varchar', nullable: true })
  phoneNumber: string | null;

  @Column({ type: 'varchar', nullable: true })
  emergencyContact: string | null;

  @Column({ type: 'varchar', nullable: true })
  emergencyContactPhone: string | null;

  @Column({ type: 'text', nullable: true })
  medicalNotes: string | null;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => User, { eager: false })
  @JoinTable({
    name: 'elder_caregivers',
    joinColumn: { name: 'elder_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  caregivers: User[];

  @OneToMany(() => StatusUpdate, (statusUpdate) => statusUpdate.elder)
  statusUpdates: StatusUpdate[];
}
