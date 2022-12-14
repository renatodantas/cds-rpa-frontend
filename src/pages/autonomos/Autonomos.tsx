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
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { AutonomosQueries, deleteAutonomo, findAutonomos } from '../../api/autonomos.api';
import { CdsLayout } from '../../components/CdsLayout';
import { Autonomo } from '../../models/autonomo';
import { DEFAULT_PAGE, DEFAULT_PAGE_PARAMS, PaginationInput } from '../../models/pagination';
import { maskCpf } from '../../utils/masks';

export const Autonomos = () => {
  const [pageParams, setPageParams] = useState<PaginationInput<Autonomo>>({
    ...DEFAULT_PAGE_PARAMS,
    sort: 'nome'
  });

  const queryClient = useQueryClient();
  const { mutateAsync: deleteItem } = deleteAutonomo();

  // FIXME: verificar porque código sempre faz fetch quando pagina
  const { data, isLoading, isError, error } = findAutonomos(pageParams);

  if (isError) {
    message.error(`Erro ao consultar autônomos: ${error}`);
  }

  const handleChange: TableProps<Autonomo>['onChange'] = (pagination, __, sorter) => {
    const { field, order } = sorter as SorterResult<Autonomo>;
    const sort = field as keyof Autonomo;
    console.log('sort: ', sort);
    setPageParams(params => ({
      ...params,
      page: pagination.current || DEFAULT_PAGE,
      sort,
      order: order === 'ascend' ? 'asc' : 'desc'
    }));
  };

  const handleRemoveAutonomo = (id: number) => {
    deleteItem(id, {
      onSuccess: () => {
        message.info('Autônomo excluído com sucesso');
        queryClient.invalidateQueries(AutonomosQueries.LIST);
      },
      onError: error => {
        message.error(`Erro ao excluir autônomo: ${error}`);
      }
    });
  };

  return (
    <CdsLayout title='Autônomos' addUrl='/autonomos/new'>
      <Table<Autonomo>
        bordered
        dataSource={data?.items}
        loading={isLoading}
        locale={{ emptyText: <Empty description="Nenhum autônomo cadastrado" /> }}
        onChange={handleChange}
        rowKey="id"
        pagination={{
          position: ['bottomCenter'],
          current: pageParams.page,
          total: data?.total
        }}
        size='small'
        sortDirections={['ascend', 'descend']}
      >
        <Column<Autonomo>
          sorter
          title="Nome"
          dataIndex="nome"
          render={(text, item) => <Link to={`/autonomos/${item.id}`}>{text}</Link>}
        />
        <Column<Autonomo>
          sorter
          title="CPF"
          dataIndex="cpf"
          width="400px"
          render={(_, item) => <>{maskCpf(item.cpf)}</>}
        />
        <Column<Autonomo>
          dataIndex="actions"
          className="table-actions-column"
          width="200px"
          align="center"
          render={(_, item) => (
            <Space direction="horizontal">
              <Popconfirm
                placement="left"
                title={
                  <Typography.Text>
                    Confirma a exclusão de{' '}
                    <Typography.Text strong>{item.nome}</Typography.Text>?
                  </Typography.Text>
                }
                onConfirm={() => handleRemoveAutonomo(item.id!!)}
                okText="Sim"
                cancelText="Não"
              >
                <Button danger icon={<DeleteOutlined />}>
                  Excluir
                </Button>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>
    </CdsLayout>
  );
};
