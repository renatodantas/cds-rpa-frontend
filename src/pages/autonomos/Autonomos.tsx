import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
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
import { getAutonomos, removeAutonomo } from '../../api/autonomos.api';
import { Autonomo } from '../../models/autonomo';
import { DEFAULT_PAGE_PARAMS, PageParams } from '../../models/page-params';
import { DEFAULT_PAGINATION, Pagination } from '../../models/pagination';
import { maskCpf } from '../../utils/masks';

export const Autonomos = () => {
  const [autonomos, setAutonomos] =
    useState<Pagination<Autonomo>>(DEFAULT_PAGINATION);
  const [pageParams, setPageParams] = useState<PageParams<Autonomo>>({
    ...DEFAULT_PAGE_PARAMS,
    sort: 'nome'
  });

  useEffect(() => {
    fetchAutonomos();
  }, [pageParams]);

  const fetchAutonomos = async () => {
    const res = await getAutonomos(pageParams);
    setAutonomos({
      items: res.data || DEFAULT_PAGINATION.items,
      total: res.count || DEFAULT_PAGINATION.total
    });
  };

  const handleChange: TableProps<Autonomo>['onChange'] = (_, __, sorter) => {
    const { field, order } = sorter as SorterResult<Autonomo>;
    console.log(sorter);
    const sort = field as keyof Autonomo;
    const ascending = order === 'ascend';
    setPageParams({ ...pageParams, sort, ascending });
  };

  const handleRemoveAutonomo = async (id: number) => {
    await removeAutonomo(id);
    message.info('Autônomo excluído com sucesso');
    fetchAutonomos();
  };

  return (
    <>
      <Space direction="horizontal" size="large" align="start">
        <Typography.Title level={4}>Autônomos</Typography.Title>
        <Link to="/autonomos/new">
          <Button type="primary" size="small" icon={<PlusOutlined />} />
        </Link>
      </Space>

      <Table<Autonomo>
        rowKey="id"
        bordered
        dataSource={autonomos.items}
        locale={{
          emptyText: <Empty description="Nenhum autônomo cadastrado" />
        }}
        onChange={handleChange}
        sortDirections={['ascend', 'descend']}
        pagination={{
          position: ['bottomCenter'],
          current: pageParams.page,
          pageSize: pageParams.size
        }}
      >
        <Column<Autonomo>
          sorter
          title="Nome"
          dataIndex="nome"
          render={(text, item) => (
            <Link to={`/autonomos/${item.id}`}>{text}</Link>
          )}
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
                  onConfirm={() => handleRemoveAutonomo(item.id)}
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
    </>
  );
};
