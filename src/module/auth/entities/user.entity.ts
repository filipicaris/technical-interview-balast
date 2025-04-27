import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'username', nullable: false })
  username: string;

  @Column({ name: 'password', nullable: false })
  password: string;

  @Column({ name: 'email', nullable: false })
  email: string;

  constructor(input: Omit<User, 'id'>) {
    this.username = input?.username;
    this.password = input?.password;
    this.email = input?.email;
  }
}
