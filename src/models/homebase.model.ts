import {Entity, model, property, hasMany} from '@loopback/repository';
import {Measurement} from './measurement.model';

@model()
export class Homebase extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @hasMany(() => Measurement)
  measurements: Measurement[];

  constructor(data?: Partial<Homebase>) {
    super(data);
  }
}

export interface HomebaseRelations {
  // describe navigational properties here
}

export type HomebaseWithRelations = Homebase & HomebaseRelations;
