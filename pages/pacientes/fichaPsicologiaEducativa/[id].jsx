import MenuWrapper from '@/components/sidebar';
import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, DatePicker, Select, InputNumber, Radio, Divider, Upload, message, Checkbox, Row, Col, Image } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import BreadCrumbPacientes from '@/components/commons/breadCrumPaciente';
import dayjs from 'dayjs';
import { DownCircleOutlined, FilePdfOutlined } from '@ant-design/icons';
import { fichaPsicologiaEducativaActualizar, fichaPsicologiaEducativaById, psicologiaEducativaPDF } from '@/utils/apiRequests';
import { lang } from 'moment';
const { Option } = Select;
const { TextArea } = Input;

export default function EditarFichaPsicologiaEducativa({ ficha }) {
    const { t } = useTranslation('home');
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [fichaData, setFichaData] = useState(ficha);

    useEffect(() => {
        if (fichaData) {
            form.setFieldsValue({
                ...fichaData,
                'paciente.nombresApellidos': fichaData.paciente.nombresApellidos,
                'paciente.ciudad': fichaData.paciente.ciudad,
                'paciente.fechaNacimiento': dayjs(fichaData.paciente.fechaNacimiento, 'YYYY-MM-DD'),
                'paciente.edad': fichaData.paciente.edad,
                'paciente.tieneDiscapacidad': fichaData.paciente.tieneDiscapacidad === 'si',
                'paciente.tipoDiscapacidad': fichaData.paciente.tipoDiscapacidad,
                'paciente.porcentajeDiscapacidad': fichaData.paciente.porcentajeDiscapacidad,
                'paciente.portadorCarnet': fichaData.paciente.portadorCarnet,
                'paciente.institucionEducativa.nombreInstitucion': fichaData.paciente.institucionEducativa.nombreInstitucion,
                'paciente.anioEducacion': fichaData.paciente.anioEducacion,

                'motivoConsulta': fichaData.motivoConsulta,
                'asignaturasGustan': fichaData.asignaturasGustan,
                'asignaturasDisgustan': fichaData.asignaturasDisgustan,
                'relacionDocentes': fichaData.relacionDocentes ? fichaData.relacionDocentes : 'BUENA',
                'causaRelacionDocentes': fichaData.causaRelacionDocentes,
                'gustaIrInstitucion': fichaData.gustaIrInstitucion ? true : false,
                'causaGustaIrInstitucion': fichaData.causaGustaIrInstitucion,
                'relacionConGrupo': fichaData.relacionConGrupo ? fichaData.relacionConGrupo : 'BUENA',
                'causaRelacionConGrupo': fichaData.causaRelacionConGrupo,
                'inclusionEducativa': fichaData.inclusionEducativa ? true : false,
                'causaInclusionEducativa': fichaData.causaInclusionEducativa,
                'adaptacionesCurriculares': fichaData.adaptacionesCurriculares ? true : false,
                'gradoAdaptacion': fichaData.gradoAdaptacion,
                'especifiqueAsignaturas': fichaData.especifiqueAsignaturas,
                'cdi': fichaData.cdi ? true : false,
                'cdiEdad': fichaData.cdiEdad,
                'inicial1': fichaData.inicial1 ? true : false,
                'inicial1Edad': fichaData.inicial1Edad,
                'inicial2': fichaData.inicial2 ? true : false,
                'inicial2Edad': fichaData.inicial2Edad,
                'primerEGB': fichaData.primerEGB ? true : false,
                'edad1roEGB': fichaData.edad1roEGB,
                'perdidaAnio': fichaData.perdidaAnio ? true : false,
                'gradoCausaPerdidaAnio': fichaData.gradoCausaPerdidaAnio,
                'desercionEscolar': fichaData.desercionEscolar ? true : false,
                'gradoCausaDesercionEscolar': fichaData.gradoCausaDesercionEscolar,
                'cambioInstitucion': fichaData.cambioInstitucion ? true : false,
                'gradoCausaCambioInstitucion': fichaData.gradoCausaCambioInstitucion,
                'problemasAprendizaje': fichaData.problemasAprendizaje ? true : false,
                'problemasAprendizajeEspecificar': fichaData.problemasAprendizajeEspecificar,
                'evaluacionPsicologicaUOtrosAnterior': fichaData.evaluacionPsicologicaUOtrosAnterior ? true : false,
                'causaEvaluacionPsicologicaUOtrosAnterior': fichaData.causaEvaluacionPsicologicaUOtrosAnterior,
                'recibeApoyo': fichaData.recibeApoyo ? true : false,
                'causaLugarTiempoRecibeApoyo': fichaData.causaLugarTiempoRecibeApoyo,
                'aprovechamientoGeneral': fichaData.aprovechamientoGeneral ? fichaData.aprovechamientoGeneral : 'BUENO',
                'actividadEscolar': fichaData.actividadEscolar,
                'observaciones': fichaData.observaciones,
            });
        }
    }, [fichaData, form]);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const responseForm = form.getFieldsValue();
            console.log(responseForm);
            const response = {
                ...fichaData,
                'paciente': fichaData.paciente,
                'motivoConsulta': responseForm.motivoConsulta,
                'asignaturasGustan': responseForm.asignaturasGustan,
                'asignaturasDisgustan': responseForm.asignaturasDisgustan,
                'relacionDocentes': responseForm.relacionDocentes,
                'causaRelacionDocentes': responseForm.causaRelacionDocentes,
                'gustaIrInstitucion': responseForm.gustaIrInstitucion,
                'causaGustaIrInstitucion': responseForm.causaGustaIrInstitucion,
                'relacionConGrupo': responseForm.relacionConGrupo,
                'causaRelacionConGrupo': responseForm.causaRelacionConGrupo,
                'inclusionEducativa': responseForm.inclusionEducativa,
                'causaInclusionEducativa': responseForm.causaInclusionEducativa,
                'adaptacionesCurriculares': responseForm.adaptacionesCurriculares,
                'gradoAdaptacion': responseForm.gradoAdaptacion,
                'especifiqueAsignaturas': responseForm.especifiqueAsignaturas,
                'cdi': responseForm.cdi,
                'cdiEdad': responseForm.cdiEdad,
                'inicial1': responseForm.inicial1,
                'inicial1Edad': responseForm.inicial1Edad,
                'inicial2': responseForm.inicial2,
                'inicial2Edad': responseForm.inicial2Edad,
                'primerEGB': responseForm.primerEGB,
                'edad1roEGB': responseForm.edad1roEGB,
                'perdidaAnio': responseForm.perdidaAnio,
                'gradoCausaPerdidaAnio': responseForm.gradoCausaPerdidaAnio,
                'desercionEscolar': responseForm.desercionEscolar,
                'gradoCausaDesercionEscolar': responseForm.gradoCausaDesercionEscolar,
                'cambioInstitucion': responseForm.cambioInstitucion,
                'gradoCausaCambioInstitucion': responseForm.gradoCausaCambioInstitucion,
                'problemasAprendizaje': responseForm.problemasAprendizaje,
                'problemasAprendizajeEspecificar': responseForm.problemasAprendizajeEspecificar,
                'evaluacionPsicologicaUOtrosAnterior': responseForm.evaluacionPsicologicaUOtrosAnterior,
                'causaEvaluacionPsicologicaUOtrosAnterior': responseForm.causaEvaluacionPsicologicaUOtrosAnterior,
                'recibeApoyo': responseForm.recibeApoyo,
                'causaLugarTiempoRecibeApoyo': responseForm.causaLugarTiempoRecibeApoyo,
                'aprovechamientoGeneral': responseForm.aprovechamientoGeneral,
                'actividadEscolar': responseForm.actividadEscolar,
                'observaciones': responseForm.observaciones,

            }
            await fichaPsicologiaEducativaActualizar(fichaData.id, response, message);
            message.success(t('fichaPsicologiaEducativaActualizada'));
        } catch (error) {
            message.error(t('errorActualizarFichaPsicologiaEducativa') + error);
        } finally {
            setLoading(false);
        }
    };
    const handleDownload = async () => {
        try {
            const response = await psicologiaEducativaPDF(fichaData.id, message);

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.href = url;

            a.download = `ficha_medica_${fichaData.paciente.nombresApellidos}_${fichaData.paciente.cedula}_${fichaData.id}.pdf`; // Nombre del archivo para descargar
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url); // Limpia la URL después de usarla

        } catch (error) {
            console.error(t('errorDescargarPDF'), error);
        }
    };

    const handleOpenPDF = async () => {
        try {
            const response = await psicologiaEducativaPDF(fichaData.id, message);


            const file = new Blob([response.data], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);

            // Abrir en una nueva pestaña o ventana
            window.open(fileURL, '_blank');

            // Limpiar el objeto URL después de abrirlo
            URL.revokeObjectURL(fileURL);
        } catch (error) {
            message.error(t('errorAbrirPDF') + error);
        }
    };
    if (!ficha) {
        return (
            <MenuWrapper setLang={true}>
                <Card>
                    <Card.Meta title={<h1>{t('FichaPsicologiaEducativa')}</h1>} />
                    <div>
                        <h3>{t('NoSeEncontroPaciente')}</h3>
                    </div>
                </Card>
            </MenuWrapper>
        );
    }
    const beforeUpload = (file) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            console.log('You can only upload image files!');
            message.error(t('SoloPuedeSubirImagenes'));
        }
        return isImage
    };
    const handleFileChange = (info) => {
        const file = info.fileList[0]?.originFileObj;
        if (!file) {
            setFichaData({
                ...fichaData,
                genogramaFamiliar: null,
            });
            return;
        }
        if (!beforeUpload(info.file))
            return;
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64Data = reader.result.split(",")[1];
            setFichaData({
                ...fichaData,
                genogramaFamiliar: base64Data,
            });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <MenuWrapper setLang={true}>
            <BreadCrumbPacientes idPaciente={ficha.paciente.id} page={t('FichaPsicologiaEducativa')} />
            <Card>
                <Card.Meta title={
                    <Row justify={'space-between'}>
                        <Col >
                            <h1>{t('FichaPsicologiaEducativa')}</h1>
                        </Col>
                        <Col  >

                            <Row justify={{ xs: 'start', sm: 'start', md: 'end' }}>
                                <Col>
                                    <Button onClick={handleDownload} style={{ color: "#fff", backgroundColor: "#28a745" }}>
                                        <DownCircleOutlined />
                                        {t('descargarFichaPsicologiaEducativa')}
                                    </Button></Col>
                                <Col>
                                    <Button onClick={handleOpenPDF} style={{ color: "#fff", backgroundColor: "#17a2b8" }}>
                                        <FilePdfOutlined />
                                        {t('abrirFichaPsicologiaEducativa')}
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>} />
                <Form form={form} layout="vertical" onFinish={onFinish}>

                    {/* A. DATOS PERSONALES */}
                    <Divider orientation='left'><h2>{t('DatosPersonales')}</h2></Divider>


                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={8}>
                            <img
                                src={fichaData.paciente.imagen ? `data:image/jpeg;base64, ${fichaData.paciente.imagen}` : 'https://www.shareicon.net/data/128x128/2016/06/25/786525_people_512x512.png'}
                                style={{ objectFit: 'cover', borderRadius: '15px' }}
                                alt="avatar"
                                width="160"
                                height="200"
                            /></Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('NombresApellidos')} name="paciente.nombresApellidos">
                                <Input readOnly />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('Ciudad')} name="paciente.ciudad">
                                <Input readOnly />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('FechaNacimiento')} name="paciente.fechaNacimiento">
                                <DatePicker disabled />
                            </Form.Item >
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('Edad')} name="paciente.edad">
                                <InputNumber readOnly />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('TieneDiscapacidad')} name="paciente.tieneDiscapacidad">
                                <Radio.Group disabled>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('TipoDiscapacidad')} name="paciente.tipoDiscapacidad">
                                <Input readOnly />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('PorcentajeDiscapacidad')} name="paciente.porcentajeDiscapacidad">
                                <InputNumber min={0} max={100} readOnly />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('PortadorCarnet')} name="paciente.portadorCarnet">
                                <Radio.Group disabled>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('NombreInstitucionEducativa')} name="paciente.institucionEducativa.nombreInstitucion">
                                <Input readOnly />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('AnioEducacion')} name="paciente.anioEducacion">
                                <InputNumber readOnly />
                            </Form.Item>
                        </Col>
                    </Row>
                    {/* 2. DATOS ACADEMICOS */}
                    <Divider orientation='left'><h2>{t('DatosAcademicos')}</h2></Divider>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('asignaturasGustan')} name="asignaturasGustan">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('asignaturasDisgustan')} name="asignaturasDisgustan">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('relacionDocentes')} name="relacionDocentes">
                                <Select>
                                    <Option value="BUENA">{t('BUENA')}</Option>
                                    <Option value="MALA">{t('MALA')}</Option>
                                    <Option value="REGULAR">{t('REGULAR')}</Option>
                                    <Option value="DEFICIENTE">{t('DEFICIENTE')}</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('causaRelacionDocentes')} name="causaRelacionDocentes">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('gustaIrInstitucion')} name="gustaIrInstitucion">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('causaGustaIrInstitucion')} name="causaGustaIrInstitucion">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('relacionConGrupo')} name="relacionConGrupo">
                                <Select>
                                    <Option value="BUENA">{t('BUENA')}</Option>
                                    <Option value="MALA">{t('MALA')}</Option>
                                    <Option value="REGULAR">{t('REGULAR')}</Option>
                                    <Option value="DEFICIENTE">{t('DEFICIENTE')}</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('causaRelacionConGrupo')} name="causaRelacionConGrupo">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('inclusionEducativa')} name="inclusionEducativa">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('causaInclusionEducativa')} name="causaInclusionEducativa">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('adaptacionesCurriculares')} name="adaptacionesCurriculares">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('gradoAdaptacion')} name="gradoAdaptacion">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('especifiqueAsignaturas')} name="especifiqueAsignaturas">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    {/* 3. DESARROLLO ACADEMICO*/}
                    <Divider orientation='left'><h2>{t('DesarrolloAcademico')}</h2></Divider>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('cdi')} name="cdi">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={16}>
                            <Form.Item label={t('cdiEdad')} name="cdiEdad">
                                <InputNumber min={0} max={100} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('inicial1')} name="inicial1">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={16}>
                            <Form.Item label={t('inicial1Edad')} name="inicial1Edad">
                                <InputNumber min={0} max={100} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('inicial2')} name="inicial2">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={16}>
                            <Form.Item label={t('inicial2Edad')} name="inicial2Edad">
                                <InputNumber min={0} max={100} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('primerEGB')} name="primerEGB">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={16}>
                            <Form.Item label={t('edad1roEGB')} name="edad1roEGB">
                                <InputNumber min={0} max={100} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('perdidaAnio')} name="perdidaAnio">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={16}>
                            <Form.Item label={t('gradoCausaPerdidaAnio')} name="gradoCausaPerdidaAnio">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('desercionEscolar')} name="desercionEscolar">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={16}>
                            <Form.Item label={t('gradoCausaDesercionEscolar')} name="gradoCausaDesercionEscolar">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('cambioInstitucion')} name="cambioInstitucion">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={16}>
                            <Form.Item label={t('gradoCausaCambioInstitucion')} name="gradoCausaCambioInstitucion">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('problemasAprendizaje')} name="problemasAprendizaje">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={16}>
                            <Form.Item label={t('problemasAprendizajeEspecificar')} name="problemasAprendizajeEspecificar">
                                <TextArea rows={4} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('evaluacionPsicologicaUOtrosAnterior')} name="evaluacionPsicologicaUOtrosAnterior">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={16}>
                            <Form.Item label={t('causaEvaluacionPsicologicaUOtrosAnterior')} name="causaEvaluacionPsicologicaUOtrosAnterior">
                                <TextArea rows={4} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('recibeApoyo')} name="recibeApoyo">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={16}>
                            <Form.Item label={t('causaLugarTiempoRecibeApoyo')} name="causaLugarTiempoRecibeApoyo">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('aprovechamientoGeneral')} name="aprovechamientoGeneral">
                                <Select>
                                    <Option value="BUENO">{t('BUENO')}</Option>
                                    <Option value="REGULAR">{t('REGULAR')}</Option>
                                    <Option value="MALO">{t('MALO')}</Option>
                                    <Option value="DEFICIENTE">{t('DEFICIENTE')}</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    {/* 4. ACTIVIDAR ESCOLAR */}
                    <Divider orientation='left'><h2>{t('ActividadEscolar')}</h2></Divider>
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={24}>
                            <Form.Item label={t('actividadEscolar')} name="actividadEscolar">
                                <TextArea rows={4} />
                            </Form.Item>
                        </Col>
                    </Row>
                    { /*5. Observaciones*/}
                    <Divider orientation='left'><h2>{t('Observaciones')}</h2></Divider>
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={24}>
                            <Form.Item label={t('Observaciones')} name="observaciones">
                                <TextArea rows={4} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            {t('GuardarCambios')}
                        </Button>
                    </Form.Item>
                </Form>
            </Card >
        </MenuWrapper >
    );
}



export const getServerSideProps = async (context) => {
    try {
        const res = await fichaPsicologiaEducativaById(context.params.id);
        console.log('res:', res.data);

        if (res.status === 200) {
            return {
                props: {
                    ficha: res.data,
                },
            };
        }
    } catch (error) {
        console.error(error);
    }
    return {
        props: {
            ficha: null,
        },
    };
};
