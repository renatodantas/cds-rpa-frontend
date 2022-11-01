import { useQuery } from '@tanstack/react-query';
import { Button, Space, Table, Tooltip } from 'antd';
import Column from 'antd/lib/table/Column';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { Link, useSearchParams } from 'react-router-dom';
import { getCargos } from '../../api/cargos.api';
import { Cargo } from '../../models/cargo';

export const Cargos = () => {
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);

  const { isLoading, data } = useQuery({
    queryKey: ['cargos'],
    queryFn: () => getCargos(params)
  });

  return (
    <div>
      <h1>Cargos</h1>
      <Link to="/cargos/new">Incluir</Link>
      <Table loading={isLoading} dataSource={data?.items} rowKey="id" bordered>
        <Column<Cargo>
          title="Nome"
          dataIndex="nome"
          render={(text, item) => <Link to={`/cargos/${item.id}`}>{text}</Link>}
        />
        <Column
          title="Centro Custo"
          dataIndex="codigoCentroCusto"
          width="200px"
        />
        <Column title="Descrição" dataIndex="descricaoCentroCusto" />
        <Column
          dataIndex="actions"
          className="table-actions-column"
          width="200px"
          align="center"
          render={(_, item) => {
            return (
              <Space direction="horizontal">
                <Tooltip title="Excluir">
                  <Button danger icon={<AiFillDelete />}>
                    Editar
                  </Button>
                </Tooltip>
              </Space>
            );
          }}
        />
      </Table>
    </div>
  );
};
