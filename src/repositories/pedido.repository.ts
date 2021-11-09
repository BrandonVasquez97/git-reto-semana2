import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Pedido, PedidoRelations, Producto, Encargado} from '../models';
import {ProductoRepository} from './producto.repository';
import {EncargadoRepository} from './encargado.repository';

export class PedidoRepository extends DefaultCrudRepository<
  Pedido,
  typeof Pedido.prototype.id,
  PedidoRelations
> {

  public readonly producto: BelongsToAccessor<Producto, typeof Pedido.prototype.id>;

  public readonly encargado: BelongsToAccessor<Encargado, typeof Pedido.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>, @repository.getter('EncargadoRepository') protected encargadoRepositoryGetter: Getter<EncargadoRepository>,
  ) {
    super(Pedido, dataSource);
    this.encargado = this.createBelongsToAccessorFor('encargado', encargadoRepositoryGetter,);
    this.registerInclusionResolver('encargado', this.encargado.inclusionResolver);
    this.producto = this.createBelongsToAccessorFor('producto', productoRepositoryGetter,);
    this.registerInclusionResolver('producto', this.producto.inclusionResolver);
  }
}
