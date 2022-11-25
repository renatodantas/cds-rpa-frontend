import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputRef,
  message,
  Row,
  Space,
  Typography
} from 'antd';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createCargo, getCargoById, updateCargo } from '../../api/cargos.api';
import { CARGO_DEFAULT_VALUE, UnsavedCargo } from '../../models/cargo';

export const ContratoEdit = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm<UnsavedCargo>();
  const focusRef = useRef<InputRef>(null);
  const { id } = useParams();
  const [cargo, setCargo] = useState<UnsavedCargo>(CARGO_DEFAULT_VALUE);

  useEffect(() => {
    focusRef.current?.focus();
    getCargoById(id).then((res) => setCargo(res));
  }, []);

  useEffect(() => {
    form.setFieldsValue({ ...cargo });
  }, [cargo]);

  const onFinish = async (values: UnsavedCargo) => {
    try {
      if (id === 'new') {
        await createCargo(values);
        message.info('Cargo criado com sucesso');
      } else {
        await updateCargo(id, values);
        message.info('Cargo atualizado com sucesso');
      }
      navigate('/cargos');
    } catch (error: any) {
      message.error(`Erro ao salvar cargo: ${error}`);
    }
  };

  return (
    <Row>
      <Col span={8} offset={8}>
        <Typography.Title level={4}>
          {id === 'new' ? 'Editar' : 'Criar novo'} contrato
        </Typography.Title>

        <Form
          form={form}
          name="editCargoForm"
          layout="vertical"
          initialValues={cargo}
          validateMessages={{ required: '${label} é obrigatório' }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="Nome" name="nome" rules={[{ required: true }]}>
            <Input ref={focusRef} />
          </Form.Item>

          <Form.Item label="Centro de Custo" name="codigoCentroCusto">
            <Input placeholder="Código do centro de custo" />
          </Form.Item>

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
