import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Encargado, EncargadoRelations, Pedido} from '../models';
import {PedidoRepository} from './pedido.repository';

export class EncargadoRepository extends DefaultCrudRepository<
  Encargado,
  typeof Encargado.prototype.id,
  EncargadoRelations
> {

  public readonly pedidos: HasManyRepositoryFactory<Pedido, typeof Encargado.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('PedidoRepository') protected pedidoRepositoryGetter: Getter<PedidoRepository>,
  ) {
    super(Encargado, dataSource);
    this.pedidos = this.createHasManyRepositoryFactoryFor('pedidos', pedidoRepositoryGetter,);
    this.registerInclusionResolver('pedidos', this.pedidos.inclusionResolver);
  }
}
