import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Homebase} from './homebase.model';

@model()
export class Measurement extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    default: '$now'
  })
  timestamp: number;

  @property({
    type: 'number',
  })
  humidity?: number;

  @property({
    type: 'number',
  })
  temperature?: number;

  @property({
    type: 'number',
  })
  dust?: number;

  @property({
    type: 'number',
  })
  gas?: number;

  @property({
    type: 'number',
  })
  volume?: number;

  @property({
    type: 'number',
  })
  light?: number;

  @belongsTo(() => Homebase)
  homebaseId: number;

  constructor(data?: Partial<Measurement>) {
    super(data);
  }
}

export interface MeasurementRelations {
  // describe navigational properties here
}

export type MeasurementWithRelations = Measurement & MeasurementRelations;
