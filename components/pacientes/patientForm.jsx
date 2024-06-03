/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Input, Row, Select, Upload, Checkbox, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import useTranslation from 'next-translate/useTranslation';

const { TextArea } = Input;

const FormPaciente = ({ paciente }) => {
    const [formState, setFormState] = useState({
        id: 'Nueva Ficha',
        fechaApertura: '',
        proyecto: '',
        imagen: null,
        nombresApellidos: '',
        ciudad: '',
        fechaNacimiento: '',
        edad: '',
        cedula: '',
        domicilio: '',
        telefono: '',
        institucionEducativa: '',
        tipoInstitucion: 1, // Replace with default value of
        jornada: 1, // Replace with default value of 
        anioEducacion: '',
        direccionInstitucion: '',
        paralelo: '',
        tieneDiscapacidad: 'no', // Replace with default value of 
        portadorCarnet: false, // Replace with default value of 
        motivoConsulta: '',
        observaciones: '',
        perteneceInclusion: '',
        celular: '',
        diagnostico: ''
    });
    useEffect(() => {
        if (paciente) {
            console.log(paciente);
            setFormState({
                ...formState,
                ...paciente,
                tipoInstitucion: paciente.tipoInstitucion?.toString() || '1',
                jornada: paciente.jornada?.toString() || '1',
                tieneDiscapacidad: paciente.tieneDiscapacidad?.toString() || 'no'
            });
        }
    }, []);

    const { t } = useTranslation('home');
    const lang = t;

    const handleChange = (event) => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value
        });
    };

    const handleChangeCheck = (event) => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.checked
        });
    };

    const handleFileChange = (info) => {
        const file = info.fileList[0]?.originFileObj;
        if (!file) {
            setFormState({
                ...formState,
                imagen: null,
            });
            return;
        }
        if (!beforeUpload(info.file))
            return;
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64Data = reader.result.split(",")[1];
            setFormState({
                ...formState,
                imagen: base64Data,
            });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        if (paciente) {
            // Update
            await axios.put(process.env['BASE_URL'] + 'api/pacientes/actualizar/' + formState.id, formState)
                .then(() => {
                    window.location.href = '/pacientes';
                }).catch((error) => {
                    console.log(error);
                });
        } else {
            // Create
            const request = { ...formState, pacienteEstado: 1 };
            delete request.id;
            await axios.post(process.env['BASE_URL'] + 'api/pacientes/insertar', request)
                .then((response) => {
                    console.log(response);
                    window.location.href = '/pacientes';
                }).catch((error) => {
                    console.log(error);
                });
        }
    };
    const beforeUpload = (file) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            console.log('You can only upload image files!');
            message.error('You can only upload image files!');
        }
        return isImage
    };

    return (
        <Card className='p-3'>
            <Card title={lang('informacionDelPaciente_title') + ": " + formState.id}>
                <Form layout="vertical" onFinish={handleSubmit}>
                    <Card className='my-3' title={lang('informacionDelPaciente_personal')}>
                        <Row gutter={16}>
                            <Col>
                                <img
                                    src={formState.imagen ? `data:image/jpeg;base64, ${formState.imagen}` : 'https://as1.ftcdn.net/v2/jpg/01/28/56/34/1000_F_128563441_kn96kL8fUOtfZlBRBV4kATepeGXuiLzI.jpg'}
                                    style={{ objectFit: 'cover', borderRadius: '15px', border: '3px solid #0044ff' }}
                                    alt="avatar"
                                    width="160"
                                    height="200"
                                />
                            </Col>
                            <Col span={18}>
                                <Form.Item label={lang('informacionDelPaciente_fechaApertura')}>
                                    <Input type="date" name="fechaApertura" value={formState.fechaApertura} onChange={handleChange} />
                                </Form.Item>
                                <Form.Item label={lang('informacionDelPaciente_proyecto')}>
                                    <Input type="text" name="proyecto" value={formState.proyecto} onChange={handleChange} />
                                </Form.Item>
                                <Form.Item label={lang('informacionDelPaciente_subirImagen')}>
                                    <Upload
                                        accept='image/*'
                                        beforeUpload={() => false}
                                        onChange={handleFileChange}
                                        maxCount={1}
                                    >
                                        <Button icon={<UploadOutlined />}>{lang('informacionDelPaciente_subirImagen')}</Button>
                                    </Upload>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                    <Card className='my-3' title={lang('informacionDelPaciente_datosPersonales')}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label={lang('informacionDelPaciente_nombre')}>
                                    <Input type="text" name="nombresApellidos" value={formState.nombresApellidos} onChange={handleChange} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={lang('informacionDelPaciente_cedula')}>
                                    <Input type="text" name="cedula" value={formState.cedula} onChange={handleChange} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={lang('informacionDelPaciente_fechaNacimiento')}>
                                    <Input type="date" name="fechaNacimiento" value={formState.fechaNacimiento} onChange={handleChange} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={lang('informacionDelPaciente_edad')}>
                                    <Input type="text" name="edad" value={formState.edad} onChange={handleChange} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={lang('informacionDelPaciente_domicilio')}>
                                    <Input type="text" name="domicilio" value={formState.domicilio} onChange={handleChange} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={lang('informacionDelPaciente_ciudad')}>
                                    <Input type="text" name="ciudad" value={formState.ciudad} onChange={handleChange} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={lang('informacionDelPaciente_telefono')}>
                                    <Input type="text" name="telefono" value={formState.telefono} onChange={handleChange} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={lang('informacionDelPaciente_celular')}>
                                    <Input type="text" name="celular" value={formState.celular} onChange={handleChange} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                    <Card className='my-3' title={lang('informacionDelPaciente_discapacidad')}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label={lang('informacionDelPaciente_presentaDiscapacidad')}>
                                    <Select name="tieneDiscapacidad" value={formState.tieneDiscapacidad} onChange={(value) => setFormState({ ...formState, tieneDiscapacidad: value })}>
                                        <Select.Option value="si">Sí</Select.Option>
                                        <Select.Option value="no">No</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={lang('informacionDelPaciente_diagnostico')}>
                                    <Input type="text" name="diagnostico" value={formState.diagnostico} onChange={handleChange} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item>
                                    <Checkbox name="portadorCarnet" checked={formState.portadorCarnet} onChange={handleChangeCheck}>
                                        {lang('informacionDelPaciente_portadorCarnet')}
                                    </Checkbox>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                    <Card className='my-3' title={lang('informacionDelPaciente_title_educativa')}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label={lang('informacionDelPaciente_institucionEducativa')}>
                                    <Input type="text" name="institucionEducativa" value={formState.institucionEducativa} onChange={handleChange} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={lang('informacionDelPaciente_direccionInstitucion')}>
                                    <Input type="text" name="direccionInstitucion" value={formState.direccionInstitucion} onChange={handleChange} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={lang('informacionDelPaciente_jornada')}>
                                    <Select name="jornada" value={formState.jornada} onChange={(value) => setFormState({ ...formState, jornada: value })}>
                                        <Select.Option value={'1'}>Matutina</Select.Option>
                                        <Select.Option value={'2'}>Despertina</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={lang('informacionDelPaciente_tipoInstitucion')}>
                                    <Select name="tipoInstitucion" value={formState.tipoInstitucion} onChange={(value) => setFormState({ ...formState, tipoInstitucion: value })}>
                                        <Select.Option value={'1'}>Fiscal</Select.Option>
                                        <Select.Option value={'2'}>Fiscomisional</Select.Option>
                                        <Select.Option value={'3'}>Particular</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={lang('informacionDelPaciente_perteneceInclusion')}>
                                    <Input type="text" name="perteneceInclusion" value={formState.perteneceInclusion} onChange={handleChange} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={lang('informacionDelPaciente_anioEducacion')}>
                                    <Input type="text" name="anioEducacion" value={formState.anioEducacion} onChange={handleChange} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={lang('informacionDelPaciente_paralelo')}>
                                    <Input type="text" name="paralelo" value={formState.paralelo} onChange={handleChange} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                    <Card className='my-3' title={lang('informacionDelPaciente_title_adicional')}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label={lang('informacionDelPaciente_motivoConsulta')}>
                                    <TextArea rows={3} name="motivoConsulta" value={formState.motivoConsulta} onChange={handleChange} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={lang('informacionDelPaciente_observaciones')}>
                                    <TextArea rows={3} name="observaciones" value={formState.observaciones} onChange={handleChange} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                    <Button type="primary" htmlType="submit">
                        {paciente ? lang('editar') : lang('guardar')}
                    </Button>
                </Form>
            </Card>
        </Card>
    );
}

export default FormPaciente;
