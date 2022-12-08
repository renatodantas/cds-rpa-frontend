import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { CdsHeader } from './CdsHeader';

interface CdsLayoutProps extends PropsWithChildren {
  title: string;
  addUrl?: string;
  backUrl?: string;
}

export const CdsLayout = ({ title, addUrl, backUrl, children }: CdsLayoutProps) => (
  <>
    <CdsHeader>
      {backUrl && <BackButton url={backUrl} />}
      <Typography.Title level={4}>{title}</Typography.Title>
      {addUrl && <AddButton url={addUrl} />}
    </CdsHeader>
    {children}
  </>
);

const BackButton = ({ url }: { url: string; }) => (
  <Link to={url}>
    <Button type="text" size="small" icon={<ArrowLeftOutlined />} />
  </Link>
);

const AddButton = ({ url }: { url: string; }) => (
  <Link to={url}>
    <Button type="primary" size="small" icon={<PlusOutlined />} />
  </Link>
);

