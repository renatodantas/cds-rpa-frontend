import { DeleteOutlined } from '@ant-design/icons';
import {
  Button,
  Empty,
  message,
  Popconfirm,
  Space,
  Table,
  TableProps
} from 'antd';
import Column from 'antd/lib/table/Column';
import { SorterResult } from 'antd/lib/table/interface';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getContratos, removeContrato } from '../../api/contratos.api';
import { CdsLayout } from '../../components/CdsLayout';
import { Contrato } from '../../models/contrato';
import { DEFAULT_PAGE_PARAMS, PageParams } from '../../models/page-params';
import { DEFAULT_PAGINATION, Pagination } from '../../models/pagination';
import { maskCurrency } from '../../utils/masks';

export const Contratos = () => {
  const [contratos, setContratos] = useState<Pagination<Contrato>>(DEFAULT_PAGINATION);
  const [pageParams, setPageParams] = useState<PageParams<Contrato>>({
    ...DEFAULT_PAGE_PARAMS,
    sort: 'vigenciaInicio'
  });

  useEffect(() => {
    fetchContratos();
  }, [pageParams]);

  const fetchContratos = () => {
    getContratos(pageParams)
      .then(res =>
        setContratos({
          items: res.data || DEFAULT_PAGINATION.items,
          total: res.count || DEFAULT_PAGINATION.total
        })
      ).catch(err => message.error(`Erro ao obter contratos: ${err}`));
  };

  const handleChange: TableProps<Contrato>['onChange'] = (_, __, sorter) => {
    const { field, order } = sorter as SorterResult<Contrato>;
    const sort = field as keyof Contrato;
    const ascending = order === 'ascend';
    setPageParams({ ...pageParams, sort, ascending });
  };

  const handleRemoveContrato = async (id: number) => {
    await removeContrato(id);
    message.info('Contrato excluído com sucesso');
    fetchContratos();
  };

  return (
    <CdsLayout title='Contratos' addUrl='/contratos/new'>
      <Table<Contrato>
        rowKey="id"
        bordered
        dataSource={contratos.items}
        locale={{ emptyText: <Empty description="Nenhum contrato cadastrado" /> }}
        onChange={handleChange}
        sortDirections={['ascend', 'descend']}
        pagination={{
          position: ['bottomCenter'],
          current: pageParams.page,
          pageSize: pageParams.size
        }}
      >
        <Column<Contrato>
          sorter
          title="Vigência"
          dataIndex="vigenciaInicio"
          render={(_, item) => <Link to={`/contratos/${item.id}`}>{
            `${item.vigenciaInicio.toISOString()} a ${item.vigenciaFim.toISOString()}`
          }</Link>}
        />
        <Column<Contrato>
          sorter
          title="VT (R$)"
          dataIndex="valorVT"
          render={(_, item) => (
            <>
              {`${maskCurrency(item.valorVT) || '-'}`}
            </>
          )}
        />
        <Column<Contrato>
          sorter
          title="VR (R$)"
          dataIndex="valorVR"
          render={(_, item) => (
            <>
              {`${maskCurrency(item.valorVR) || '-'}`}
            </>
          )}
        />
        <Column<Contrato>
          sorter
          title="Diária (R$)"
          dataIndex="valorDiaria"
          render={(_, item) => (
            <>
              {`${maskCurrency(item.valorDiaria) || '-'}`}
            </>
          )}
        />
        <Column<Contrato>
          dataIndex="actions"
          className="table-actions-column"
          width="200px"
          align="center"
          render={(_, item) => {
            return (
              <Space direction="horizontal">
                <Popconfirm
                  placement="left"
                  title="Confirma a exclusão deste contrato?"
                  onConfirm={() => handleRemoveContrato(item.id)}
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
    </CdsLayout>
  );
};
