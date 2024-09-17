import MenuWrapper from '@/components/sidebar';
import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, DatePicker, Select, InputNumber, Radio, Divider, Upload, message, Checkbox, Row, Col, Image, Spin } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import BreadCrumbPacientes from '@/components/commons/breadCrumPaciente';
import dayjs from 'dayjs';
import { DownCircleOutlined, FilePdfOutlined } from '@ant-design/icons';
import { fichaMedicaActualizar, fichaMedicaById, fichaMedicaPDF } from '@/utils/apiRequests';
const { Option } = Select;
const { TextArea } = Input;
import { useUserContext } from '@/assets/useUserContext';

export default function EditarFichaMedica({ ficha }) {
    const { t } = useTranslation('home');
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [fichaData, setFichaData] = useState(ficha);
    const { user } = useUserContext();

    useEffect(() => {
        if (fichaData) {
            form.setFieldsValue({
                ...fichaData,
                'paciente.nombresApellidos': fichaData.paciente.nombresApellidos,
                'paciente.ciudad': fichaData.paciente?.ciudad,
                'paciente.fechaNacimiento': dayjs(fichaData.paciente?.fechaNacimiento, 'YYYY-MM-DD'),
                'paciente.edad': fichaData.paciente.edad,
                'paciente.tieneDiscapacidad': fichaData.paciente.tieneDiscapacidad === 'si',
                'paciente.tipoDiscapacidad': fichaData.paciente.tipoDiscapacidad,
                'paciente.porcentajeDiscapacidad': fichaData.paciente.porcentajeDiscapacidad,
                'paciente.portadorCarnet': fichaData.paciente.portadorCarnet,
                'paciente.institucionEducativa.nombreInstitucion': fichaData.paciente?.institucionEducativa?.nombreInstitucion,
                'paciente.anioEducacion': fichaData.paciente?.anioEducacion,
                'fecha': fichaData.fecha ? dayjs(fichaData.fecha, 'YYYY-MM-DD') : dayjs(new Date(), 'YYYY-MM-DD'),
                'fuenteDeInformacion': fichaData.fuenteDeInformacion,
                'motivoConsulta': fichaData.motivoConsulta,
                'parentesco': fichaData.parentesco,
                'personaQDeriva': fichaData.personaQDeriva,

                // 'elEstudianteViveCon': fichaData.elEstudianteViveCon ? fichaData.elEstudianteViveCon : 'OTRO',
                'elEstudianteViveCon': fichaData.elEstudianteViveCon,
                'elEstudianteViveConOtro': fichaData.elEstudianteViveConOtro,
                'nombreDelPadre': fichaData.nombreDelPadre,
                'edadPadre': fichaData.edadPadre,
                'ocupacionPadre': fichaData.ocupacionPadre,
                'instruccionPadre': fichaData.instruccionPadre,
                'estadoCivilPadre': fichaData.estadoCivilPadre,
                'lugarResidenciaPadre': fichaData.lugarResidenciaPadre,
                'nombreDeLaMadre': fichaData.nombreDeLaMadre,
                'edadMadre': fichaData.edadMadre,
                'ocupacionMadre': fichaData.ocupacionMadre,
                'instruccionMadre': fichaData.instruccionMadre,
                'estadoCivilMadre': fichaData.estadoCivilMadre,
                'lugarResidenciaMadre': fichaData.lugarResidenciaMadre,
                'numeroHermanos': fichaData.numeroHermanos,
                'lugarQueOcupa': fichaData.lugarQueOcupa,
                'direccionDomiciliaria': fichaData.direccionDomiciliaria,
                'vivenJuntos': fichaData.vivenJuntos ? true : false,
                'otrosCompromisos': fichaData.otrosCompromisos,
                'genogramaFamiliar': fichaData.genogramaFamiliar,
                'tipoFamilia': fichaData.tipoFamilia ? fichaData.tipoFamilia : 'NUCLEAR',
                // 'tipoFamilia': fichaData.tipoFamilia,
                'hijosOtrosFamiliaresVivenCasa': fichaData.hijosOtrosFamiliaresVivenCasa,
                'embarazoDeseado': fichaData.embarazoDeseado ? true : false,
                'controlEmbarazo': fichaData.controlEmbarazo ? true : false,
                'causaControlEmbarazo': fichaData.causaControlEmbarazo,
                'enfermedadesMadre': fichaData.enfermedadesMadre,
                'consumoMedicamentosOExposicionSustanciasToxicas': fichaData.consumoMedicamentosOExposicionSustanciasToxicas,
                'presentoAmenazaAborto': fichaData.presentoAmenazaAborto ? true : false,
                'mesAmenazaAborto': fichaData.mesAmenazaAborto,
                'causaAmenazaAborto': fichaData.causaAmenazaAborto,
                'estadoEmocional': fichaData.estadoEmocional,
                'dondeNacioNinio': fichaData.dondeNacioNinio ? fichaData.dondeNacioNinio : 'HOSPITAL',
                // 'dondeNacioNinio': fichaData.dondeNacioNinio,
                'ciudadNacimientoNinio': fichaData.ciudadNacimientoNinio,
                'duracionEmbarazo': fichaData.duracionEmbarazo ? fichaData.duracionEmbarazo : 'A_TERMINO',
                // 'duracionEmbarazo': fichaData.duracionEmbarazo,
                'tipoParto': fichaData.tipoParto ? fichaData.tipoParto : 'NATURAL',
                // 'tipoParto': fichaData.tipoParto,
                'partoSegunElComienzo': fichaData.partoSegunElComienzo ? fichaData.partoSegunElComienzo : 'ESPONTANEO',
                // 'partoSegunElComienzo': fichaData.partoSegunElComienzo,
                'partoSegunFinalizacion': fichaData.partoSegunFinalizacion ? fichaData.partoSegunFinalizacion : 'EUTOCICO',
                // 'partoSegunFinalizacion': fichaData.partoSegunFinalizacion,
                'lloroAlNacer': fichaData.lloroAlNacer ? true : false,
                'pesoAlNacer': fichaData.pesoAlNacer,
                'tallaAlNacer': fichaData.tallaAlNacer,
                'presentoAnoxiaAlNacer': fichaData.presentoAnoxiaAlNacer ? true : false,
                'presentoHipoxiaAlNacer': fichaData.presentoHipoxiaAlNacer ? true : false,
                'presentoIctericiaAlNacer': fichaData.presentoIctericiaAlNacer ? true : false,
                'presentoCianosisAlNacer': fichaData.presentoCianosisAlNacer ? true : false,
                'malformacionCongenita': fichaData.malformacionCongenita,
                'problemasDeAlimentacion': fichaData.problemasDeAlimentacion,
                'complicacionesEnElParto': fichaData.complicacionesEnElParto ? true : false,
                'cualComplicacionParto': fichaData.cualComplicacionParto,
                'estuvoEnIncubadora': fichaData.estuvoEnIncubadora ? true : false,
                'tiempoEstuvoEnIncubadora': fichaData.tiempoEstuvoEnIncubadora,
                'causaEstuvoEnIncubadora': fichaData.causaEstuvoEnIncubadora,
                'esquemaVacunacionCompleto': fichaData.esquemaVacunacionCompleto ? true : false,
                'controlCefalico': fichaData.controlCefalico,
                'sedestacion': fichaData.sedestacion,
                'hipedestacion': fichaData.hipedestacion,
                'caminaConApoyo': fichaData.caminaConApoyo,
                'caminaSolo': fichaData.caminaSolo,
                'subeEscaleras': fichaData.subeEscaleras,
                'controlEsfinteres': fichaData.controlEsfinteres,
                'salta': fichaData.salta,
                'corre': fichaData.corre,
                'gateo': fichaData.gateo,
                'prefiereManoIzquierdaDerecha': fichaData.prefiereManoIzquierdaDerecha,
                'caeOPerdeEquilibrioFacilmente': fichaData.caeOPerdeEquilibrioFacilmente,
                'dejoPechoMaterno': fichaData.dejoPechoMaterno,
                'biberon': fichaData.biberon,
                'alimentoPorSiSoloCuchara': fichaData.alimentoPorSiSoloCuchara,
                'edadIntegroDietaFamiliar': fichaData.edadIntegroDietaFamiliar,
                'enfermedadesConTratamiento': fichaData.enfermedadesConTratamiento,
                'alergias': fichaData.alergias,
                'intervencionesQuirurgicas': fichaData.intervencionesQuirurgicas,
                'medicamentosRequeridosOConsumo': fichaData.medicamentosRequeridosOConsumo,
                'enfermedadesDiscapacidadesFamiliares': fichaData.enfermedadesDiscapacidadesFamiliares,
                'trastornosPsicologicosFamiliares': fichaData.trastornosPsicologicosFamiliares,
                'problemasAprendizajeFamiliares': fichaData.problemasAprendizajeFamiliares,
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
                'fecha': responseForm.fecha,
                'fuenteDeInformacion': responseForm.fuenteDeInformacion,
                'parentesco': responseForm.parentesco,
                'personaQDeriva': responseForm.personaQDeriva,
                'motivoConsulta': responseForm.motivoConsulta,
                'elEstudianteViveCon': responseForm.elEstudianteViveCon,
                'elEstudianteViveConOtro': responseForm.elEstudianteViveConOtro,
                'nombreDelPadre': responseForm.nombreDelPadre,
                'edadPadre': responseForm.edadPadre,
                'ocupacionPadre': responseForm.ocupacionPadre,
                'instruccionPadre': responseForm.instruccionPadre,
                'estadoCivilPadre': responseForm.estadoCivilPadre,
                'lugarResidenciaPadre': responseForm.lugarResidenciaPadre,
                'nombreDeLaMadre': responseForm.nombreDeLaMadre,
                'edadMadre': responseForm.edadMadre,
                'ocupacionMadre': responseForm.ocupacionMadre,
                'instruccionMadre': responseForm.instruccionMadre,
                'estadoCivilMadre': responseForm.estadoCivilMadre,
                'lugarResidenciaMadre': responseForm.lugarResidenciaMadre,
                'numeroHermanos': responseForm.numeroHermanos,
                'lugarQueOcupa': responseForm.lugarQueOcupa,
                'direccionDomiciliaria': responseForm.direccionDomiciliaria,
                'vivenJuntos': responseForm.vivenJuntos,
                'otrosCompromisos': responseForm.otrosCompromisos,
                'tipoFamilia': responseForm.tipoFamilia,
                'hijosOtrosFamiliaresVivenCasa': responseForm.hijosOtrosFamiliaresVivenCasa,
                'embarazoDeseado': responseForm.embarazoDeseado,
                'controlEmbarazo': responseForm.controlEmbarazo,
                'causaControlEmbarazo': responseForm.causaControlEmbarazo,
                'enfermedadesMadre': responseForm.enfermedadesMadre,
                'consumoMedicamentosOExposicionSustanciasToxicas': responseForm.consumoMedicamentosOExposicionSustanciasToxicas,
                'presentoAmenazaAborto': responseForm.presentoAmenazaAborto,
                'mesAmenazaAborto': responseForm.mesAmenazaAborto,
                'causaAmenazaAborto': responseForm.causaAmenazaAborto,
                'estadoEmocional': responseForm.estadoEmocional,
                'dondeNacioNinio': responseForm.dondeNacioNinio,
                'ciudadNacimientoNinio': responseForm.ciudadNacimientoNinio,
                'duracionEmbarazo': responseForm.duracionEmbarazo,
                'tipoParto': responseForm.tipoParto,
                'partoSegunElComienzo': responseForm.partoSegunElComienzo,
                'partoSegunFinalizacion': responseForm.partoSegunFinalizacion,
                'lloroAlNacer': responseForm.lloroAlNacer,
                'pesoAlNacer': responseForm.pesoAlNacer,
                'tallaAlNacer': responseForm.tallaAlNacer,
                'presentoAnoxiaAlNacer': responseForm.presentoAnoxiaAlNacer,
                'presentoHipoxiaAlNacer': responseForm.presentoHipoxiaAlNacer,
                'presentoIctericiaAlNacer': responseForm.presentoIctericiaAlNacer,
                'presentoCianosisAlNacer': responseForm.presentoCianosisAlNacer,
                'malformacionCongenita': responseForm.malformacionCongenita,
                'problemasDeAlimentacion': responseForm.problemasDeAlimentacion,
                'complicacionesEnElParto': responseForm.complicacionesEnElParto,
                'cualComplicacionParto': responseForm.cualComplicacionParto,
                'estuvoEnIncubadora': responseForm.estuvoEnIncubadora,
                'tiempoEstuvoEnIncubadora': responseForm.tiempoEstuvoEnIncubadora,
                'causaEstuvoEnIncubadora': responseForm.causaEstuvoEnIncubadora,
                'esquemaVacunacionCompleto': responseForm.esquemaVacunacionCompleto,
                'controlCefalico': responseForm.controlCefalico,
                'sedestacion': responseForm.sedestacion,
                'hipedestacion': responseForm.hipedestacion,
                'caminaConApoyo': responseForm.caminaConApoyo,
                'caminaSolo': responseForm.caminaSolo,
                'subeEscaleras': responseForm.subeEscaleras,
                'controlEsfinteres': responseForm.controlEsfinteres,
                'salta': responseForm.salta,
                'corre': responseForm.corre,
                'gateo': responseForm.gateo,
                'prefiereManoIzquierdaDerecha': responseForm.prefiereManoIzquierdaDerecha,
                'caeOPerdeEquilibrioFacilmente': responseForm.caeOPerdeEquilibrioFacilmente,
                'dejoPechoMaterno': responseForm.dejoPechoMaterno,
                'biberon': responseForm.biberon,
                'alimentoPorSiSoloCuchara': responseForm.alimentoPorSiSoloCuchara,
                'edadIntegroDietaFamiliar': responseForm.edadIntegroDietaFamiliar,
                'enfermedadesConTratamiento': responseForm.enfermedadesConTratamiento,
                'alergias': responseForm.alergias,
                'intervencionesQuirurgicas': responseForm.intervencionesQuirurgicas,
                'medicamentosRequeridosOConsumo': responseForm.medicamentosRequeridosOConsumo,
                'enfermedadesDiscapacidadesFamiliares': responseForm.enfermedadesDiscapacidadesFamiliares,
                'trastornosPsicologicosFamiliares': responseForm.trastornosPsicologicosFamiliares,
                'problemasAprendizajeFamiliares': responseForm.problemasAprendizajeFamiliares,
            }
            await fichaMedicaActualizar(fichaData.id, response, message);
            message.success(t('fichaMedicaActualizada'));
        } catch (error) {
            message.error(t('errorActualizarFichaMedica') + error);
        } finally {
            setLoading(false);
        }
    };
    const handleDownload = async () => {
        try {
            const response = await fichaMedicaPDF(fichaData.id, message);

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
            const response = await fichaMedicaPDF(fichaData.id, message);


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
                    <Card.Meta title={<h1>{t('FichaMedicaDelPaciente')}</h1>} />
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
                ...form.getFieldsValue(),
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
                ...form.getFieldsValue(),
                genogramaFamiliar: base64Data,
            });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };
    if (!user) return <MenuWrapper setLang={true} >
        <Spin />
    </MenuWrapper>
    return (
        <MenuWrapper setLang={true}>
            <BreadCrumbPacientes idPaciente={ficha.paciente.id} page={t('FichaMedicaPaciente')} />
            <Card>
                <Card.Meta title={<Row justify={'space-between'}>
                    <Col >
                        <h1>{t('FichaMedicaDelPaciente')}</h1>
                    </Col>
                    <Col  >

                        <Row justify={{ xs: 'start', sm: 'start', md: 'end' }}>
                            <Button onClick={handleDownload} style={{ color: "#fff", backgroundColor: "#28a745" }}>
                                <DownCircleOutlined />
                                {t('DescargarHistoriaClinica')}
                            </Button>
                            <Button onClick={handleOpenPDF} style={{ color: "#fff", backgroundColor: "#17a2b8" }}>
                                <FilePdfOutlined />
                                {t('AbrirHistoriaClinica')}
                            </Button>
                        </Row>
                    </Col>
                </Row>} />
                <Form form={form} disabled={!user?.permisos?.historiaClinica} layout="vertical" onFinish={onFinish}>

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
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('fecha')} name="fecha">
                                <DatePicker format={'YYYY-MM-DD'} />
                            </Form.Item >
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('FuenteDeInformacion')} name="fuenteDeInformacion">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('Parentesco')} name="parentesco">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={24}>
                            <Form.Item label={t('PersonaQDeriva')} name="personaQDeriva">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    {/* B. MOTIVO DE CONSULTA */}
                    <Divider orientation='left'><h2>{t('MotivoConsulta')}</h2></Divider>


                    <Form.Item label={t('MotivoConsulta')} name="motivoConsulta">
                        <TextArea rows={4} />
                    </Form.Item>

                    {/* C. GRUPO FAMILIAR */}
                    <Divider orientation='left'><h2>{t('GrupoFamiliar')}</h2></Divider>

                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('ElEstudianteViveCon')} name="elEstudianteViveCon">
                                <Select>
                                    <Option value="OTRO">{t('OTRO')}</Option>
                                    <Option value="AMBOS_PADRES">{t('AMBOS_PADRES')}</Option>
                                    <Option value="SOLO_MAMA">{t('SOLO_MAMA')}</Option>
                                    <Option value="SOLO_PAPA">{t('SOLO_PAPA')}</Option>
                                    <Option value="FAMILIAR">{t('FAMILIAR')}</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('EspecifiqueOtros')} name="elEstudianteViveConOtro">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <h4>{t('Datos_del_Padre')}</h4>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('NombreDelPadre')} name="nombreDelPadre">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('EdadPadre')} name="edadPadre">
                                <InputNumber style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('OcupacionPadre')} name="ocupacionPadre">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('InstruccionPadre')} name="instruccionPadre">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('EstadoCivilPadre')} name="estadoCivilPadre">
                                <Select>
                                    <Option value="soltero">{t('Soltero')}</Option>
                                    <Option value="casado">{t('Casado')}</Option>
                                    <Option value="divorciado">{t('Divorciado')}</Option>
                                    <Option value="viudo">{t('Viudo')}</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('LugarResidenciaPadre')} name="lugarResidenciaPadre">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* Repite lo mismo para los datos de la madre */}
                    <h4>{t('Datos_de_la_Madre')}</h4>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('NombreDeLaMadre')} name="nombreDeLaMadre">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('EdadMadre')} name="edadMadre">
                                <InputNumber style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('OcupacionMadre')} name="ocupacionMadre">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('InstruccionMadre')} name="instruccionMadre">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('EstadoCivilMadre')} name="estadoCivilMadre">
                                <Select>
                                    <Option value="soltero">{t('Soltero')}</Option>
                                    <Option value="casado">{t('Casado')}</Option>
                                    <Option value="divorciado">{t('Divorciado')}</Option>
                                    <Option value="viudo">{t('Viudo')}</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('LugarResidenciaMadre')} name="lugarResidenciaMadre">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <hr />
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('NumeroHermanos')} name="numeroHermanos">
                                <InputNumber style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('LugarQueOcupa')} name="lugarQueOcupa">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('DireccionDomiciliaria')} name="direccionDomiciliaria">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('VivenJuntos')} name="vivenJuntos">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>

                    </Row>
                    <Form.Item label={t('OtrosCompromisos')} name="otrosCompromisos">
                        <TextArea rows={4} />
                    </Form.Item>
                    <Row>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('GenogramaFamiliar')} name="genogramaFamiliar">
                                <Row>
                                    <Image
                                        src={fichaData.genogramaFamiliar ? `data:image/jpeg;base64, ${fichaData.genogramaFamiliar}` : 'https://www.psicoactiva.com/wp-content/uploads/2023/03/genograma-6.jpg'}
                                        style={{ objectFit: 'cover', borderRadius: '15px', width: '250px', height: '200px' }}
                                        alt="genogramaFamiliar"
                                    />
                                </Row>
                                <br />
                                <Row>
                                    <Upload accept='image/*'
                                        beforeUpload={() => false}
                                        onChange={handleFileChange}
                                        maxCount={1}>
                                        <Button>{t('SubirArchivo')}</Button>
                                    </Upload>
                                </Row>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('TipoFamilia')} name="tipoFamilia">
                                <Select>
                                    <Option value="NUCLEAR">{t('NUCLEAR')}</Option>
                                    <Option value="EXTENSA_O_CONSANGUINEA">{t('EXTENSA_O_CONSANGUINEA')}</Option>
                                    <Option value="MONOPARENTAL">{t('MONOPARENTAL')}</Option>
                                    <Option value="RECONSTRUIDA">{t('RECONSTRUIDA')}</Option>
                                    <Option value="AMPLIADA_NO_CONSANGUINEA">{t('AMPLIADA_NO_CONSANGUINEA')}</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('HijosOtrosFamiliaresVivenCasa')} name="hijosOtrosFamiliaresVivenCasa">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* D. DesarrolloEvolutivo */}
                    <Divider orientation='left'><h2>{t('DesarrolloEvolutivo')}</h2></Divider>
                    <h4>{t('DesarrolloPrenatal')}</h4>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('EmbarazoDeseado')} name="embarazoDeseado">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('ControlEmbarazo')} name="controlEmbarazo">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('CausaControlEmbarazo')} name="causaControlEmbarazo">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('EnfermedadesMadre')} name="enfermedadesMadre">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('ConsumoMedicamentosOExposicionSustanciasToxicas')} name="consumoMedicamentosOExposicionSustanciasToxicas">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('PresentoAmenazaAborto')} name="presentoAmenazaAborto">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('MesAmenazaAborto')} name="mesAmenazaAborto">
                                <Input style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('CausaAmenazaAborto')} name="causaAmenazaAborto">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('EstadoEmocional')} name="estadoEmocional">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <h4>{t('DesarrolloPerinatal')}</h4>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('DondeNacioNinio')} name="dondeNacioNinio">
                                <Select>
                                    <Option value="HOSPITAL">{t('HOSPITAL')}</Option>
                                    <Option value="CLINICA">{t('CLINICA')}</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('CiudadNacimientoNinio')} name="ciudadNacimientoNinio">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('DuracionEmbarazo')} name="duracionEmbarazo">
                                <Select>
                                    <Option value="A_TERMINO">{t('A_TERMINO')}</Option>
                                    <Option value="PRE_TERMINO">{t('PRE_TERMINO')}</Option>
                                    <Option value="POSTERMICO">{t('POSTERMICO')}</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('TipoParto')} name="tipoParto">
                                <Select>
                                    <Option value="NATURAL">{t('NATURAL')}</Option>
                                    <Option value="CESAREA">{t('CESAREA')}</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('PartoSegunElComienzo')} name="partoSegunElComienzo">
                                <Select>
                                    <Option value="ESPONTANEO">{t('ESPONTANEO')}</Option>
                                    <Option value="INDUCIDO">{t('INDUCIDO')}</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('PartoSegunFinalizacion')} name="partoSegunFinalizacion">
                                <Select>
                                    <Option value="EUTOCICO">{t('EUTOCICO')}</Option>
                                    <Option value="DISTOCICO">{t('DISTOCICO')}</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('LloroAlNacer')} name="lloroAlNacer">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('PesoAlNacer')} name="pesoAlNacer">
                                <InputNumber min={0} step={0.1} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('TallaAlNacer')} name="tallaAlNacer">
                                <InputNumber min={0} step={0.1} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <h4>{t('PresentoAlNacer')}</h4>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('presentoAnoxiaAlNacer')} name="presentoAnoxiaAlNacer">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('presentoHipoxiaAlNacer')} name="presentoHipoxiaAlNacer">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('presentoIctericiaAlNacer')} name="presentoIctericiaAlNacer">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('presentoCianosisAlNacer')} name="presentoCianosisAlNacer">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('MalformacionCongenita')} name="malformacionCongenita">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('ProblemasDeAlimentacion')} name="problemasDeAlimentacion">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('ComplicacionesEnElParto')} name="complicacionesEnElParto">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('CualComplicacionParto')} name="cualComplicacionParto">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <h4>{t('DesarrolloPosnatal')}</h4>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('EstuvoEnIncubadora')} name="estuvoEnIncubadora">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('TiempoEstuvoEnIncubadora')} name="tiempoEstuvoEnIncubadora">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('CausaEstuvoEnIncubadora')} name="causaEstuvoEnIncubadora">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('EsquemaVacunacionCompleto')} name="esquemaVacunacionCompleto">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* E. Crecimito y desarrollo */}
                    <Divider orientation='left'><h2>{t('CrecimientoyDesarrollo')}</h2></Divider>
                    <h4>{t('DesarrolloMotor')}</h4>
                    <Row gutter={16}>

                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('ControlCefalico')} name="controlCefalico">
                                <Input style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('Sedestacion')} name="sedestacion">
                                <Input style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('Hipedestacion')} name="hipedestacion">
                                <Input style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('CaminaConApoyo')} name="caminaConApoyo">
                                <Input style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('CaminaSolo')} name="caminaSolo">
                                <Input style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('SubeEscaleras')} name="subeEscaleras">
                                <Input style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('ControlEsfinteres')} name="controlEsfinteres">
                                <Input style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('Salta')} name="salta">
                                <Input style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('Corre')} name="corre">
                                <Input style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('Gateo')} name="gateo">
                                <Input style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('PrefiereManoIzquierdaDerecha')} name="prefiereManoIzquierdaDerecha">
                                <Radio.Group>
                                    <Radio value="izquierda">{t('Izquierda')}</Radio>
                                    <Radio value="derecha">{t('Derecha')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('CaeOPerdeEquilibrioFacilmente')} name="caeOPerdeEquilibrioFacilmente">
                                <Input style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    {/* F. ALIMENTACION */}
                    <Divider orientation='left'><h2>{t('Alimentacion')}</h2></Divider>

                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('DejoPechoMaterno')} name="dejoPechoMaterno">
                                <Input style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('Biberon')} name="biberon">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('AlimentoPorSiSoloCuchara')} name="alimentoPorSiSoloCuchara">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('EdadIntegroDietaFamiliar')} name="edadIntegroDietaFamiliar">
                                <Input style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>

                    </Row>
                    {/* G. ANTECEDENTES MEDICOS DEL PACIENTE */}
                    <Divider orientation='left'><h2>{t('AntecedentesMedicosDelPaciente')}</h2></Divider>

                    <Form.Item label={t('EnfermedadesConTratamiento')} name="enfermedadesConTratamiento">
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item label={t('Alergias')} name="alergias">
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item label={t('IntervencionesQuirurgicas')} name="intervencionesQuirurgicas">
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item label={t('MedicamentosRequeridosOConsumo')} name="medicamentosRequeridosOConsumo">
                        <TextArea rows={4} />
                    </Form.Item>
                    <Divider orientation='left'><h2>{t('antecedentesFamiliares')}</h2></Divider>
                    <Col>
                        <h3>{t('AntecedentesFamiliares')}</h3>
                    </Col>
                    <Form.Item label={t('EnfermedadesDiscapacidadesFamiliares')} name="enfermedadesDiscapacidadesFamiliares">
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item label={t('TrastornosPsicologicosFamiliares')} name="trastornosPsicologicosFamiliares">
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item label={t('ProblemasAprendizajeFamiliares')} name="problemasAprendizajeFamiliares">
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            {t('GuardarCambios')}
                        </Button>
                    </Form.Item>
                </Form >
            </Card >
        </MenuWrapper >
    );
}



export const getServerSideProps = async (context) => {
    try {
        const res = await fichaMedicaById(context.params.id);
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
