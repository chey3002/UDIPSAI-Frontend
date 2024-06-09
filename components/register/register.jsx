'use client'
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Alert, Checkbox, Row, Col, Card, Upload, Image, message, Select } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import Link from "next/link";
import useTranslation from 'next-translate/useTranslation';
import Logo from "@/assets/ucacue-logo.png";
import axios from 'axios';

const { Option } = Select;

const Register = ({ especialista }) => {
    const [formData, setFormData] = useState({
        cedula: "",
        primerNombre: "",
        segundoNombre: "",
        primerApellido: "",
        segundoApellido: "",
        id_especialidad: "",
        esPasante: false,
        contrasena: "",
        contrasenaConfirm: "",
        imagen: null,
        inicioPasantia: null,
        finPasantia: null,
        cedulaEspecialistaAsignado: ""
    });

    const [form] = Form.useForm();
    const { t } = useTranslation('home');
    const lang = t;
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [especialistas, setEspecialistas] = useState([]);

    useEffect(() => {
        const fetchEspecialistas = async () => {
            try {
                const response = await axios.get(`${process.env['BASE_URL']}api/especialistas/activos/nopasantes`);
                setEspecialistas(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching especialistas:', error);
            }
        };

        fetchEspecialistas();
    }, []);

    useEffect(() => {
        console.log(especialista);
        if (especialista) {
            form.setFieldsValue({
                cedula: especialista.cedula,
                primerNombre: especialista.primerNombre,
                segundoNombre: especialista.segundoNombre,
                primerApellido: especialista.primerApellido,
                segundoApellido: especialista.segundoApellido,
                id_especialidad: especialista.especialidad ? { value: especialista.especialidad?.id, label: especialista.especialidad?.area } : null,
                esPasante: especialista.esPasante,
                inicioPasantia: especialista.inicioPasantia,
                finPasantia: especialista.finPasantia,
                cedulaEspecialistaAsignado: especialista.especialistaAsignado ? {
                    value: especialista.especialistaAsignado?.cedula, label: `${especialista.especialistaAsignado?.primerNombre} ${especialista.especialistaAsignado?.primerApellido}`
                } : null,
                imagen: especialista.imagen,
            });
            setFormData({
                cedula: especialista.cedula,
                primerNombre: especialista.primerNombre,
                segundoNombre: especialista.segundoNombre,
                primerApellido: especialista.primerApellido,
                segundoApellido: especialista.segundoApellido,
                id_especialidad: especialista.especialidad?.id,
                esPasante: especialista.esPasante,
                inicioPasantia: especialista.inicioPasantia,
                finPasantia: especialista.finPasantia,
                cedulaEspecialistaAsignado: especialista.especialistaAsignado?.cedula,
                imagen: especialista.imagen,
            });
        }
    }, [especialista]);

    const handleSubmit = async () => {
        setLoading(true);
        await delay(500);
        const values = { ...formData };
        if (!values.esPasante) {
            values.inicioPasantia = null;
            values.finPasantia = null;
            values.cedulaEspecialistaAsignado = "";
        }
        if (especialista) {
            // Update
            await axios.put(process.env['BASE_URL'] + 'api/especialistas/actualizar/' + values.cedula, values)
                .then(() => {
                    window.location.href = '/registro';
                }).catch((error) => {
                    console.log(error);
                });
        } else {
            // Create
            const request = { ...values, especialistaEstado: 1 };
            await axios.post(process.env['BASE_URL'] + 'api/especialistas/insertar', request)
                .then((response) => {
                    console.log(response);
                    window.location.href = '/registro';
                }).catch((error) => {
                    console.log(error);
                });
        }
        setLoading(false);
    };

    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const handleFileChange = (info) => {
        const file = info.fileList[0]?.originFileObj;
        if (!file) {
            form.setFieldsValue({
                imagen: null,
            });
            setFormData({
                ...formData,
                imagen: null,
            });
            return;
        }
        if (!beforeUpload(file)) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64Data = reader.result.split(",")[1];
            form.setFieldsValue({
                imagen: base64Data,
            });
            setFormData({
                ...formData,
                imagen: base64Data,
            });
        };
        reader.readAsDataURL(file);
    };

    const beforeUpload = (file) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            message.error('You can only upload image files!');
        }
        return isImage;
    };

    const onChange = () => {
        console.log(form.getFieldValue());
        setFormData({
            cedula: form.getFieldsValue().cedula,
            primerNombre: form.getFieldsValue().primerNombre,
            segundoNombre: form.getFieldValue().segundoNombre,
            primerApellido: form.getFieldValue().primerApellido,
            segundoApellido: form.getFieldValue().segundoApellido,
            id_especialidad: form.getFieldValue().id_especialidad ? form.getFieldValue().id_especialidad?.value : null,
            esPasante: form.getFieldValue().esPasante,
            inicioPasantia: form.getFieldValue().inicioPasantia,
            finPasantia: form.getFieldValue().finPasantia,
            cedulaEspecialistaAsignado: form.getFieldValue().cedulaEspecialistaAsignado ? form.getFieldValue().cedulaEspecialistaAsignado?.value : null,
            contrasena: form.getFieldValue().contrasena,
            contrasenaConfirm: form.getFieldValue().contrasenaConfirm,
        });
    };

    return (
        <Card style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={formData}
                onChange={onChange}
            >
                <Image src={Logo.src} alt="logo" width={100} height={100} preview={false} style={{ display: 'block', margin: '0 auto 16px' }} />
                <div className="h4 mb-2 text-center">{lang('register_title')}</div>
                {show && (
                    <Alert
                        message={lang('register_error')}
                        type="error"
                        closable
                        onClose={() => setShow(false)}
                        style={{ marginBottom: '16px' }}
                    />
                )}
                <Col style={{ marginTop: '16px', textAlign: 'center' }}>
                    <img
                        src={formData.imagen ? `data:image/jpeg;base64,${formData.imagen}` : 'https://as1.ftcdn.net/v2/jpg/01/28/56/34/1000_F_128563441_kn96kL8fUOtfZlBRBV4kATepeGXuiLzI.jpg'}
                        alt="avatar"
                        style={{ objectFit: 'cover', borderRadius: '15px', border: '3px solid #00ff00' }}
                        width="160"
                        height="200"
                    />
                </Col>
                <Form.Item label={lang('register_imagen')}>
                    <Upload
                        accept='image/*'
                        beforeUpload={() => false}
                        onChange={handleFileChange}
                        maxCount={1}
                        showUploadList={false}
                    >
                        <Button icon={<UploadOutlined />}>{lang('register_subirImagen')}</Button>
                    </Upload>
                </Form.Item>
                <Form.Item
                    label={lang('register_cedula')}
                    name="cedula"
                    rules={[{ required: true, message: lang('register_cedula') }]}
                >
                    <Input />
                </Form.Item>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label={lang('register_primerNombre')}
                            name="primerNombre"
                            rules={[{ required: true, message: lang('register_primerNombre') }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label={lang('register_segundoNombre')}
                            name="segundoNombre"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label={lang('register_primerApellido')}
                            name="primerApellido"
                            rules={[{ required: true, message: lang('register_primerApellido') }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label={lang('register_segundoApellido')}
                            name="segundoApellido"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label={lang('register_id_especialidad')}
                            name="id_especialidad"
                            rules={[{ required: true, message: lang('register_id_especialidad') }]}
                        >
                            <Select
                                showSearch
                                placeholder={lang('register_selectEspecialidad')}
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                options={[
                                    { value: '1', label: 'Coordinación' },
                                    { value: '2', label: 'Secretaría' },
                                    { value: '3', label: 'Psicología Educativa' },
                                    { value: '4', label: 'Psicología Clínica' },
                                    { value: '5', label: 'Terapia de Lenguaje y Fonoaudiología' },
                                    { value: '6', label: 'Estimulación Temprana' },
                                    { value: '7', label: 'Recuperación Pedagógica' },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="esPasante" valuePropName="checked">
                            <Checkbox>
                                {lang('register_esPasante')}
                            </Checkbox>
                        </Form.Item>
                    </Col>
                </Row>
                {formData.esPasante && (
                    <>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label={lang('register_inicioPasantia')}
                                    name="inicioPasantia"
                                    rules={[{ required: formData.esPasante, message: lang('register_inicioPasantia') }]}
                                >
                                    <Input type="date" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label={lang('register_finPasantia')}
                                    name="finPasantia"
                                    rules={[{ required: formData.esPasante, message: lang('register_finPasantia') }]}
                                >
                                    <Input type="date" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item
                            label={lang('register_cedulaEspecialistaAsignado')}
                            name="cedulaEspecialistaAsignado"
                            rules={[{
                                required: formData.esPasante, message: lang('register_cedulaEspecialistaAsignado')
                            }]}
                        >
                            <Select
                                showSearch
                                placeholder={lang('register_selectEspecialista')}
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                onChange={onChange}
                                options={especialistas.map(especialista => ({
                                    value: especialista.cedula,
                                    label: `${especialista.primerNombre} ${especialista.primerApellido}`
                                }))}
                            />
                        </Form.Item>
                    </>
                )}
                <Form.Item
                    label={lang('register_password')}
                    name="contrasena"
                    rules={[{ required: true, message: lang('register_password') }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label={lang('register_passwordConfirm')}
                    name="contrasenaConfirm"
                    dependencies={['contrasena']}
                    rules={[
                        { required: true, message: lang('register_passwordConfirm') },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('contrasena') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Las contraseñas no coinciden'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                        {loading ? lang('register_button_loading') : lang('register_button')}
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default Register;
