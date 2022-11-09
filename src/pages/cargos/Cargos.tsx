import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Button,
  Empty,
  message,
  Popconfirm,
  Space,
  Table,
  Typography
} from 'antd';
import Column from 'antd/lib/table/Column';
import { Link, useSearchParams } from 'react-router-dom';
import { CargosQueries, getCargos, removeCargo } from '../../api/cargos.api';
import { Cargo } from '../../models/cargo';

export const Cargos = () => {
  const [searchParams] = useSearchParams();
  const query = useQueryClient();
  const params = Object.fromEntries(searchParams);
  const { Text } = Typography;

  const { isFetching, data } = useQuery({
    queryKey: [CargosQueries.GetAll],
    queryFn: () => getCargos(params)
  });

  const removeCargoMutation = useMutation({
    mutationFn: (id: number) => removeCargo(id),
    onSuccess: () => {
      message.info('Cargo excluído com sucesso');
      query.invalidateQueries({
        queryKey: [CargosQueries.GetAll]
      });
    }
  });

  const handleRemoveCargo = (id: number) => removeCargoMutation.mutateAsync(id);
  const isDeleting = removeCargoMutation.isLoading;

  return (
    <>
      <Space direction="horizontal" size="large" align="start">
        <Typography.Title level={4}>Cargos</Typography.Title>
        <Link to="/cargos/new">
          <Button type="primary" size="small" icon={<PlusOutlined />} />
        </Link>
      </Space>
      <Table
        bordered
        loading={isFetching}
        dataSource={data?.items}
        rowKey="id"
        locale={{ emptyText: <Empty description="Nenhum cargo cadastrado" /> }}
      >
        <Column<Cargo>
          title="Nome"
          dataIndex="nome"
          render={(text, item) => <Link to={`/cargos/${item.id}`}>{text}</Link>}
        />
        <Column<Cargo>
          title="Centro Custo"
          width="400px"
          render={(_, item) => (
            <span>
              {item.codigoCentroCusto + ' - ' + item.descricaoCentroCusto}
            </span>
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
                    <Text>
                      Confirma a exclusão de <Text strong>{item.nome}</Text>?
                    </Text>
                  }
                  onConfirm={() => handleRemoveCargo(item.id)}
                  okButtonProps={{ loading: isDeleting }}
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
