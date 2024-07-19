import React from 'react';
import { Row, Col, Typography, List, Image, Card } from 'antd';
import useTranslation from 'next-translate/useTranslation';

const { Title, Paragraph } = Typography;

const Dashboard = () => {
  const { t } = useTranslation('home');

  return (
    <div className="wpb-content-wrapper">
      <Row style={{ padding: '32px 0' }}>
        <Col xs={24}>
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

      <Row style={{ padding: '32px 0' }} gutter={16}>
        <Col xs={24} md={12}>
          <Card>
            <Title level={2} style={{ fontSize: '25px' }}>{t('objetivos_title')}</Title>
            <List
              size="small"
              dataSource={t('dataObjetivos', {}, { returnObjects: true })}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <iframe
              title="UDIPSAI"
              src="https://www.youtube.com/embed/hm02rL1iULk?feature=oembed"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              id="fitvid0"
              style={{ width: '500px', height: '300px' }}
            ></iframe>
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

      <Row style={{ padding: '52px 0' }} gutter={16}>
        <Col xs={24} md={12}>
          <Card>
            <Image
              src="https://www.ucacue.edu.ec/wp-content/uploads/2019/03/UCACUE-UDIPSAI-beneficiarios.jpg"
              alt="Beneficiarios"
              style={{ maxWidth: '100%', margin: '0 auto', display: 'block' }}
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card>
            <Title level={4} style={{ fontSize: '19px' }}><strong>{t('beneficiarios_title')}</strong></Title>
            <Paragraph style={{ fontSize: '16px' }}><strong>{t('beneficiarios_directos_title')}:</strong> {t('beneficiarios_directos_text')}</Paragraph>
            <Paragraph style={{ fontSize: '16px' }}><strong>{t('beneficiarios_indirectos_title')}:</strong></Paragraph>
            <List
              size="small"
              dataSource={t('dataBeneficiariosIndirectos', {}, { returnObjects: true })}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
