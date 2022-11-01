import { Table } from 'antd';
import { Link, useLoaderData } from 'react-router-dom';
import { Cargo } from '../../models/cargo';
import { Pagination } from '../../models/pagination';

export const Cargos = () => {
  const datasource = useLoaderData() as Pagination<Cargo>;
  const columns = [
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome'
    },
    {
      title: 'Centro de Custo',
      dataIndex: 'codigoCentroCusto',
      key: 'codigoCentroCusto'
    },
    {
      title: 'Descrição',
      dataIndex: 'descricaoCentroCusto',
      key: 'descricaoCentroCusto'
    }
  ];

  return (
    <div>
      <h1>Cargos</h1>
      <Link to="/cargos/new">Incluir</Link>
      <Table dataSource={datasource.items} columns={columns} rowKey="id" />
    </div>
  );
};
