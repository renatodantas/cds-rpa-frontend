import { useMutation, useQuery } from '@tanstack/react-query';
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  message,
  Row,
  Typography
} from 'antd';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  AutonomosQueries,
  getAutonomoById,
  saveNewAutonomo,
  updateAutonomo
} from '../../api/autonomos.api';
import { UnsavedAutonomo } from '../../models/autonomo';

export const AutonomoEdit = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm<UnsavedAutonomo>();
  const { id } = useParams();
  const { data, isFetching } = useQuery({
    queryKey: [AutonomosQueries.GetById, id],
    queryFn: () => getAutonomoById(id),
    refetchOnMount: true
  });

  useEffect(() => {
    form.setFieldsValue({ ...data });
  }, [data]);

  const newAutonomoMutation = useMutation({
    mutationFn: saveNewAutonomo
  });

  const updateAutonomoMutation = useMutation({
    mutationFn: (values: UnsavedAutonomo) => updateAutonomo(id, values)
  });

  const isProcessingUpdate =
    newAutonomoMutation.isLoading || updateAutonomoMutation.isLoading;

  const onFinish = async (values: UnsavedAutonomo) => {
    try {
      if (id === 'new') {
        await newAutonomoMutation.mutateAsync(values);
        message.info('Autônomo criado com sucesso');
      } else {
        await updateAutonomoMutation.mutateAsync(values);
        message.info('Autônomo atualizado com sucesso');
      }
      navigate('/autonomos');
    } catch (error) {
      const err = error as AxiosError;
      message.error(`Erro ao salvar autônomo: ${err.response?.data}`);
    }
  };

  return (
    <Row>
      <Col span={14} offset={5}>
        <Typography.Title level={4}>
          {id === 'new' ? 'Editar' : 'Criar novo'} autônomo
        </Typography.Title>

        <Form
          form={form}
          disabled={isFetching || isProcessingUpdate}
          initialValues={data}
          className="autonomo-edit-form"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Row gutter={24}>
            <Col span={18}>
              <Form.Item label="Nome" name="nome" rules={[{ required: true }]}>
                <Input placeholder="Nome" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="CPF"
                name="cpf"
                rules={[{ required: true, len: 11 }]}
              >
                <Input placeholder="CPF" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Banco" name="banco">
                <Input placeholder="Nome do banco" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Agência" name="agencia">
                <Input placeholder="Agência" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Conta" name="conta">
                <Input placeholder="C/C" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Operação" name="operacao">
                <Input placeholder="Op." />
              </Form.Item>
            </Col>
            <Col span={18}>
              <Form.Item label="PIX" name="pix">
                <Input placeholder="Código do PIX (CPF, celular, email ou chave)" />
              </Form.Item>
            </Col>
          </Row>

          <Divider style={{ marginTop: '0' }} />

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Salvar
            </Button>
            <Link to="/autonomos" style={{ marginLeft: 20 }}>
              Voltar
            </Link>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
