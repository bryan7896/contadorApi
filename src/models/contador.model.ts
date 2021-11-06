import {Entity, model, property} from '@loopback/repository';

@model()
export class Contador extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  number: number;


  constructor(data?: Partial<Contador>) {
    super(data);
  }
}

export interface ContadorRelations {
  // describe navigational properties here
}

export type ContadorWithRelations = Contador & ContadorRelations;
