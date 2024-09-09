import React from 'react';
import { Row, Col, Typography, List, Image as AntdImage, Card } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import logoUdipsai from '@/assets/LogoCompartidoUDIPSAI_Mesadetrabajo1.png'
import Image from 'next/image';
const { Title, Paragraph } = Typography;

const Dashboard = () => {
  const { t } = useTranslation('home');

  return (
    <div className="wpb-content-wrapper">
      <Row style={{ padding: '32px 0' }}>
        <Col xs={24} md={12}>
          <Image className="" src={logoUdipsai} alt="logo" style={{ width: "100%", height: 'auto' }} />
        </Col>
        <Col xs={24} md={12}>
          <Title level={1} style={{ fontSize: '36px' }}>
            {t('udipsai_title')}
          </Title>
        </Col>
      </Row>

      <Row style={{ padding: '82px 0' }} gutter={16}>
        <Col xs={24} md={12}>
          <Card>
            <Title level={2} style={{ fontSize: '25px' }}>{t('mision_title')}</Title>
            <Paragraph style={{ fontSize: '16px' }}>
              {t('mision_text')}
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card>
            <Title level={2} style={{ fontSize: '25px' }}>{t('vision_title')}</Title>
            <Paragraph style={{ fontSize: '16px' }}>
              {t('vision_text')}
            </Paragraph>
          </Card>
        </Col>
      </Row>
      <Row style={{ padding: '52px 0' }}>
        <Col xs={24}>
          <Card>
            <Title level={2} style={{ textAlign: 'center', fontSize: '25px' }}>{t('valores_title')}</Title>
            <List
              size="small"
              dataSource={t('dataValores', {}, { returnObjects: true })}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
      </Row>

      <Row style={{ padding: '52px 0' }} gutter={16}>
        <Col xs={24} md={12}>
          <Card>
            <Title level={2} style={{ textAlign: 'right', fontSize: '40px' }}>{t('areas_cuenca_title')}</Title>
            <List
              size="small"
              dataSource={t('dataAreasCuenca', {}, { returnObjects: true })}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card>
            <Title level={2} style={{ textAlign: 'right', fontSize: '40px' }}>{t('areas_azogues_title')}</Title>
            <List
              size="small"
              dataSource={t('dataAreasAzogues', {}, { returnObjects: true })}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
      </Row>


    </div>
  );
};

export default Dashboard;
