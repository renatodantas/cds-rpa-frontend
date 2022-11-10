import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  message,
  Row,
  Space,
  Typography
} from 'antd';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  CargosQueries,
  getCargoById,
  saveNewCargo,
  updateCargo
} from '../../api/cargos.api';
import { UnsavedCargo } from '../../models/cargo';

export const CargoEdit = () => {
  const navigate = useNavigate();
  const query = useQueryClient();
  const [form] = Form.useForm<UnsavedCargo>();
  const { id } = useParams();
  const { data, isFetching } = useQuery({
    queryKey: [CargosQueries.GetById, id],
    queryFn: () => getCargoById(id),
    refetchOnMount: true
  });

  useEffect(() => {
    form.setFieldsValue({ ...data });
  }, [data]);

  const onSuccess = () =>
    query.invalidateQueries({
      queryKey: [CargosQueries.GetAll, CargosQueries.GetById]
    });
  const newCargoMutation = useMutation({
    mutationFn: saveNewCargo,
    onSuccess
  });

  const updateCargoMutation = useMutation({
    mutationFn: (values: UnsavedCargo) => updateCargo(id, values),
    onSuccess
  });

  const isProcessingUpdate =
    newCargoMutation.isLoading || updateCargoMutation.isLoading;

  const onFinish = async (values: UnsavedCargo) => {
    try {
      if (id === 'new') {
        await newCargoMutation.mutateAsync(values);
        message.info('Cargo criado com sucesso');
      } else {
        await updateCargoMutation.mutateAsync(values);
        message.info('Cargo atualizado com sucesso');
      }
      navigate('/cargos');
    } catch (error) {
      const err = error as AxiosError;
      message.error(`Erro ao salvar cargo: ${err.response?.data}`);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Row>
      <Col span={8} offset={8}>
        <Typography.Title level={4}>
          {id === 'new' ? 'Editar' : 'Criar novo'} cargo
        </Typography.Title>

        <Form
          form={form}
          disabled={isFetching || isProcessingUpdate}
          name="editCargoForm"
          layout="vertical"
          initialValues={data}
          validateMessages={{ required: '${label} é obrigatório' }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="Nome" name="nome" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Space direction="vertical" />

          <Form.Item label="Centro de Custo" name="codigoCentroCusto">
            <Input placeholder="Código do centro de custo" />
          </Form.Item>

          <Space direction="vertical" />

          <Form.Item
            label="Descrição do centro de custo"
            name="descricaoCentroCusto"
          >
            <Input placeholder="Descrição do centro de custo" />
          </Form.Item>

          <Divider />

          <Space size="middle">
            <Button type="primary" htmlType="submit">
              Salvar
            </Button>
            <Link to="/cargos">Voltar</Link>
          </Space>
        </Form>
      </Col>
    </Row>
  );
};
