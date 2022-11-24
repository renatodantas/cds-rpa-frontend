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
import {
  createAutonomo,
  getAutonomoById,
  updateAutonomo
} from '../../api/autonomos.api';
import { AUTONOMO_DEFAULT_VALUE, UnsavedAutonomo } from '../../models/autonomo';

export const AutonomoEdit = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm<UnsavedAutonomo>();
  const focusRef = useRef<InputRef>(null);
  const { id } = useParams();
  const [autonomo, setAutonomo] = useState<UnsavedAutonomo>(
    AUTONOMO_DEFAULT_VALUE
  );

  useEffect(() => {
    focusRef.current?.focus();
    getAutonomoById(id).then((res) => setAutonomo(res));
  }, []);

  useEffect(() => {
    form.setFieldsValue({ ...autonomo });
  }, [autonomo]);

  const onFinish = async (values: UnsavedAutonomo) => {
    try {
      if (id === 'new') {
        await createAutonomo(values);
        message.info('Cargo criado com sucesso');
      } else {
        await updateAutonomo(id, values);
        message.info('Autônomo atualizado com sucesso');
      }
      navigate('/autonomos');
    } catch (error: any) {
      message.error(`Erro ao salvar autônomo: ${error}`);
    }
  };

  return (
    <Row>
      <Col span={16} offset={4}>
        <Typography.Title level={4}>
          {id === 'new' ? 'Editar' : 'Criar novo'} autônomo
        </Typography.Title>

        <Form
          form={form}
          name="editAutonomoForm"
          layout="vertical"
          initialValues={autonomo}
          validateMessages={{ required: '${label} é obrigatório' }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row>
            <Col span={15}>
              <Form.Item label="Nome" name="nome" rules={[{ required: true }]}>
                <Input placeholder="Nome" ref={focusRef} />
              </Form.Item>
            </Col>
            <Col span={8} offset={1}>
              <Form.Item label="CPF" name="cpf">
                <Input placeholder="CPF" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item label="Banco" name="banco">
                <Input placeholder="Banco" />
              </Form.Item>
            </Col>
            <Col span={4} offset={1}>
              <Form.Item label="Agência" name="agencia">
                <Input type="number" placeholder="Agência" />
              </Form.Item>
            </Col>
            <Col span={4} offset={1}>
              <Form.Item label="Conta" name="conta">
                <Input placeholder="Conta" />
              </Form.Item>
            </Col>
            <Col span={3} offset={1}>
              <Form.Item label="Operação" name="operacao">
                <Input placeholder="Op." />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="PIX" name="pix">
                <Input placeholder="CPF, e-mail, telefone ou chave " />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Space size="middle">
            <Button type="primary" htmlType="submit">
              Salvar
            </Button>
            <Link to="/autonomos">Voltar</Link>
          </Space>
        </Form>
      </Col>
    </Row>
  );
};
