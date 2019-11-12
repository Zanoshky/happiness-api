import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Homebase>) {
    super(data);
  }
}

export interface HomebaseRelations {
  // describe navigational properties here
}

export type HomebaseWithRelations = Homebase & HomebaseRelations;
