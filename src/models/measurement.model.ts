import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Homebase} from './homebase.model';

@model()
export class Measurement extends Entity {
  @property({
    type: 'string',
    id: true,
    required: false,
    length: 36,
    defaultFn: 'uuidv4',
  })
  id?: string;

  @property({
    type: 'date',
    default: '$now',
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

  @property({
    type: 'number',
  })
  pressure?: number;

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
