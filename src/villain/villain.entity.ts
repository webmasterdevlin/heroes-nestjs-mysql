import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';

@Entity()
export class VillainEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 100, nullable: false })
  firstName: string;
  @Column({ length: 100, nullable: true })
  lastName: string;
  @Column({ length: 100, nullable: true })
  house: string;
  @Column({ length: 100, nullable: true })
  knownAs: string;
}
