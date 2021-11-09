import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Producto} from './producto.model';
import {Encargado} from './encargado.model';

@model()
export class Pedido extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombreCliente: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  celularCliente: string;

  @belongsTo(() => Producto)
  productoId: string;

  @belongsTo(() => Encargado)
  encargadoId: string;

  constructor(data?: Partial<Pedido>) {
    super(data);
  }
}

export interface PedidoRelations {
  // describe navigational properties here
}

export type PedidoWithRelations = Pedido & PedidoRelations;
