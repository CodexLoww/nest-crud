
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { AddressEntity } from '../entity/address.entity';

@Injectable()
export class AddressRepository extends Repository<AddressEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(AddressEntity, dataSource.createEntityManager());
  }

  async findOneById(id: string): Promise<AddressEntity> {
    return super.findOne({
      where: { id },
    });
  }
}