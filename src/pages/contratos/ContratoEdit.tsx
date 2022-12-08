import {
  Button,
  Col,
  DatePicker,
  DatePickerProps,
  Divider,
  Form, message,
  Row,
  Space
} from 'antd';
import { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createContrato, getContratoById, updateContrato } from '../../api/contratos.api';
import { CdsLayout } from '../../components/CdsLayout';
import { CONTRATO_DEFAULT_VALUE, UnsavedContrato } from '../../models/contrato';

export const ContratoEdit = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm<UnsavedContrato>();
  const { id } = useParams();
  const [contrato, setContrato] = useState<UnsavedContrato>(CONTRATO_DEFAULT_VALUE);
  const title = `${id === 'new' ? 'Editar' : 'Criar novo'} contrato`;
  const backUrl = '/contratos';

  useEffect(() => {
    getContratoById(id)
      .then(res => setContrato(res))
      .catch(err => message.error(`Erro ao obter contrato: ${err}`));
  }, []);

  useEffect(() => {
    form.setFieldsValue({ ...contrato });
  }, [contrato]);

  // const handleVigenciaChange = (vigenciaInicio: Dayjs | null, vigenciaFim: Dayjs | null) => {
  //   if (vigenciaInicio && vigenciaFim)
  //     setContrato(contrato => ({ ...contrato, vigenciaInicio, vigenciaFim }));
  // };
  const handleVigenciaChange = (datas: [unknown, unknown] | null) => {
    console.log('datas:', datas);
    if (datas) {
      const [vigenciaInicio, vigenciaFim] = datas as [Dayjs, Dayjs];
      setContrato(contrato => ({ ...contrato, vigenciaInicio, vigenciaFim }));
    }
  };

  const onFinish = async (values: UnsavedContrato) => {
    try {
      if (id === 'new') {
        await createContrato(values);
        message.info('Contrato criado com sucesso');
      } else {
        await updateContrato(id, values);
        message.info('Contrato atualizado com sucesso');
      }
      navigate(backUrl);
    } catch (error: unknown) {
      message.error(`Erro ao salvar contrato: ${error}`);
    }
  };

  const rangePickerFormat: DatePickerProps['format'] = value =>
    value.format('DD/MM/YYYY');

  return (
    <CdsLayout title={title} backUrl={backUrl}>
      <Row>
        <Col span={8}>
          <Form
            form={form}
            name="editContratoForm"
            layout="vertical"
            initialValues={contrato}
            validateMessages={{ required: '${label} é obrigatório' }}
            onFinish={onFinish}
            autoComplete="off"
          >
            {/* <Form.Item label="Vigência:" name="vigenciaInicio" rules={[{ required: true }]}>
              <Input ref={focusRef} />
            </Form.Item> */}
            <Form.Item label="Vigência" rules={[{ required: true }]}>
              <DatePicker.RangePicker onChange={handleVigenciaChange} format={rangePickerFormat} />
            </Form.Item>

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
