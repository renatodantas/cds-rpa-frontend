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
import {
  AutonomosQueries,
  getAutonomos,
  removeAutonomo
} from '../../api/autonomos.api';
import { Autonomo } from '../../models/autonomo';
import { maskCpf } from '../../utils/masks';

export const Autonomos = () => {
  const [searchParams] = useSearchParams();
  const query = useQueryClient();
  const params = Object.fromEntries(searchParams);
  const { Text } = Typography;

  const { isFetching, data } = useQuery({
    queryKey: [AutonomosQueries.GetAll],
    queryFn: () => getAutonomos(params)
  });

  const removeAutonomoMutation = useMutation({
    mutationFn: (id: number) => removeAutonomo(id),
    onSuccess: () => {
      message.info('Autônomo excluído com sucesso');
      query.invalidateQueries({
        queryKey: [AutonomosQueries.GetAll]
      });
    }
  });

  const handleRemoveAutonomo = (id: number) =>
    removeAutonomoMutation.mutateAsync(id);
  const isDeleting = removeAutonomoMutation.isLoading;

  return (
    <>
      <Space direction="horizontal" size="large" align="start">
        <Typography.Title level={4}>Autônomos</Typography.Title>
        <Link to="/autonomos/new">
          <Button type="primary" size="small" icon={<PlusOutlined />} />
        </Link>
      </Space>

      <Table
        bordered
        loading={isFetching}
        dataSource={data?.items}
        rowKey="id"
        locale={{
          emptyText: <Empty description="Nenhum autônomo cadastrado" />
        }}
      >
        <Column<Autonomo>
          title="Nome"
          dataIndex="nome"
          render={(text, { id }) => <Link to={`/autonomos/${id}`}>{text}</Link>}
        />
        <Column<Autonomo>
          title="CPF"
          dataIndex="cpf"
          width="400px"
          render={(text) => <>{maskCpf(text)}</>}
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
                    <Text>
                      Confirma a exclusão de <Text strong>{item.nome}</Text>?
                    </Text>
                  }
                  onConfirm={() => handleRemoveAutonomo(item.id)}
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
