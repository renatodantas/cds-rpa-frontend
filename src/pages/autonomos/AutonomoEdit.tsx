import {
  Button,
  Col,
  Divider,
  Form,
  Input, message,
  Row,
  Space
} from 'antd';
import { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  AutonomosQueries,
  createAutonomo,
  findAutonomoById,
  updateAutonomo
} from '../../api/autonomos.api';
import { CdsLayout } from '../../components/CdsLayout';
import { Autonomo } from '../../models/autonomo';

const BACK_URL = '/autonomos';

export const AutonomoEdit = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form] = Form.useForm<Autonomo>();
  const { id } = useParams();
  const title = `${id === 'new' ? 'Editar' : 'Criar novo'} autônomo`;
  const { mutate: createItem } = createAutonomo();
  const { mutate: updateItem } = updateAutonomo(id);
  const { data, isLoading } = findAutonomoById(id);

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);

  const handleSubmit = (values: Autonomo) => {
    if (id === 'new') {
      return createItem(values, {
        onSuccess: onSuccess('Autônomo criado com sucesso'),
        onError: error => onError(`Erro ao criar autônomo: ${error}`)
      });
    }
    updateItem(values, {
      onSuccess: onSuccess('Autônomo atualizado com sucesso'),
      onError: error => onError(`Erro ao atualizar autônomo: ${error}`)
    });
  };
  const onSuccess = (infoMessage: string) => () => {
    message.info(infoMessage);
    queryClient.invalidateQueries(AutonomosQueries.LIST);
    navigate(BACK_URL);
  };
  const onError = (errorMessage: string) => {
    message.error(errorMessage);
  };

  return (
    <CdsLayout title={title} backUrl={BACK_URL}>
      <Row>
        <Col span={16}>
          <Form
            autoComplete="off"
            disabled={isLoading}
            form={form}
            layout="vertical"
            name="editAutonomoForm"
            onFinish={handleSubmit}
          >
            <Row>
              <Col span={15}>
                <Form.Item label="Nome" name="nome" rules={[{ required: true }]}>
                  <Input placeholder="Nome" autoFocus />
                </Form.Item>
              </Col>
              <Col span={8} offset={1}>
                <Form.Item label="CPF" name="cpf" rules={[{ required: true, len: 11 }]}>
                  <Input placeholder="CPF" maxLength={11} />
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
              <Link to={BACK_URL}>Voltar</Link>
            </Space>
          </Form>
        </Col>
      </Row>
    </CdsLayout>
  );
};
