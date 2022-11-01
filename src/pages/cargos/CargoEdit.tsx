import { Button, Col, Divider, Form, Input, message, Row, Space } from 'antd';
import { AxiosError } from 'axios';
import { Link, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { saveNewCargo, updateCargo } from '../../api/cargos.api';
import { Cargo } from '../../models/cargo';

export const CargoEdit = () => {
  const cargoSelecionado = useLoaderData() as Cargo;
  const navigate = useNavigate();
  const { id } = useParams();

  const onFinish = async (values: Cargo) => {
    try {
      if (id === 'new') {
        await saveNewCargo(values);
        message.info('Cargo salvo com sucesso');
      } else {
        await updateCargo(values);
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
        <h1>Editar Cargo</h1>

        <Form
          name="editCargoForm"
          layout="vertical"
          initialValues={cargoSelecionado}
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
