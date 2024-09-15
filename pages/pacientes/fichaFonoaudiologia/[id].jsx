import MenuWrapper from '@/components/sidebar';
import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, DatePicker, Select, InputNumber, Radio, Divider, Upload, message, Checkbox, Row, Col, Image, Spin } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import BreadCrumbPacientes from '@/components/commons/breadCrumPaciente';
import dayjs from 'dayjs';
import { DownCircleOutlined, FilePdfOutlined } from '@ant-design/icons';
import { fichaFonoaudiologiaActualizar, fichaFonoaudiologiaById, fonoaudiologiaPDF } from '@/utils/apiRequests';
const { Option } = Select;
const { TextArea } = Input;
import { useUserContext } from '@/assets/useUserContext';

export default function EditarFichaFonoaudiologia({ ficha }) {
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
                'paciente.ciudad': fichaData.paciente.ciudad,
                'paciente.fechaNacimiento': dayjs(fichaData.paciente.fechaNacimiento, 'YYYY-MM-DD'),
                'paciente.edad': fichaData.paciente.edad,
                'paciente.tieneDiscapacidad': fichaData.paciente.tieneDiscapacidad === 'si',
                'paciente.tipoDiscapacidad': fichaData.paciente.tipoDiscapacidad,
                'paciente.porcentajeDiscapacidad': fichaData.paciente.porcentajeDiscapacidad,
                'paciente.portadorCarnet': fichaData.paciente.portadorCarnet,
                'paciente.institucionEducativa.nombreInstitucion': fichaData.paciente.institucionEducativa.nombreInstitucion,
                'paciente.anioEducacion': fichaData.paciente.anioEducacion,



                'dificultadPronunciarPalabras': fichaData.dificultadPronunciarPalabras ? fichaData.dificultadPronunciarPalabras : false,

                'seTrabaCuandoHabla': fichaData.seTrabaCuandoHabla ? fichaData.seTrabaCuandoHabla : false,


                'seEntiendeLoQueDice': fichaData.seEntiendeLoQueDice ? fichaData.seEntiendeLoQueDice : false,

                'sabeComoLlamanObjetosEntorno': fichaData.sabeComoLlamanObjetosEntorno ? fichaData.sabeComoLlamanObjetosEntorno : false,

                'comprendeLoQueSeLeDice': fichaData.comprendeLoQueSeLeDice ? fichaData.comprendeLoQueSeLeDice : false,

                'reconoceFuenteSonora': fichaData.reconoceFuenteSonora ? fichaData.reconoceFuenteSonora : false,

                'comunicacionPreferentementeForma': fichaData.comunicacionPreferentementeForma,

                'seARealizadoExamenAudiologico': fichaData.seARealizadoExamenAudiologico ? fichaData.seARealizadoExamenAudiologico : false,

                'perdidaAuditivaConductivaNeurosensorial': fichaData.perdidaAuditivaConductivaNeurosensorial ? fichaData.perdidaAuditivaConductivaNeurosensorial : false,

                'hipoacusiaConductivaBilateral': fichaData.hipoacusiaConductivaBilateral ? fichaData.hipoacusiaConductivaBilateral : false,

                'hipoacusiaConductivaUnilateral': fichaData.hipoacusiaConductivaUnilateral ? fichaData.hipoacusiaConductivaUnilateral : false,

                'hipoacusiaNeurosensorialBilateral': fichaData.hipoacusiaNeurosensorialBilateral ? fichaData.hipoacusiaNeurosensorialBilateral : false,

                'hipoacusiaNeurosensorialUnilateral': fichaData.hipoacusiaNeurosensorialUnilateral ? fichaData.hipoacusiaNeurosensorialUnilateral : false,

                'trastornoEspecificoPronunciacion': fichaData.trastornoEspecificoPronunciacion ? fichaData.trastornoEspecificoPronunciacion : false,

                'trastornoLenguajeExpresivo': fichaData.trastornoLenguajeExpresivo ? fichaData.trastornoLenguajeExpresivo : false,

                'afasiaAdquiridaEpilepsia': fichaData.afasiaAdquiridaEpilepsia ? fichaData.afasiaAdquiridaEpilepsia : false,

                'otrosTrastornosDesarrolloHabla': fichaData.otrosTrastornosDesarrolloHabla ? fichaData.otrosTrastornosDesarrolloHabla : false,

                'trastornoDesarrolloHablaLenguaje': fichaData.trastornoDesarrolloHablaLenguaje ? fichaData.trastornoDesarrolloHablaLenguaje : false,

                'alteracionesHabla': fichaData.alteracionesHabla ? fichaData.alteracionesHabla : false,

                'disfasiaAfasia': fichaData.disfasiaAfasia ? fichaData.disfasiaAfasia : false,

                'disartriaAnartria': fichaData.disartriaAnartria ? fichaData.disartriaAnartria : false,

                'otrasAlteracionesHabla': fichaData.otrasAlteracionesHabla ? fichaData.otrasAlteracionesHabla : false,

                'infeccionesOidoFuertes': fichaData.infeccionesOidoFuertes ? fichaData.infeccionesOidoFuertes : false,

                'cualInfeccionesOidoFuertes': fichaData.cualInfeccionesOidoFuertes,

                'edadInfeccionesOidoFuertes': fichaData.edadInfeccionesOidoFuertes,

                'creeTonoVozEstudianteApropiado': fichaData.creeTonoVozEstudianteApropiado ? fichaData.creeTonoVozEstudianteApropiado : false,

                'respiracionNormal': fichaData.respiracionNormal ? fichaData.respiracionNormal : false,

                'situacionesAlteraTonoVoz': fichaData.situacionesAlteraTonoVoz,

                'desdeCuandoAlteracionesVoz': fichaData.desdeCuandoAlteracionesVoz,

                'tonoDeVoz': fichaData.tonoDeVoz,

                'respiracion': fichaData.respiracion,

                'ronca': fichaData.ronca ? fichaData.ronca : false,

                'juegoVocal': fichaData.juegoVocal ? fichaData.juegoVocal : false,

                'vocalizacion': fichaData.vocalizacion ? fichaData.vocalizacion : false,

                'balbuceo': fichaData.balbuceo ? fichaData.balbuceo : false,

                'silabeo': fichaData.silabeo ? fichaData.silabeo : false,

                'primerasPalabras': fichaData.primerasPalabras ? fichaData.primerasPalabras : false,

                'oracionesDosPalabras': fichaData.oracionesDosPalabras ? fichaData.oracionesDosPalabras : false,

                'oracionesTresPalabras': fichaData.oracionesTresPalabras ? fichaData.oracionesTresPalabras : false,

                'formacionLinguisticaCompleta': fichaData.formacionLinguisticaCompleta ? fichaData.formacionLinguisticaCompleta : false,

                'numeroTotalPalabras': fichaData.numeroTotalPalabras,

                'perdidaAuditiva': fichaData.perdidaAuditiva ? fichaData.perdidaAuditiva : false,

                'unilateral': fichaData.unilateral ? fichaData.unilateral : false,

                'oidoDerecho': fichaData.oidoDerecho ? fichaData.oidoDerecho : false,

                'oidoIzquierdo': fichaData.oidoIzquierdo ? fichaData.oidoIzquierdo : false,

                'bilateral': fichaData.bilateral ? fichaData.bilateral : false,

                'gradoPerdida': fichaData.gradoPerdida,

                'permanecia': fichaData.permanecia,

                'otitis': fichaData.otitis ? fichaData.otitis : false,

                'tipoOtitis': fichaData.tipoOtitis,

                'duracionOtitisInicio': fichaData.duracionOtitisInicio ? dayjs(fichaData.duracionOtitisInicio, 'YYYY-MM-DD') : null,

                'duracionOtitisFin': fichaData.duracionOtitisFin ? dayjs(fichaData.duracionOtitisFin, 'YYYY-MM-DD') : null,

                'antecedentesFamiliares': fichaData.antecedentesFamiliares ? fichaData.antecedentesFamiliares : false,

                'exposisionRuidos': fichaData.exposisionRuidos ? fichaData.exposisionRuidos : false,


                'duracionExposisionRuidosInicio': fichaData.duracionExposisionRuidosInicio ? dayjs(fichaData.duracionExposisionRuidosInicio, 'YYYY-MM-DD') : null,

                'duracionExposisionRuidosFin': fichaData.duracionExposisionRuidosFin ? dayjs(fichaData.duracionExposisionRuidosFin, 'YYYY-MM-DD') : null,

                'ototoxicos': fichaData.ototoxicos ? fichaData.ototoxicos : false,

                'infecciones': fichaData.infecciones ? fichaData.infecciones : false,

                'usoAudifonos': fichaData.usoAudifonos ? fichaData.usoAudifonos : false,

                'inicioUsoAudifonos': fichaData.inicioUsoAudifonos ? dayjs(fichaData.inicioUsoAudifonos, 'YYYY-MM-DD') : null,

                'finUsoAudifonos': fichaData.finUsoAudifonos ? dayjs(fichaData.finUsoAudifonos, 'YYYY-MM-DD') : null,

                'implanteCoclear': fichaData.implanteCoclear ? fichaData.implanteCoclear : false,

                'tratamientoFonoaudiologicoPrevio': fichaData.tratamientoFonoaudiologicoPrevio ? fichaData.tratamientoFonoaudiologicoPrevio : false,

                'otalgia': fichaData.otalgia ? fichaData.otalgia : false,

                'otalgiaUnilateral': fichaData.otalgiaUnilateral ? fichaData.otalgiaUnilateral : false,

                'otalgiaOidoDerecho': fichaData.otalgiaOidoDerecho ? fichaData.otalgiaOidoDerecho : false,

                'otalgiaOidoIzquierdo': fichaData.otalgiaOidoIzquierdo ? fichaData.otalgiaOidoIzquierdo : false,

                'otalgiaBilateral': fichaData.otalgiaBilateral ? fichaData.otalgiaBilateral : false,

                'permanenciaOtalgiaContinua': fichaData.permanenciaOtalgiaContinua ? fichaData.permanenciaOtalgiaContinua : false,

                'permanenciaOtalgiaIntermitente': fichaData.permanenciaOtalgiaIntermitente ? fichaData.permanenciaOtalgiaIntermitente : false,

                'gradoPermanenciaOtalgia': fichaData.gradoPermanenciaOtalgia,

                'asociadaOtalgiaInfeccionRespiratoriaAlta': fichaData.asociadaOtalgiaInfeccionRespiratoriaAlta ? fichaData.asociadaOtalgiaInfeccionRespiratoriaAlta : false,

                'infeccionRespiratoriaPunzante': fichaData.infeccionRespiratoriaPunzante ? fichaData.infeccionRespiratoriaPunzante : false,

                'infeccionRespiratoriaPulsatil': fichaData.infeccionRespiratoriaPulsatil ? fichaData.infeccionRespiratoriaPulsatil : false,

                'infeccionRespiratoriaProgresivo': fichaData.infeccionRespiratoriaProgresivo ? fichaData.infeccionRespiratoriaProgresivo : false,

                'infeccionRespiratoriaOpresivo': fichaData.infeccionRespiratoriaOpresivo ? fichaData.infeccionRespiratoriaOpresivo : false,

                'pruriginoso': fichaData.pruriginoso ? fichaData.pruriginoso : false,

                'aumentaMasticar': fichaData.aumentaMasticar ? fichaData.aumentaMasticar : false,

                'disminuyeConCalorLocal': fichaData.disminuyeConCalorLocal ? fichaData.disminuyeConCalorLocal : false,

                'aumentaConCalorLocal': fichaData.aumentaConCalorLocal ? fichaData.aumentaConCalorLocal : false,

                'otorrea': fichaData.otorrea ? fichaData.otorrea : false,

                'otorreaUnilateral': fichaData.otorreaUnilateral ? fichaData.otorreaUnilateral : false,

                'otorreaOidoDerecho': fichaData.otorreaOidoDerecho ? fichaData.otorreaOidoDerecho : false,

                'otorreaOidoIzquierdo': fichaData.otorreaOidoIzquierdo ? fichaData.otorreaOidoIzquierdo : false,

                'otorreaBilateral': fichaData.otorreaBilateral ? fichaData.otorreaBilateral : false,

                'permanenciaOtorreaContinua': fichaData.permanenciaOtorreaContinua ? fichaData.permanenciaOtorreaContinua : false,

                'permanenciaOtorreaIntermitente': fichaData.permanenciaOtorreaIntermitente ? fichaData.permanenciaOtorreaIntermitente : false,

                'gradoPermanenciaOtorrea': fichaData.gradoPermanenciaOtorrea,

                'aspectoClaroOtorrea': fichaData.aspectoClaroOtorrea ? fichaData.aspectoClaroOtorrea : false,

                'aspectoSerosoOtorrea': fichaData.aspectoSerosoOtorrea ? fichaData.aspectoSerosoOtorrea : false,

                'aspectoMucosoOtorrea': fichaData.aspectoMucosoOtorrea ? fichaData.aspectoMucosoOtorrea : false,

                'aspectoMucopurulentoOtorrea': fichaData.aspectoMucopurulentoOtorrea ? fichaData.aspectoMucopurulentoOtorrea : false,

                'aspectoPurulentoOtorrea': fichaData.aspectoPurulentoOtorrea ? fichaData.aspectoPurulentoOtorrea : false,

                'aspectoSanguinolentoOtorrea': fichaData.aspectoSanguinolentoOtorrea ? fichaData.aspectoSanguinolentoOtorrea : false,

                'asosiadaOtorreaInfeccionRespiratoriaAlta': fichaData.asosiadaOtorreaInfeccionRespiratoriaAlta ? fichaData.asosiadaOtorreaInfeccionRespiratoriaAlta : false,

                'asosiadaotorreaInfeccionAgudaOido': fichaData.asosiadaotorreaInfeccionAgudaOido ? fichaData.asosiadaotorreaInfeccionAgudaOido : false,

                'presentoOtalgia': fichaData.presentoOtalgia ? fichaData.presentoOtalgia : false,

                'presentoOtalgiaBilateral': fichaData.presentoOtalgiaBilateral ? fichaData.presentoOtalgiaBilateral : false,

                'presentoOtalgiaOidoDerecho': fichaData.presentoOtalgiaOidoDerecho ? fichaData.presentoOtalgiaOidoDerecho : false,

                'presentoOtalgiaOidoIzquierdo': fichaData.presentoOtalgiaOidoIzquierdo ? fichaData.presentoOtalgiaOidoIzquierdo : false,

                'presentoSensacionOidoTapado': fichaData.presentoSensacionOidoTapado ? fichaData.presentoSensacionOidoTapado : false,

                'presentoSensacionOidoTapadoBilateral': fichaData.presentoSensacionOidoTapadoBilateral ? fichaData.presentoSensacionOidoTapadoBilateral : false,

                'presentoSensacionOidoTapadoOidoDerecho': fichaData.presentoSensacionOidoTapadoOidoDerecho ? fichaData.presentoSensacionOidoTapadoOidoDerecho : false,

                'presentoSensacionOidoTapadoOidoIzquierdo': fichaData.presentoSensacionOidoTapadoOidoIzquierdo ? fichaData.presentoSensacionOidoTapadoOidoIzquierdo : false,

                'presentoAutofonia': fichaData.presentoAutofonia ? fichaData.presentoAutofonia : false,

                'presentoAutofoniaBilateral': fichaData.presentoAutofoniaBilateral ? fichaData.presentoAutofoniaBilateral : false,

                'presentoAutofoniaOidoDerecho': fichaData.presentoAutofoniaOidoDerecho ? fichaData.presentoAutofoniaOidoDerecho : false,

                'presentoAutofoniaOidoIzquierdo': fichaData.presentoAutofoniaOidoIzquierdo ? fichaData.presentoAutofoniaOidoIzquierdo : false,

                'presentoOtorrea': fichaData.presentoOtorrea ? fichaData.presentoOtorrea : false,

                'presentoOtorreaBilateral': fichaData.presentoOtorreaBilateral ? fichaData.presentoOtorreaBilateral : false,

                'presentoOtorreaOidoDerecho': fichaData.presentoOtorreaOidoDerecho ? fichaData.presentoOtorreaOidoDerecho : false,

                'presentoOtorreaOidoIzquierdo': fichaData.presentoOtorreaOidoIzquierdo ? fichaData.presentoOtorreaOidoIzquierdo : false,

                'aumentaVolumenTV': fichaData.aumentaVolumenTV ? fichaData.aumentaVolumenTV : false,

                'sensacionPercibirTinnitus': fichaData.sensacionPercibirTinnitus ? fichaData.sensacionPercibirTinnitus : false,

                'expuestoRuidosFuertes': fichaData.expuestoRuidosFuertes ? fichaData.expuestoRuidosFuertes : false,

                'dificultadOidVozBaja': fichaData.dificultadOidVozBaja ? fichaData.dificultadOidVozBaja : false,

                'hablaMasFuerteOMasDespacio': fichaData.hablaMasFuerteOMasDespacio ? fichaData.hablaMasFuerteOMasDespacio : false,

                'utilizaAyudaAuditiva': fichaData.utilizaAyudaAuditiva ? fichaData.utilizaAyudaAuditiva : false,

                'percibeSonidoIgualAmbosOidos': fichaData.percibeSonidoIgualAmbosOidos ? fichaData.percibeSonidoIgualAmbosOidos : false,

                'conQueOidoEscuchaMejor': fichaData.conQueOidoEscuchaMejor,

                'haceCuantoTiempoPresentaSintomasAuditivos': fichaData.haceCuantoTiempoPresentaSintomasAuditivos,

                'faltaEquilibrioCaminar': fichaData.faltaEquilibrioCaminar ? fichaData.faltaEquilibrioCaminar : false,

                'mareos': fichaData.mareos ? fichaData.mareos : false,

                'cuandoMareos': fichaData.cuandoMareos,

                'vertigo': fichaData.vertigo ? fichaData.vertigo : false,

                'palpacionPabellonOidoDerecho': fichaData.palpacionPabellonOidoDerecho,

                'palpacionMastoidesOidoDerecho': fichaData.palpacionMastoidesOidoDerecho,

                'caeOidoDerecho': fichaData.caeOidoDerecho,

                'obstruccionOidoDerecho': fichaData.obstruccionOidoDerecho,

                'aparienciaMenbranaTimpanicaOidoDerecho': fichaData.aparienciaMenbranaTimpanicaOidoDerecho,

                'perforacionOidoDerecho': fichaData.perforacionOidoDerecho ? fichaData.perforacionOidoDerecho : false,

                'burbujaOidoDerecho': fichaData.burbujaOidoDerecho ? fichaData.burbujaOidoDerecho : false,

                'coloracionOidoDerecho': fichaData.coloracionOidoDerecho,

                'palpacionPabellonOidoIzquierdo': fichaData.palpacionPabellonOidoIzquierdo,

                'palpacionMastoidesOidoIzquierdo': fichaData.palpacionMastoidesOidoIzquierdo,

                'perforacionOidoIzquierdo': fichaData.perforacionOidoIzquierdo ? fichaData.perforacionOidoIzquierdo : false,

                'burbujaOidoIzquierdo': fichaData.burbujaOidoIzquierdo ? fichaData.burbujaOidoIzquierdo : false,

                'coloracionOidoIzquierdo': fichaData.coloracionOidoIzquierdo,

                'atenidoPerdidaAudicionPasado': fichaData.atenidoPerdidaAudicionPasado ? fichaData.atenidoPerdidaAudicionPasado : false,
                'obstruccionOidoIzquierdo': fichaData.obstruccionOidoIzquierdo ? fichaData.obstruccionOidoIzquierdo : null,
                'aparienciaMenbranaTimpanicaOidoIzquierdo': fichaData.aparienciaMenbranaTimpanicaOidoIzquierdo ? fichaData.aparienciaMenbranaTimpanicaOidoIzquierdo : null,
                'caeOidoIzquierdo': fichaData.caeOidoIzquierdo ? fichaData.caeOidoIzquierdo : null,
                'especficarAyudaAuditiva': fichaData.especficarAyudaAuditiva,
                'trastornoRecepcionLenguaje': fichaData.trastornoRecepcionLenguaje ? fichaData.trastornoRecepcionLenguaje : false,
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

                'dificultadPronunciarPalabras': responseForm.dificultadPronunciarPalabras,

                'seTrabaCuandoHabla': responseForm.seTrabaCuandoHabla,


                'seEntiendeLoQueDice': responseForm.seEntiendeLoQueDice,

                'sabeComoLlamanObjetosEntorno': responseForm.sabeComoLlamanObjetosEntorno,

                'comprendeLoQueSeLeDice': responseForm.comprendeLoQueSeLeDice,

                'reconoceFuenteSonora': responseForm.reconoceFuenteSonora,

                'comunicacionPreferentementeForma': responseForm.comunicacionPreferentementeForma,

                'seARealizadoExamenAudiologico': responseForm.seARealizadoExamenAudiologico,

                'perdidaAuditivaConductivaNeurosensorial': responseForm.perdidaAuditivaConductivaNeurosensorial,

                'hipoacusiaConductivaBilateral': responseForm.hipoacusiaConductivaBilateral,

                'hipoacusiaConductivaUnilateral': responseForm.hipoacusiaConductivaUnilateral,

                'hipoacusiaNeurosensorialBilateral': responseForm.hipoacusiaNeurosensorialBilateral,

                'hipoacusiaNeurosensorialUnilateral': responseForm.hipoacusiaNeurosensorialUnilateral,

                'trastornoEspecificoPronunciacion': responseForm.trastornoEspecificoPronunciacion,

                'trastornoLenguajeExpresivo': responseForm.trastornoLenguajeExpresivo,

                'afasiaAdquiridaEpilepsia': responseForm.afasiaAdquiridaEpilepsia,

                'otrosTrastornosDesarrolloHabla': responseForm.otrosTrastornosDesarrolloHabla,

                'trastornoDesarrolloHablaLenguaje': responseForm.trastornoDesarrolloHablaLenguaje,

                'alteracionesHabla': responseForm.alteracionesHabla,

                'disfasiaAfasia': responseForm.disfasiaAfasia,

                'disartriaAnartria': responseForm.disartriaAnartria,

                'otrasAlteracionesHabla': responseForm.otrasAlteracionesHabla,

                'infeccionesOidoFuertes': responseForm.infeccionesOidoFuertes,

                'cualInfeccionesOidoFuertes': responseForm.cualInfeccionesOidoFuertes,

                'edadInfeccionesOidoFuertes': responseForm.edadInfeccionesOidoFuertes,

                'creeTonoVozEstudianteApropiado': responseForm.creeTonoVozEstudianteApropiado,

                'respiracionNormal': responseForm.respiracionNormal,

                'situacionesAlteraTonoVoz': responseForm.situacionesAlteraTonoVoz,

                'desdeCuandoAlteracionesVoz': responseForm.desdeCuandoAlteracionesVoz,

                'tonoDeVoz': responseForm.tonoDeVoz,

                'respiracion': responseForm.respiracion,

                'ronca': responseForm.ronca,

                'juegoVocal': responseForm.juegoVocal,

                'vocalizacion': responseForm.vocalizacion,

                'balbuceo': responseForm.balbuceo,

                'silabeo': responseForm.silabeo,

                'primerasPalabras': responseForm.primerasPalabras,

                'oracionesDosPalabras': responseForm.oracionesDosPalabras,

                'oracionesTresPalabras': responseForm.oracionesTresPalabras,

                'formacionLinguisticaCompleta': responseForm.formacionLinguisticaCompleta,

                'numeroTotalPalabras': responseForm.numeroTotalPalabras,

                'perdidaAuditiva': responseForm.perdidaAuditiva,

                'unilateral': responseForm.unilateral,

                'oidoDerecho': responseForm.oidoDerecho,

                'oidoIzquierdo': responseForm.oidoIzquierdo,

                'bilateral': responseForm.bilateral,

                'gradoPerdida': responseForm.gradoPerdida,

                'permanecia': responseForm.permanecia,

                'otitis': responseForm.otitis,

                'tipoOtitis': responseForm.tipoOtitis,

                'duracionOtitisInicio': responseForm.duracionOtitisInicio,

                'duracionOtitisFin': responseForm.duracionOtitisFin,

                'antecedentesFamiliares': responseForm.antecedentesFamiliares,

                'exposisionRuidos': responseForm.exposisionRuidos,


                'duracionExposisionRuidosInicio': responseForm.duracionExposisionRuidosInicio,

                'duracionExposisionRuidosFin': responseForm.duracionExposisionRuidosFin,

                'ototoxicos': responseForm.ototoxicos,

                'infecciones': responseForm.infecciones,

                'usoAudifonos': responseForm.usoAudifonos,

                'inicioUsoAudifonos': responseForm.inicioUsoAudifonos,

                'finUsoAudifonos': responseForm.finUsoAudifonos,

                'implanteCoclear': responseForm.implanteCoclear,

                'tratamientoFonoaudiologicoPrevio': responseForm.tratamientoFonoaudiologicoPrevio,

                'otalgia': responseForm.otalgia,

                'otalgiaUnilateral': responseForm.otalgiaUnilateral,

                'otalgiaOidoDerecho': responseForm.otalgiaOidoDerecho,

                'otalgiaOidoIzquierdo': responseForm.otalgiaOidoIzquierdo,

                'otalgiaBilateral': responseForm.otalgiaBilateral,

                'permanenciaOtalgiaContinua': responseForm.permanenciaOtalgiaContinua,

                'permanenciaOtalgiaIntermitente': responseForm.permanenciaOtalgiaIntermitente,

                'gradoPermanenciaOtalgia': responseForm.gradoPermanenciaOtalgia,

                'asociadaOtalgiaInfeccionRespiratoriaAlta': responseForm.asociadaOtalgiaInfeccionRespiratoriaAlta,

                'infeccionRespiratoriaPunzante': responseForm.infeccionRespiratoriaPunzante,

                'infeccionRespiratoriaPulsatil': responseForm.infeccionRespiratoriaPulsatil,

                'infeccionRespiratoriaProgresivo': responseForm.infeccionRespiratoriaProgresivo,

                'infeccionRespiratoriaOpresivo': responseForm.infeccionRespiratoriaOpresivo,

                'pruriginoso': responseForm.pruriginoso,

                'aumentaMasticar': responseForm.aumentaMasticar,

                'disminuyeConCalorLocal': responseForm.disminuyeConCalorLocal,

                'aumentaConCalorLocal': responseForm.aumentaConCalorLocal,

                'otorrea': responseForm.otorrea,

                'otorreaUnilateral': responseForm.otorreaUnilateral,

                'otorreaOidoDerecho': responseForm.otorreaOidoDerecho,

                'otorreaOidoIzquierdo': responseForm.otorreaOidoIzquierdo,

                'otorreaBilateral': responseForm.otorreaBilateral,

                'permanenciaOtorreaContinua': responseForm.permanenciaOtorreaContinua,

                'permanenciaOtorreaIntermitente': responseForm.permanenciaOtorreaIntermitente,

                'gradoPermanenciaOtorrea': responseForm.gradoPermanenciaOtorrea,

                'aspectoClaroOtorrea': responseForm.aspectoClaroOtorrea,

                'aspectoSerosoOtorrea': responseForm.aspectoSerosoOtorrea,

                'aspectoMucosoOtorrea': responseForm.aspectoMucosoOtorrea,

                'aspectoMucopurulentoOtorrea': responseForm.aspectoMucopurulentoOtorrea,

                'aspectoPurulentoOtorrea': responseForm.aspectoPurulentoOtorrea,

                'aspectoSanguinolentoOtorrea': responseForm.aspectoSanguinolentoOtorrea,

                'asosiadaOtorreaInfeccionRespiratoriaAlta': responseForm.asosiadaOtorreaInfeccionRespiratoriaAlta,

                'asosiadaotorreaInfeccionAgudaOido': responseForm.asosiadaotorreaInfeccionAgudaOido,

                'presentoOtalgia': responseForm.presentoOtalgia,

                'presentoOtalgiaBilateral': responseForm.presentoOtalgiaBilateral,

                'presentoOtalgiaOidoDerecho': responseForm.presentoOtalgiaOidoDerecho,

                'presentoOtalgiaOidoIzquierdo': responseForm.presentoOtalgiaOidoIzquierdo,

                'presentoSensacionOidoTapado': responseForm.presentoSensacionOidoTapado,

                'presentoSensacionOidoTapadoBilateral': responseForm.presentoSensacionOidoTapadoBilateral,

                'presentoSensacionOidoTapadoOidoDerecho': responseForm.presentoSensacionOidoTapadoOidoDerecho,

                'presentoSensacionOidoTapadoOidoIzquierdo': responseForm.presentoSensacionOidoTapadoOidoIzquierdo,

                'presentoAutofonia': responseForm.presentoAutofonia,

                'presentoAutofoniaBilateral': responseForm.presentoAutofoniaBilateral,

                'presentoAutofoniaOidoDerecho': responseForm.presentoAutofoniaOidoDerecho,

                'presentoAutofoniaOidoIzquierdo': responseForm.presentoAutofoniaOidoIzquierdo,

                'presentoOtorrea': responseForm.presentoOtorrea,

                'presentoOtorreaBilateral': responseForm.presentoOtorreaBilateral,

                'presentoOtorreaOidoDerecho': responseForm.presentoOtorreaOidoDerecho,

                'presentoOtorreaOidoIzquierdo': responseForm.presentoOtorreaOidoIzquierdo,

                'aumentaVolumenTV': responseForm.aumentaVolumenTV,

                'sensacionPercibirTinnitus': responseForm.sensacionPercibirTinnitus,

                'expuestoRuidosFuertes': responseForm.expuestoRuidosFuertes,

                'dificultadOidVozBaja': responseForm.dificultadOidVozBaja,

                'hablaMasFuerteOMasDespacio': responseForm.hablaMasFuerteOMasDespacio,

                'utilizaAyudaAuditiva': responseForm.utilizaAyudaAuditiva,

                'percibeSonidoIgualAmbosOidos': responseForm.percibeSonidoIgualAmbosOidos,

                'conQueOidoEscuchaMejor': responseForm.conQueOidoEscuchaMejor,

                'haceCuantoTiempoPresentaSintomasAuditivos': responseForm.haceCuantoTiempoPresentaSintomasAuditivos,

                'faltaEquilibrioCaminar': responseForm.faltaEquilibrioCaminar,

                'mareos': responseForm.mareos,

                'cuandoMareos': responseForm.cuandoMareos,

                'vertigo': responseForm.vertigo,

                'palpacionPabellonOidoDerecho': responseForm.palpacionPabellonOidoDerecho,

                'palpacionMastoidesOidoDerecho': responseForm.palpacionMastoidesOidoDerecho,

                'caeOidoDerecho': responseForm.caeOidoDerecho,

                'obstruccionOidoDerecho': responseForm.obstruccionOidoDerecho,

                'aparienciaMenbranaTimpanicaOidoDerecho': responseForm.aparienciaMenbranaTimpanicaOidoDerecho,

                'perforacionOidoDerecho': responseForm.perforacionOidoDerecho,

                'burbujaOidoDerecho': responseForm.burbujaOidoDerecho,

                'coloracionOidoDerecho': responseForm.coloracionOidoDerecho,

                'palpacionPabellonOidoIzquierdo': responseForm.palpacionPabellonOidoIzquierdo,

                'palpacionMastoidesOidoIzquierdo': responseForm.palpacionMastoidesOidoIzquierdo,

                'perforacionOidoIzquierdo': responseForm.perforacionOidoIzquierdo,

                'burbujaOidoIzquierdo': responseForm.burbujaOidoIzquierdo,

                'coloracionOidoIzquierdo': responseForm.coloracionOidoIzquierdo,

                'atenidoPerdidaAudicionPasado': responseForm.atenidoPerdidaAudicionPasado,
                'obstruccionOidoIzquierdo': responseForm.obstruccionOidoIzquierdo,
                'aparienciaMenbranaTimpanicaOidoIzquierdo': responseForm.aparienciaMenbranaTimpanicaOidoIzquierdo,
                'caeOidoIzquierdo': responseForm.caeOidoIzquierdo,
                'especficarAyudaAuditiva': responseForm.especficarAyudaAuditiva,
                'trastornoRecepcionLenguaje': responseForm.trastornoRecepcionLenguaje,
            }
            await fichaFonoaudiologiaActualizar(fichaData.id, response, message);
            message.success(t('fichaFonoaudiologiaActualizada'));
        } catch (error) {
            message.error(t('errorActualizarFichaFonoaudiologia') + error);
        } finally {
            setLoading(false);
        }
    };
    const handleDownload = async () => {
        try {
            const response = await fonoaudiologiaPDF(fichaData.id, message);

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
            const response = await fonoaudiologiaPDF(fichaData.id, message);


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
                    <Card.Meta title={<h1>{t('FichaFonoaudiologia')}</h1>} />
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

    if (!user) return <MenuWrapper setLang={true} >
        <Spin />
    </MenuWrapper>
    return (
        <MenuWrapper setLang={true}>
            <BreadCrumbPacientes idPaciente={ficha.paciente.id} page={t('FichaFonoaudiologia')} />
            <Card>
                <Card.Meta title={
                    <Row justify={'space-between'}>
                        <Col >
                            <h1>{t('FichaFonoaudiologia')}</h1>
                        </Col>
                        <Col  >

                            <Row justify={{ xs: 'start', sm: 'start', md: 'end' }}>
                                <Col>
                                    <Button onClick={handleDownload} style={{ color: "#fff", backgroundColor: "#28a745" }}>
                                        <DownCircleOutlined />
                                        {t('descargarFichaFonoaudiologia')}
                                    </Button></Col>
                                <Col>
                                    <Button onClick={handleOpenPDF} style={{ color: "#fff", backgroundColor: "#17a2b8" }}>
                                        <FilePdfOutlined />
                                        {t('abrirFichaFonoaudiologia')}
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>} />
                <Form form={form} disabled={!user?.permisos?.fonoAudiologia} layout="vertical" onFinish={onFinish}>

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

                    <Divider orientation='left'><h2>{t('CaracteristicasHablaLenguaje')}</h2></Divider>


                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('DificultadPronunciarPalabras')} name="dificultadPronunciarPalabras">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('SeTrabaCuandoHabla')} name="seTrabaCuandoHabla">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('SeEntiendeLoQueDice')} name="seEntiendeLoQueDice">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('SabeComoLlamanObjetosEntorno')} name="sabeComoLlamanObjetosEntorno">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('ComprendeLoQueSeLeDice')} name="comprendeLoQueSeLeDice">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('ReconoceFuenteSonora')} name="reconoceFuenteSonora">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('ComunicacionPreferentementeForma')} name="comunicacionPreferentementeForma">
                                <Select >
                                    <Select.Option value="VERBAL">{t('Verbal')}</Select.Option>
                                    <Select.Option value="GESTUAL">{t('Gestual')}</Select.Option>
                                    <Select.Option value="MIXTA">{t('Mixta')}</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('SeARealizadoExamenAudiologico')} name="seARealizadoExamenAudiologico">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>

                    <h3>{t('DiagnosticoAudiologico')}</h3>


                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('PerdidaAuditivaConductivaNeurosensorial')} name="perdidaAuditivaConductivaNeurosensorial">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('HipoacusiaConductivaBilateral')} name="hipoacusiaConductivaBilateral">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('HipoacusiaConductivaUnilateral')} name="hipoacusiaConductivaUnilateral">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('HipoacusiaNeurosensorialBilateral')} name="hipoacusiaNeurosensorialBilateral">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('HipoacusiaNeurosensorialUnilateral')} name="hipoacusiaNeurosensorialUnilateral">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>

                    <h3>{t('DiagnosticoFonoaudiologicoPrevio')}</h3>


                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('TrastornoEspecificoPronunciacion')} name="trastornoEspecificoPronunciacion">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('TrastornoLenguajeExpresivo')} name="trastornoLenguajeExpresivo">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('trastornoRecepcionLenguaje')} name="trastornoRecepcionLenguaje">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('AfasiaAdquiridaEpilepsia')} name="afasiaAdquiridaEpilepsia">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('OtrosTrastornosDesarrolloHabla')} name="otrosTrastornosDesarrolloHabla">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('TrastornoDesarrolloHablaLenguaje')} name="trastornoDesarrolloHablaLenguaje">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('AlteracionesHabla')} name="alteracionesHabla">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('DisfasiaAfasia')} name="disfasiaAfasia">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('DisartriaAnartria')} name="disartriaAnartria">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('OtrasAlteracionesHabla')} name="otrasAlteracionesHabla">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('ATenidoPerdidaAudicionPasado')} name="atenidoPerdidaAudicionPasado">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('InfeccionesOidoFuertes')} name="infeccionesOidoFuertes">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={12}>
                            <Form.Item label={t('CualInfeccionesOidoFuertes')} name="cualInfeccionesOidoFuertes">
                                <Input />
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('EdadInfeccionesOidoFuertes')} name="edadInfeccionesOidoFuertes">
                                <InputNumber />
                            </Form.Item>
                        </Col>
                    </Row>


                    <h3>{t('Fonacion')}</h3>


                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('CreeTonoVozEstudianteApropiado')} name="creeTonoVozEstudianteApropiado">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('RespiracionNormal')} name="respiracionNormal">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={12}>
                            <Form.Item label={t('SituacionesAlteraTonoVoz')} name="situacionesAlteraTonoVoz">
                                <Input />
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={12}>
                            <Form.Item label={t('DesdeCuandoAlteracionesVoz')} name="desdeCuandoAlteracionesVoz">
                                <Input />
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={12}>
                            <Form.Item label={t('TonoDeVoz')} name="tonoDeVoz">
                                <Input />
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={12}>
                            <Form.Item label={t('Respiracion')} name="respiracion">
                                <Input />
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('Ronca')} name="ronca">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('JuegoVocal')} name="juegoVocal">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('Vocalizacion')} name="vocalizacion">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('Balbuceo')} name="balbuceo">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('Silabeo')} name="silabeo">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('PrimerasPalabras')} name="primerasPalabras">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('OracionesDosPalabras')} name="oracionesDosPalabras">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('OracionesTresPalabras')} name="oracionesTresPalabras">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('FormacionLinguisticaCompleta')} name="formacionLinguisticaCompleta">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('NumeroTotalPalabras')} name="numeroTotalPalabras">
                                <InputNumber />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Divider orientation='left'><h2>{t('HistoriaClinicaAudicion')}</h2></Divider>


                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('PerdidaAuditiva')} name="perdidaAuditiva">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('Unilateral')} name="unilateral">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('OidoDerecho')} name="oidoDerecho">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('OidoIzquierdo')} name="oidoIzquierdo">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('Bilateral')} name="bilateral">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('GradoPerdida')} name="gradoPerdida">
                                <Select >
                                    <Select.Option value="SÚBITA">{t('subita')}</Select.Option>
                                    <Select.Option value="PROGRESIVA">{t('progresiva')}</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>





                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('Permanecia')} name="permanecia">
                                <Select >
                                    <Select.Option value="TEMPORAL">{t('Temporal')}</Select.Option>
                                    <Select.Option value="FLUCTUANTE">{t('Fluctuante')}</Select.Option>
                                    <Select.Option value="PERMANENTE">{t('Permanente')}</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>

                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('Otitis')} name="otitis">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>




                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('TipoOtitis')} name="tipoOtitis">
                                <Select >
                                    <Select.Option value="MEDIO">{t('Medio')}</Select.Option>
                                    <Select.Option value="AGUDO">{t('Agudo')}</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>




                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('DuracionOtitisInicio')} name="duracionOtitisInicio">
                                <DatePicker />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('DuracionOtitisFin')} name="duracionOtitisFin">
                                <DatePicker />
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('AntecedentesFamiliaresHistoriaClinicaAudicion')} name="antecedentesFamiliares">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('ExposisionRuidos')} name="exposisionRuidos">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('DuracionExposisionRuidosInicio')} name="duracionExposisionRuidosInicio">
                                <DatePicker />
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('DuracionExposisionRuidosFin')} name="duracionExposisionRuidosFin">
                                <DatePicker />
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('Ototoxicos')} name="ototoxicos">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('Infecciones')} name="infecciones">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('UsoAudifonos')} name="usoAudifonos">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('InicioUsoAudifonos')} name="inicioUsoAudifonos">
                                <DatePicker />
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('FinUsoAudifonos')} name="finUsoAudifonos">
                                <DatePicker />
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('ImplanteCoclear')} name="implanteCoclear">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('TratamientoFonoaudiologicoPrevio')} name="tratamientoFonoaudiologicoPrevio">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('Otalgia')} name="otalgia">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('OtalgiaUnilateral')} name="otalgiaUnilateral">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('OtalgiaOidoDerecho')} name="otalgiaOidoDerecho">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('OtalgiaOidoIzquierdo')} name="otalgiaOidoIzquierdo">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('OtalgiaBilateral')} name="otalgiaBilateral">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('PermanenciaOtalgiaContinua')} name="permanenciaOtalgiaContinua">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('PermanenciaOtalgiaIntermitente')} name="permanenciaOtalgiaIntermitente">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>




                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('GradoPermanenciaOtalgia')} name="gradoPermanenciaOtalgia">
                                <Select >
                                    <Select.Option value="MEDIA">{t('Media')}</Select.Option>
                                    <Select.Option value="AGUDA">{t('Aguda')}</Select.Option>
                                    <Select.Option value="CRÓNICA">{t('Crónica')}</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('AsociadaOtalgiaInfeccionRespiratoriaAlta')} name="asociadaOtalgiaInfeccionRespiratoriaAlta">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('InfeccionRespiratoriaPunzante')} name="infeccionRespiratoriaPunzante">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('InfeccionRespiratoriaPulsatil')} name="infeccionRespiratoriaPulsatil">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('InfeccionRespiratoriaProgresivo')} name="infeccionRespiratoriaProgresivo">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('InfeccionRespiratoriaOpresivo')} name="infeccionRespiratoriaOpresivo">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('Pruriginoso')} name="pruriginoso">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('AumentaMasticar')} name="aumentaMasticar">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('DisminuyeConCalorLocal')} name="disminuyeConCalorLocal">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('AumentaConCalorLocal')} name="aumentaConCalorLocal">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('Otorrea')} name="otorrea">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('OtorreaUnilateral')} name="otorreaUnilateral">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('OtorreaOidoDerecho')} name="otorreaOidoDerecho">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('OtorreaOidoIzquierdo')} name="otorreaOidoIzquierdo">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('OtorreaBilateral')} name="otorreaBilateral">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('PermanenciaOtorreaContinua')} name="permanenciaOtorreaContinua">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('PermanenciaOtorreaIntermitente')} name="permanenciaOtorreaIntermitente">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>




                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('GradoPermanenciaOtorrea')} name="gradoPermanenciaOtorrea">
                                <Select >
                                    <Select.Option value="MEDIA">{t('Media')}</Select.Option>
                                    <Select.Option value="AGUDA">{t('Aguda')}</Select.Option>
                                    <Select.Option value="CRÓNICA">{t('Crónica')}</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('AspectoClaroOtorrea')} name="aspectoClaroOtorrea">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('AspectoSerosoOtorrea')} name="aspectoSerosoOtorrea">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('AspectoMucosoOtorrea')} name="aspectoMucosoOtorrea">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('AspectoMucopurulentoOtorrea')} name="aspectoMucopurulentoOtorrea">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('AspectoPurulentoOtorrea')} name="aspectoPurulentoOtorrea">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('AspectoSanguinolentoOtorrea')} name="aspectoSanguinolentoOtorrea">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('AsosiadaOtorreaInfeccionRespiratoriaAlta')} name="asosiadaOtorreaInfeccionRespiratoriaAlta">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('AsosiadaotorreaInfeccionAgudaOido')} name="asosiadaotorreaInfeccionAgudaOido">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>

                    <h3>{t('AntecedentesAuditivos')}</h3>


                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('PresentoOtalgia')} name="presentoOtalgia">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('PresentoOtalgiaBilateral')} name="presentoOtalgiaBilateral">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('PresentoOtalgiaOidoDerecho')} name="presentoOtalgiaOidoDerecho">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('PresentoOtalgiaOidoIzquierdo')} name="presentoOtalgiaOidoIzquierdo">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('PresentoSensacionOidoTapado')} name="presentoSensacionOidoTapado">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('PresentoSensacionOidoTapadoBilateral')} name="presentoSensacionOidoTapadoBilateral">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('PresentoSensacionOidoTapadoOidoDerecho')} name="presentoSensacionOidoTapadoOidoDerecho">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('PresentoSensacionOidoTapadoOidoIzquierdo')} name="presentoSensacionOidoTapadoOidoIzquierdo">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('PresentoAutofonia')} name="presentoAutofonia">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('PresentoAutofoniaBilateral')} name="presentoAutofoniaBilateral">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('PresentoAutofoniaOidoDerecho')} name="presentoAutofoniaOidoDerecho">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('PresentoAutofoniaOidoIzquierdo')} name="presentoAutofoniaOidoIzquierdo">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('PresentoOtorrea')} name="presentoOtorrea">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('PresentoOtorreaBilateral')} name="presentoOtorreaBilateral">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('PresentoOtorreaOidoDerecho')} name="presentoOtorreaOidoDerecho">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('PresentoOtorreaOidoIzquierdo')} name="presentoOtorreaOidoIzquierdo">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('AumentaVolumenTV')} name="aumentaVolumenTV">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('SensacionPercibirTinnitus')} name="sensacionPercibirTinnitus">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('ExpuestoRuidosFuertes')} name="expuestoRuidosFuertes">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('DificultadOidVozBaja')} name="dificultadOidVozBaja">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('HablaMasFuerteOMasDespacio')} name="hablaMasFuerteOMasDespacio">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('UtilizaAyudaAuditiva')} name="utilizaAyudaAuditiva">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12}>
                            <Form.Item label={t('EspecficarAyudaAuditiva')} name="especficarAyudaAuditiva">
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('PercibeSonidoIgualAmbosOidos')} name="percibeSonidoIgualAmbosOidos">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>




                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('ConQueOidoEscuchaMejor')} name="conQueOidoEscuchaMejor">
                                <Select >
                                    <Select.Option value="AMBOS">{t('Ambos')}</Select.Option>
                                    <Select.Option value="DERECHO">{t('Derecho')}</Select.Option>
                                    <Select.Option value="IZQUIERDO">{t('Izquierdo')}</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>




                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('HaceCuantoTiempoPresentaSintomasAuditivos')} name="haceCuantoTiempoPresentaSintomasAuditivos">
                                <Select >
                                    <Select.Option value="DÍAS">{t('Días')}</Select.Option>
                                    <Select.Option value="SEMANAS">{t('Semanas')}</Select.Option>
                                    <Select.Option value="MESES">{t('Meses')}</Select.Option>
                                    <Select.Option value="AÑOS">{t('Años')}</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <h3>{t('AntecedentesVestibulares')}</h3>


                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('FaltaEquilibrioCaminar')} name="faltaEquilibrioCaminar">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('Mareos')} name="mareos">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>




                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('CuandoMareos')} name="cuandoMareos">
                                <Select >
                                    <Select.Option value="SIEMPRE">{t('Siempre')}</Select.Option>
                                    <Select.Option value="A_VECES">{t('A veces')}</Select.Option>
                                    <Select.Option value="AL_CAMINAR">{t('Al caminar')}</Select.Option>
                                    <Select.Option value="AL_PARARSE">{t('Al pararse')}</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('Vertigo')} name="vertigo">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>

                    <h3>{t('DescripcionOtoscopiaOidoDerecho')}</h3>




                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('PalpacionPabellonOidoDerecho')} name="palpacionPabellonOidoDerecho">
                                <Select >
                                    <Select.Option value="NORMAL">{t('Normal')}</Select.Option>
                                    <Select.Option value="DOLOR">{t('Dolor')}</Select.Option>
                                    <Select.Option value="INFLAMADA">{t('Inflamada')}</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>





                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('PalpacionMastoidesOidoDerecho')} name="palpacionMastoidesOidoDerecho">
                                <Select >
                                    <Select.Option value="NORMAL">{t('Normal')}</Select.Option>
                                    <Select.Option value="DOLOR">{t('Dolor')}</Select.Option>
                                    <Select.Option value="INFLAMADA">{t('Inflamada')}</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>





                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('CAEOidoDerecho')} name="caeOidoDerecho">
                                <Select >
                                    <Select.Option value="NORMAL">{t('Normal')}</Select.Option>
                                    <Select.Option value="IRRITADO">{t('Irritado')}</Select.Option>
                                    <Select.Option value="SUPURACION">{t('Supuración')}</Select.Option>
                                    <Select.Option value="INFLAMADO">{t('Inflamado')}</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>





                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('ObstruccionOidoDerecho')} name="obstruccionOidoDerecho">
                                <Select >
                                    <Select.Option value="SI">{t('Si')}</Select.Option>
                                    <Select.Option value="NO">{t('No')}</Select.Option>
                                    <Select.Option value="TOTAL">{t('Total')}</Select.Option>
                                    <Select.Option value="PARCIAL">{t('Parcial')}</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <h3>{t('MembranaTimpatica')}</h3>




                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('AparienciaMenbranaTimpanicaOidoDerecho')} name="aparienciaMenbranaTimpanicaOidoDerecho">
                                <Select >
                                    <Select.Option value="NORMAL">{t('Normal')}</Select.Option>
                                    <Select.Option value="IRRITADO">{t('Irritado')}</Select.Option>
                                    <Select.Option value="SUPURACION">{t('Supuración')}</Select.Option>
                                    <Select.Option value="INFLAMADA">{t('Inflamada')}</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('PerforacionOidoDerecho')} name="perforacionOidoDerecho">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('BurbujaOidoDerecho')} name="burbujaOidoDerecho">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>





                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('ColoracionOidoDerecho')} name="coloracionOidoDerecho">
                                <Select >
                                    <Select.Option value="NORMAL">{t('Normal')}</Select.Option>
                                    <Select.Option value="AZUL">{t('Azul')}</Select.Option>
                                    <Select.Option value="ERITEMATOSA">{t('Eritematosa')}</Select.Option>
                                    <Select.Option value="OPACA">{t('Opaca')}</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <h3>{t('DescripcionOtoscopiaOidoIzquierdo')}</h3>




                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('PalpacionPabellonOidoIzquierdo')} name="palpacionPabellonOidoIzquierdo">
                                <Select >
                                    <Select.Option value="NORMAL">{t('Normal')}</Select.Option>
                                    <Select.Option value="DOLOR">{t('Dolor')}</Select.Option>
                                    <Select.Option value="INFLAMADA">{t('Inflamada')}</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>




                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('PalpacionMastoidesOidoIzquierdo')} name="palpacionMastoidesOidoIzquierdo">
                                <Select >
                                    <Select.Option value="NORMAL">{t('Normal')}</Select.Option>
                                    <Select.Option value="DOLOR">{t('Dolor')}</Select.Option>
                                    <Select.Option value="INFLAMADA">{t('Inflamada')}</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>




                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('CAEOidoIzquierdo')} name="caeOidoIzquierdo">
                                <Select >
                                    <Select.Option value="NORMAL">{t('Normal')}</Select.Option>
                                    <Select.Option value="IRRITADO">{t('Irritado')}</Select.Option>
                                    <Select.Option value="SUPURACION">{t('Supuración')}</Select.Option>
                                    <Select.Option value="INFLAMADO">{t('Inflamado')}</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>




                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('ObstruccionOidoIzquierdo')} name="obstruccionOidoIzquierdo">
                                <Select >
                                    <Select.Option value="SI">{t('Si')}</Select.Option>
                                    <Select.Option value="NO">{t('No')}</Select.Option>
                                    <Select.Option value="TOTAL">{t('Total')}</Select.Option>
                                    <Select.Option value="PARCIAL">{t('Parcial')}</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <h3>{t('MembranaTimpatica')}</h3>




                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('AparienciaMenbranaTimpanicaOidoIzquierdo')} name="aparienciaMenbranaTimpanicaOidoIzquierdo">
                                <Select >
                                    <Select.Option value="NORMAL">{t('Normal')}</Select.Option>
                                    <Select.Option value="IRRITADO">{t('Irritado')}</Select.Option>
                                    <Select.Option value="SUPURACION">{t('Supuración')}</Select.Option>
                                    <Select.Option value="INFLAMADA">{t('Inflamada')}</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('PerforacionOidoIzquierdo')} name="perforacionOidoIzquierdo">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('BurbujaOidoIzquierdo')} name="burbujaOidoIzquierdo">
                                <Radio.Group >
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>




                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('ColoracionOidoIzquierdo')} name="coloracionOidoIzquierdo">
                                <Select >
                                    <Select.Option value="NORMAL">{t('Normal')}</Select.Option>
                                    <Select.Option value="AZUL">{t('Azul')}</Select.Option>
                                    <Select.Option value="ERITEMATOSA">{t('Eritematosa')}</Select.Option>
                                    <Select.Option value="OPACA">{t('Opaca')}</Select.Option>
                                </Select>
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
        const res = await fichaFonoaudiologiaById(context.params.id);
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
