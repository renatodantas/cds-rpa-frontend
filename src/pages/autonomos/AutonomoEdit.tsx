import {
  Button,
  Col,
  Divider,
  Form,
  Input, message,
  Row,
  Space
} from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  createAutonomo,
  findAutonomoById,
  updateAutonomo
} from '../../api/autonomos.api';
import { CdsLayout } from '../../components/CdsLayout';
import { Autonomo, AUTONOMO_DEFAULT_VALUE } from '../../models/autonomo';

export const AutonomoEdit = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm<Autonomo>();
  const { id } = useParams();
  const [autonomo, setAutonomo] = useState<Autonomo>(AUTONOMO_DEFAULT_VALUE);
  const title = `${id === 'new' ? 'Editar' : 'Criar novo'} autônomo`;
  const backUrl = '/autonomos';

  useEffect(() => {
    findAutonomoById(id).then((res) => setAutonomo(res));
  }, []);

  useEffect(() => {
    form.setFieldsValue({ ...autonomo });
  }, [autonomo]);

  const onFinish = async (values: Autonomo) => {
    try {
      if (id === 'new') {
        await createAutonomo(values);
        message.info('Cargo criado com sucesso');
      } else {
        await updateAutonomo(id, values);
        message.info('Autônomo atualizado com sucesso');
      }
      navigate(backUrl);
    } catch (error: unknown) {
      message.error(`Erro ao salvar autônomo: ${error}`);
    }
  };

  return (
    <CdsLayout title={title} backUrl={backUrl}>
      <Row>
        <Col span={16}>
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
                  <Input placeholder="Nome" autoFocus />
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
              <Link to={backUrl}>Voltar</Link>
            </Space>
          </Form>
        </Col>
      </Row>
    </CdsLayout>
  );
};
