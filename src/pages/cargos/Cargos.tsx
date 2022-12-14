import { DeleteOutlined } from '@ant-design/icons';
import {
  Button,
  Empty,
  message,
  Popconfirm,
  Space,
  Table,
  TableProps,
  Typography
} from 'antd';
import Column from 'antd/lib/table/Column';
import { SorterResult } from 'antd/lib/table/interface';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCargos, removeCargo } from '../../api/cargos.api';
import { CdsLayout } from '../../components/CdsLayout';
import { Cargo } from '../../models/cargo';
import { DEFAULT_PAGE_PARAMS, PaginationInput } from '../../models/page-params';
import { DEFAULT_PAGINATION, PaginationOutput } from '../../models/pagination';

export const Cargos = () => {
  const [cargos, setCargos] = useState<PaginationOutput<Cargo>>(DEFAULT_PAGINATION);
  const [pageParams, setPageParams] = useState<PaginationInput<Cargo>>({
    ...DEFAULT_PAGE_PARAMS,
    sort: 'nome'
  });

  useEffect(() => {
    fetchCargos();
  }, [pageParams]);

  const fetchCargos = () => {
    getCargos(pageParams)
      .then(res =>
        setCargos({
          items: res.data || DEFAULT_PAGINATION.items,
          total: res.count || DEFAULT_PAGINATION.total
        })
      ).catch(err => message.error(err.message));
  };

  const handleChange: TableProps<Cargo>['onChange'] = (_, __, sorter) => {
    const { field, order } = sorter as SorterResult<Cargo>;
    const sort = field as keyof Cargo;
    const ascending = order === 'ascend';
    setPageParams({ ...pageParams, sort, ascending });
  };

  const handleRemoveCargo = async (id: number) => {
    await removeCargo(id);
    message.info('Cargo excluído com sucesso');
    fetchCargos();
  };

  return (
    <CdsLayout title='Cargos' addUrl='/cargos/new'>
      <Table<Cargo>
        rowKey="id"
        bordered
        dataSource={cargos.items}
        locale={{ emptyText: <Empty description="Nenhum cargo cadastrado" /> }}
        onChange={handleChange}
        sortDirections={['ascend', 'descend']}
        pagination={{
          position: ['bottomCenter'],
          current: pageParams.page,
          pageSize: pageParams.size
        }}
      >
        <Column<Cargo>
          sorter
          title="Nome"
          dataIndex="nome"
          render={(text, item) => <Link to={`/cargos/${item.id}`}>{text}</Link>}
        />
        <Column<Cargo>
          sorter
          title="Centro Custo"
          dataIndex="codigoCentroCusto"
          width="400px"
          render={(_, item) => (
            <>
              {`${item.codigoCentroCusto} - ${item.descricaoCentroCusto}`}
            </>
          )}
        />
        <Column<Cargo>
          dataIndex="actions"
          className="table-actions-column"
          width="200px"
          align="center"
          render={(_, item) => {
            return (
              <Space direction="horizontal">
                <Popconfirm
                  placement="left"
                  title={
                    <Typography.Text>
                      Confirma a exclusão de{' '}
                      <Typography.Text strong>{item.nome}</Typography.Text>?
                    </Typography.Text>
                  }
                  onConfirm={() => handleRemoveCargo(item.id)}
                  okText="Sim"
                  cancelText="Não"
                >
                  <Button danger icon={<DeleteOutlined />}>
                    Excluir
                  </Button>
                </Popconfirm>
              </Space>
            );
          }}
        />
      </Table>
    </CdsLayout>
  );
};
