import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Link {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar' })
  shortId: string;

  @Column({ type: 'varchar' })
  originalUrl: string;

  @Column({ type: 'varchar' })
  shortUrl: string;
}
