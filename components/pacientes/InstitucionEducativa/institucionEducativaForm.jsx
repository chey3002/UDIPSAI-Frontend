/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Input, Row, Select, message } from 'antd';
import axios from 'axios';
import useTranslation from 'next-translate/useTranslation';

const { TextArea } = Input;

const FormInstitucion = ({ institucion }) => {
    const [formState, setFormState] = useState({
        id: 'Nueva Institución',
        nombreInstitucion: '',
        direccion: '',
        tipoInstitucion: '1', // Fiscal por defecto
    });

    useEffect(() => {
        if (institucion) {
            console.log(institucion);
            setFormState({
                ...formState,
                ...institucion,
                jornada: institucion.jornada?.toString() || '1',
                tipoInstitucion: institucion.tipoInstitucion?.toString() || '1'
            });
        }
    }, [institucion]);

    const { t } = useTranslation('home');
    const lang = t;

    const handleChange = (event) => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value
        });
    };

    const handleSelectChange = (name, value) => {
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        if (institucion) {
            // Update
            await axios.put(process.env['BASE_URL'] + 'api/instituciones/actualizar/' + formState.id, formState)
                .then(() => {
                    window.location.href = '/pacientes/institucionesEducativas';
                }).catch((error) => {
                    console.log(error);
                });
        } else {
            // Create
            const request = {
                ...formState, institucionEstado: 1
            };
            delete request.id;

            await axios.post(process.env['BASE_URL'] + 'api/instituciones/insertar', request)
                .then((response) => {
                    console.log(response);
                    window.location.href = '/pacientes/institucionesEducativas';
                }).catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <Card className='p-3'>
            <Card title={lang('informacionDeInstitucion_title')}>
                <Form layout="vertical" onFinish={handleSubmit}>
                    <Card className='my-3' title={lang('informacionDeInstitucion_datosInstitucion')}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label={lang('informacionDeInstitucion_nombre')}>
                                    <Input type="text" name="nombreInstitucion" value={formState.nombreInstitucion} onChange={handleChange} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={lang('informacionDeInstitucion_direccion')}>
                                    <Input type="text" name="direccion" value={formState.direccion} onChange={handleChange} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={lang('informacionDeInstitucion_tipoInstitucion')}>
                                    <Select name="tipoInstitucion" value={formState.tipoInstitucion} onChange={(value) => handleSelectChange('tipoInstitucion', value)}>
                                        <Select.Option value="1">Fiscal</Select.Option>
                                        <Select.Option value="2">Fiscomisional</Select.Option>
                                        <Select.Option value="3">Particular</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                    <Button type="primary" htmlType="submit">
                        {institucion ? lang('editar') : lang('guardar')}
                    </Button>
                </Form>
            </Card>
        </Card>
    );
}

export default FormInstitucion;
