import {Model, model, property} from '@loopback/repository';

@model()
export class Status extends Model {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
  })
  happiness?: number;

  @property({
    type: 'number',
  })
  homebaseId?: number;

  @property({
    type: 'date',
    required: true,
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


  constructor(data?: Partial<Status>) {
    super(data);
  }
}

export interface StatusRelations {
  // describe navigational properties here
}

export type StatusWithRelations = Status & StatusRelations;
