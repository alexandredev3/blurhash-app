import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';
import { APP_URL } from '../utils/environment';

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  path: string;

  @Column('varchar')
  hash: string;

  @Expose({ name: 'image_url' })
  getImageUrl() {
    return `${APP_URL}/uploads/${this.path}`;
  }
}
