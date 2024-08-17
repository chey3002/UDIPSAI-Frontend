/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Input, Row, Select, Upload, Checkbox, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import useTranslation from 'next-translate/useTranslation';
import { institucionesListar, pacientesActualizar, pacientesCrear, sedesListar } from '@/utils/apiRequests';

const { TextArea } = Input;

const FormPaciente = ({ paciente }) => {
    const [formState, setFormState] = useState({
        id: 'Nueva Ficha',
        "fechaApertura": "",
        "pacienteEstado": 1,
        "nombresApellidos": "",
        "ciudad": "",
        "fechaNacimiento": "",
        "edad": "",
        "cedula": "",
        "domicilio": "",
        "imagen": null,
        "telefono": "",
        "celular": "",
        "institucionEducativa": 1,
        "proyecto": "",
        "jornada": 1,
        "anioEducacion": "",
        "paralelo": "",
        "perteneceInclusion": "",
        "tieneDiscapacidad": "",
        "portadorCarnet": false,
        "diagnostico": "",
        "motivoConsulta": "",
        "observaciones": "",
        "tipoDiscapacidad": "",
        "detalleDiscapacidad": "",
        "porcentajeDiscapacidad": 0,
        "perteneceAProyecto": false,
        "sede": 1
    });
    const [sedes, setSedes] = useState([]);
    const [initialValues, setInitialValues] = useState({});
    useEffect(() => {
        if (paciente) {
            console.log(paciente);
            setInitialValues({
                ...formState,
                ...paciente,
                id: paciente.id,
                sede: paciente.sede?.id || null,
                tipoInstitucion: paciente.tipoInstitucion?.toString() || 1,
                jornada: paciente.jornada?.id || 1,
                tieneDiscapacidad: paciente.tieneDiscapacidad?.toString() || 'no',
                institucionEducativa: paciente.institucionEducativa ? { value: paciente.institucionEducativa.id, label: paciente.institucionEducativa.nombreInstitucion } : null,
            });
            setFormState({
                ...formState,
                ...paciente,
                id: paciente.id,
                sede: paciente.sede?.id || null,
                tipoInstitucion: paciente.tipoInstitucion?.toString() || 1,
                jornada: paciente.jornada?.id || 1,
                tieneDiscapacidad: paciente.tieneDiscapacidad?.toString() || 'no',
                institucionEducativa: paciente.institucionEducativa ? paciente.institucionEducativa.id : 1,

            });
        }
    }, []);
    const [institucionesEducativas, setInstitucionesEducativas] = useState([]);

    useEffect(() => {
        const fetchSedes = async () => {
            const { data: sedesData } = await sedesListar(message);
            console.log(sedesData);
            setSedes(sedesData);
        }
        fetchSedes();
        const fetchInstituciones = async () => {
            const response = await institucionesListar(message);
            setInstitucionesEducativas(response.data);
            console.log(response.data);
        };
        fetchInstituciones();
    }, []);

    const { t } = useTranslation('home');
    const lang = t;

    const handleChange = (event) => {
        console.log(event);
        console.log(formState);
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
            const request = { ...formState, pacienteEstado: 1, porcentajeDiscapacidad: parseInt(formState.porcentajeDiscapacidad) };
            delete request.id

            await pacientesActualizar(formState.id, request, message);
        } else {
            // Create
            const request = { ...formState, pacienteEstado: 1 };
            delete request.id;
            await pacientesCrear(request, message);
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
                <Form layout="vertical" onFinish={handleSubmit} >
                    <Card className='my-3' title={lang('informacionDelPaciente_personal')}>
                        <Row gutter={16}>
                            <Col>
                                <img
                                    src={formState.imagen ? `data:image/jpeg;base64, ${formState.imagen}` : 'https://www.shareicon.net/data/128x128/2016/06/25/786525_people_512x512.png'}
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
                                <Form.Item>
                                    <Checkbox name="perteneceAProyecto" checked={formState.perteneceAProyecto} onChange={handleChangeCheck}>
                                        {lang('informacionDelPaciente_perteneceAProyecto')}
                                    </Checkbox>
                                </Form.Item>
                                {formState.perteneceAProyecto ? <>
                                    <Form.Item label={lang('informacionDelPaciente_proyecto')}>
                                        <Input type="text" name="proyecto" value={formState.proyecto} onChange={handleChange} />
                                    </Form.Item></> : <></>}
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
                                <Form.Item label={lang('informacionDelPaciente_sede')}>
                                    <Select name="sede" value={formState.sede} onChange={(value) => setFormState({ ...formState, sede: value })} style={{ width: '200px' }}>
                                        {sedes.map((sedemap) => (
                                            <Select.Option key={sedemap.id} value={sedemap.id}>{sedemap.nombre}</Select.Option>
                                        ))}
                                    </Select>
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
                            {formState.tieneDiscapacidad === 'si' ? <>
                                <Col span={12}>
                                    <Form.Item>
                                        <Checkbox name="portadorCarnet" checked={formState.portadorCarnet} onChange={handleChangeCheck}>
                                            {lang('informacionDelPaciente_portadorCarnet')}
                                        </Checkbox>
                                    </Form.Item>
                                </Col>
                                {formState.portadorCarnet ? <>
                                    <Col span={12}>
                                        <Form.Item label={lang('informacionDelPaciente_tipoDiscapacidad')}>
                                            <Select name="tipoDiscapacidad" value={formState.tipoDiscapacidad} onChange={(value) => setFormState({ ...formState, tipoDiscapacidad: value })}>
                                                <Select.Option value="Intelectual">Intelectual</Select.Option>
                                                <Select.Option value="Física">Física</Select.Option>
                                                <Select.Option value="Auditiva">Auditiva</Select.Option>
                                                <Select.Option value="Visual">Visual</Select.Option>
                                                <Select.Option value="Psicosocial">Psicosocial</Select.Option>
                                                <Select.Option value="Lenguaje">Lenguaje</Select.Option>
                                                <Select.Option value="Múltiple">Múltiple</Select.Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>

                                    <Col span={12}>
                                        <Form.Item label={lang('informacionDelPaciente_detalleDiscapacidad')}>
                                            <Input type="text" name="detalleDiscapacidad" value={formState.detalleDiscapacidad} onChange={handleChange} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={lang('informacionDelPaciente_porcentajeDiscapacidad')}>
                                            <Input type="number" name="porcentajeDiscapacidad" value={`${formState.porcentajeDiscapacidad}`} onChange={handleChange} />
                                        </Form.Item>
                                    </Col> </> : <Col span={12}></Col>}
                            </> : <></>}


                        </Row>
                    </Card>
                    <Card className='my-3' title={lang('informacionDelPaciente_title_educativa')}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label={lang('informacionDelPaciente_institucionEducativa')}

                                >
                                    <Select
                                        showSearch
                                        name="institucionEducativa"

                                        placeholder={lang('informacionDelPaciente_institucionEducativa')}
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        onChange={(value) => setFormState({ ...formState, institucionEducativa: value })}
                                        value={formState.institucionEducativa}

                                    >
                                        {institucionesEducativas.map(institucion => (
                                            <Select.Option key={institucion.id} value={institucion.id}>
                                                {institucion.nombreInstitucion}
                                            </Select.Option>
                                        ))}

                                    </Select>
                                </Form.Item>
                            </Col>
                            {formState.institucionEducativa ? <Col span={12}>
                                <p><b>{lang('informacionDelPaciente_direccionInstitucion')}:</b> {institucionesEducativas.find(institucion => institucion.id === formState.institucionEducativa)?.direccion}</p>
                                <p><b>{lang('informacionDelPaciente_tipoInstitucion')}:</b> {institucionesEducativas.find(institucion => institucion.id == formState.institucionEducativa)?.tipoInstitucion == 1 ? 'Fiscal' : institucionesEducativas.find(institucion => institucion.id == formState.institucionEducativa)?.tipoInstitucion == 2 ? 'Fiscomisional' : institucionesEducativas.find(institucion => institucion.id == formState.institucionEducativa)?.tipoInstitucion == 3 ? 'Particular' : 'Otro'}</p>

                            </Col> : <Col span={12}></Col>}
                            <Col span={12}>
                                <Form.Item label={lang('informacionDelPaciente_jornada')}>
                                    <Select name="jornada" value={formState.jornada} onChange={(value) => setFormState({ ...formState, jornada: value })}>
                                        <Select.Option value={1}>Matutina</Select.Option>
                                        <Select.Option value={2}>Despertina</Select.Option>
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
