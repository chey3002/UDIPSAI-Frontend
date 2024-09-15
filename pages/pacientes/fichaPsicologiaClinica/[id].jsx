import MenuWrapper from '@/components/sidebar';
import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, DatePicker, Select, InputNumber, Radio, Divider, Upload, message, Checkbox, Row, Col, Image, Spin } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import BreadCrumbPacientes from '@/components/commons/breadCrumPaciente';
import dayjs from 'dayjs';
import { DownCircleOutlined, FilePdfOutlined } from '@ant-design/icons';
import { fichaPsicologiaClinicaActualizar, fichaPsicologiaClinicaById, psicologiaClinicaPDF } from '@/utils/apiRequests';
const { Option } = Select;
const { TextArea } = Input;
import { useUserContext } from '@/assets/useUserContext';

export default function EditarFichaPsicologiaClinica({ ficha }) {
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

                'anamnesisFamiliar': fichaData.anamnesisFamiliar,
                'personal': fichaData.personal,
                'momentosEvolutivosEnElDesarrollo': fichaData.momentosEvolutivosEnElDesarrollo,
                'habitosEnLaOralidad': fichaData.habitosEnLaOralidad,
                'inicioHorarioDeSuenio': fichaData.inicioHorarioDeSuenio,
                'finHorarioDeSuenio': fichaData.finHorarioDeSuenio,
                'tipoHorarioDeSuenio': fichaData.tipoHorarioDeSuenio ? fichaData.tipoHorarioDeSuenio : 'NOCTURNO',
                'companiaSuenio': fichaData.companiaSuenio ? fichaData.companiaSuenio : 'SOLO',
                'especificarCompaniaSuenio': fichaData.especificarCompaniaSuenio,
                'edad': fichaData.edad,
                'hipersomnia': fichaData.hipersomnia ? fichaData.hipersomnia : false,
                'dificultadDeConciliarElSuenio': fichaData.dificultadDeConciliarElSuenio ? fichaData.dificultadDeConciliarElSuenio : false,
                'despertarFrecuente': fichaData.despertarFrecuente ? fichaData.despertarFrecuente : false,
                'despertarPrematuro': fichaData.despertarPrematuro ? fichaData.despertarPrematuro : false,
                'sonambulismo': fichaData.sonambulismo ? fichaData.sonambulismo : false,
                'observacionesHabitosDeSuenio': fichaData.observacionesHabitosDeSuenio,
                'temores': fichaData.temores ? fichaData.temores : false,
                'destructividad': fichaData.destructividad ? fichaData.destructividad : false,
                'nerviosismo': fichaData.nerviosismo ? fichaData.nerviosismo : false,
                'irritabilidad': fichaData.irritabilidad ? fichaData.irritabilidad : false,
                'egocentrismo': fichaData.egocentrismo ? fichaData.egocentrismo : false,
                'regresiones': fichaData.regresiones ? fichaData.regresiones : false,
                'tics': fichaData.tics ? fichaData.tics : false,
                'hurto': fichaData.hurto ? fichaData.hurto : false,
                'mentira': fichaData.mentira ? fichaData.mentira : false,
                'cuidadoPersonal': fichaData.cuidadoPersonal ? fichaData.cuidadoPersonal : false,
                'otrosConductasPreocupantes': fichaData.otrosConductasPreocupantes,
                'observacionesConductasPreocupantes': fichaData.observacionesConductasPreocupantes,
                'sexoDeNacimiento': fichaData.sexoDeNacimiento ? fichaData.sexoDeNacimiento : 'MASCULINO',
                'genero': fichaData.genero ? fichaData.genero : 'MASCULINO',
                'especificarGeneroOtros': fichaData.especificarGeneroOtros,
                'orientacionSexual': fichaData.orientacionSexual ? fichaData.orientacionSexual : 'HETEROSEXUAL',
                'curiosidadSexual': fichaData.curiosidadSexual ? fichaData.curiosidadSexual : 'AUSENTE',
                'gradoDeInformacion': fichaData.gradoDeInformacion ? fichaData.gradoDeInformacion : 'AUSENTE',
                'actividadSexual': fichaData.actividadSexual ? fichaData.actividadSexual : 'AUSENTE',
                'masturbacion': fichaData.masturbacion ? fichaData.masturbacion : 'AUSENTE',
                'promiscuidad': fichaData.promiscuidad ? fichaData.promiscuidad : 'AUSENTE',
                'disfunciones': fichaData.disfunciones ? fichaData.disfunciones : 'AUSENTE',
                'erotismo': fichaData.erotismo ? fichaData.erotismo : 'AUSENTE',
                'parafilias': fichaData.parafilias ? fichaData.parafilias : 'AUSENTE',
                'observacionesAspectoPsicosexual': fichaData.observacionesAspectoPsicosexual,
                'palabrasRaras': fichaData.palabrasRaras ? fichaData.palabrasRaras : false,
                'logicoYClaro': fichaData.logicoYClaro ? fichaData.logicoYClaro : false,
                'vozMonotona': fichaData.vozMonotona ? fichaData.vozMonotona : false,
                'malHablado': fichaData.malHablado ? fichaData.malHablado : false,
                'lentoYTeatral': fichaData.lentoYTeatral ? fichaData.lentoYTeatral : false,
                'pesimista': fichaData.pesimista ? fichaData.pesimista : false,
                'hiriente': fichaData.hiriente ? fichaData.hiriente : false,
                'charlatan': fichaData.charlatan ? fichaData.charlatan : false,
                'incoherente': fichaData.incoherente ? fichaData.incoherente : false,
                'verborrea': fichaData.verborrea ? fichaData.verborrea : false,
                'abatimiento': fichaData.abatimiento ? fichaData.abatimiento : false,
                'tension': fichaData.tension ? fichaData.tension : false,
                'perplejidad': fichaData.perplejidad ? fichaData.perplejidad : false,
                'suspicacia': fichaData.suspicacia ? fichaData.suspicacia : false,
                'enfado': fichaData.enfado ? fichaData.enfado : false,
                'preocupacion': fichaData.preocupacion ? fichaData.preocupacion : false,
                'obscenidad': fichaData.obscenidad ? fichaData.obscenidad : false,
                'disartria': fichaData.disartria ? fichaData.disartria : false,
                'afasiaExpresiva': fichaData.afasiaExpresiva ? fichaData.afasiaExpresiva : false,
                'afasiaReceptiva': fichaData.afasiaReceptiva ? fichaData.afasiaReceptiva : false,
                'afasiaAnomica': fichaData.afasiaAnomica ? fichaData.afasiaAnomica : false,
                'afasiaGlobal': fichaData.afasiaGlobal ? fichaData.afasiaGlobal : false,
                'ecolalia': fichaData.ecolalia ? fichaData.ecolalia : false,
                'palilalia': fichaData.palilalia ? fichaData.palilalia : false,
                'ensimismamiento': fichaData.ensimismamiento ? fichaData.ensimismamiento : false,
                'hayQueGuiarlo': fichaData.hayQueGuiarlo ? fichaData.hayQueGuiarlo : false,
                'molestoso': fichaData.molestoso ? fichaData.molestoso : false,
                'lento': fichaData.lento ? fichaData.lento : false,
                'noDeseaHacerNada': fichaData.noDeseaHacerNada ? fichaData.noDeseaHacerNada : false,
                'haceCosasExtranas': fichaData.haceCosasExtranas ? fichaData.haceCosasExtranas : false,
                'aislado': fichaData.aislado ? fichaData.aislado : false,
                'participaEnGrupos': fichaData.participaEnGrupos ? fichaData.participaEnGrupos : false,
                'esViolento': fichaData.esViolento ? fichaData.esViolento : false,
                'callado': fichaData.callado ? fichaData.callado : false,
                'amigableYCooperador': fichaData.amigableYCooperador ? fichaData.amigableYCooperador : false,
                'adaptable': fichaData.adaptable ? fichaData.adaptable : false,
                'inquieto': fichaData.inquieto ? fichaData.inquieto : false,
                'nervioso': fichaData.nervioso ? fichaData.nervioso : false,
                'tieneAmigosIntimos': fichaData.tieneAmigosIntimos ? fichaData.tieneAmigosIntimos : false,
                'confuso': fichaData.confuso ? fichaData.confuso : false,
                'centradoEnSiMismo': fichaData.centradoEnSiMismo ? fichaData.centradoEnSiMismo : false,
                'olvidadizo': fichaData.olvidadizo ? fichaData.olvidadizo : false,
                'piensaYRespondeBien': fichaData.piensaYRespondeBien ? fichaData.piensaYRespondeBien : false,
                'pocosPensamientos': fichaData.pocosPensamientos ? fichaData.pocosPensamientos : false,
                'noVeLosErrores': fichaData.noVeLosErrores ? fichaData.noVeLosErrores : false,
                'actuaInfaltilmente': fichaData.actuaInfaltilmente ? fichaData.actuaInfaltilmente : false,
                'desconfia': fichaData.desconfia ? fichaData.desconfia : false,
                'hosco': fichaData.hosco ? fichaData.hosco : false,
                'fastidiado': fichaData.fastidiado ? fichaData.fastidiado : false,
                'cansado': fichaData.cansado ? fichaData.cansado : false,
                'visteRaramente': fichaData.visteRaramente ? fichaData.visteRaramente : false,
                'desordenado': fichaData.desordenado ? fichaData.desordenado : false,
                'mugrosoYFachoso': fichaData.mugrosoYFachoso ? fichaData.mugrosoYFachoso : false,
                'excesoDeRopas': fichaData.excesoDeRopas ? fichaData.excesoDeRopas : false,
                'dramaticoYTeatral': fichaData.dramaticoYTeatral ? fichaData.dramaticoYTeatral : false,
                'visteNormalmente': fichaData.visteNormalmente ? fichaData.visteNormalmente : false,
                'impecable': fichaData.impecable ? fichaData.impecable : false,
                'dudaDeTodos': fichaData.dudaDeTodos ? fichaData.dudaDeTodos : false,
                'pasaAislado': fichaData.pasaAislado ? fichaData.pasaAislado : false,
                'diceEstarBien': fichaData.diceEstarBien ? fichaData.diceEstarBien : false,
                'gustaDeHacerDanoALosDemas': fichaData.gustaDeHacerDanoALosDemas ? fichaData.gustaDeHacerDanoALosDemas : false,
                'tieneIniciativas': fichaData.tieneIniciativas ? fichaData.tieneIniciativas : false,
                'colabora': fichaData.colabora ? fichaData.colabora : false,
                'reticencia': fichaData.reticencia ? fichaData.reticencia : false,
                'rechazo': fichaData.rechazo ? fichaData.rechazo : false,
                'mutismo': fichaData.mutismo ? fichaData.mutismo : false,
                'negativismo': fichaData.negativismo ? fichaData.negativismo : false,
                'agresividad': fichaData.agresividad ? fichaData.agresividad : false,
                'sarcasmo': fichaData.sarcasmo ? fichaData.sarcasmo : false,
                'pegajosidad': fichaData.pegajosidad ? fichaData.pegajosidad : false,
                'colaboracionExcesiva': fichaData.colaboracionExcesiva ? fichaData.colaboracionExcesiva : false,
                'atento': fichaData.atento ? fichaData.atento : false,
                'seductor': fichaData.seductor ? fichaData.seductor : false,
                'evitaConversar': fichaData.evitaConversar ? fichaData.evitaConversar : false,
                'impulsivo': fichaData.impulsivo ? fichaData.impulsivo : false,
                'bromista': fichaData.bromista ? fichaData.bromista : false,
                'toscoYDescortes': fichaData.toscoYDescortes ? fichaData.toscoYDescortes : false,
                'triste': fichaData.triste ? fichaData.triste : false,
                'irritable': fichaData.irritable ? fichaData.irritable : false,
                'popensoARinias': fichaData.popensoARinias ? fichaData.popensoARinias : false,
                'suaveYAfable': fichaData.suaveYAfable ? fichaData.suaveYAfable : false,
                'indiferente': fichaData.indiferente ? fichaData.indiferente : false,
                'preocupadoYPensativo': fichaData.preocupadoYPensativo ? fichaData.preocupadoYPensativo : false,
                'tendenciaAlLlanto': fichaData.tendenciaAlLlanto ? fichaData.tendenciaAlLlanto : false,
                'alegre': fichaData.alegre ? fichaData.alegre : false,
                'euforico': fichaData.euforico ? fichaData.euforico : false,
                'labilDeHumor': fichaData.labilDeHumor ? fichaData.labilDeHumor : false,
                'inactivo': fichaData.inactivo ? fichaData.inactivo : false,
                'perezoso': fichaData.perezoso ? fichaData.perezoso : false,
                'soloHaceCosasIndispensables': fichaData.soloHaceCosasIndispensables ? fichaData.soloHaceCosasIndispensables : false,
                'realizaSoloUnTipoDeTrabajo': fichaData.realizaSoloUnTipoDeTrabajo ? fichaData.realizaSoloUnTipoDeTrabajo : false,
                'dedicadoAVariasActividades': fichaData.dedicadoAVariasActividades ? fichaData.dedicadoAVariasActividades : false,
                'apraxia': fichaData.apraxia ? fichaData.apraxia : false,
                'catatonia': fichaData.catatonia ? fichaData.catatonia : false,
                'agitacion': fichaData.agitacion ? fichaData.agitacion : false,
                'amaneramiento': fichaData.amaneramiento ? fichaData.amaneramiento : false,
                'estereotipias': fichaData.estereotipias ? fichaData.estereotipias : false,
                'ecopraxia': fichaData.ecopraxia ? fichaData.ecopraxia : false,
                'obedienciaAutomatica': fichaData.obedienciaAutomatica ? fichaData.obedienciaAutomatica : false,
                'negativismoActividades': fichaData.negativismoActividades ? fichaData.negativismoActividades : false,
                'interceptacionMotriz': fichaData.interceptacionMotriz ? fichaData.interceptacionMotriz : false,
                'dispraxias': fichaData.dispraxias ? fichaData.dispraxias : false,
                'actosImpulsivos': fichaData.actosImpulsivos ? fichaData.actosImpulsivos : false,
                'actosObsesivos': fichaData.actosObsesivos ? fichaData.actosObsesivos : false,
                'ticsActividades': fichaData.ticsActividades ? fichaData.ticsActividades : false,
                'liderazgo': fichaData.liderazgo ? fichaData.liderazgo : false,
                'sociabilidad': fichaData.sociabilidad ? fichaData.sociabilidad : false,
                'responsabilidad': fichaData.responsabilidad ? fichaData.responsabilidad : false,
                'toleranciaNormal': fichaData.toleranciaNormal ? fichaData.toleranciaNormal : false,
                'baja': fichaData.baja ? fichaData.baja : false,
                'colaboracion': fichaData.colaboracion ? fichaData.colaboracion : false,
                'inquietud': fichaData.inquietud ? fichaData.inquietud : false,
                'acataOrdenesVerbales': fichaData.acataOrdenesVerbales ? fichaData.acataOrdenesVerbales : false,
                'agresivo': fichaData.agresivo ? fichaData.agresivo : false,
                'extravagante': fichaData.extravagante ? fichaData.extravagante : false,
                'antisocial': fichaData.antisocial ? fichaData.antisocial : false,
                'impulsivoComportamiento': fichaData.impulsivoComportamiento ? fichaData.impulsivoComportamiento : false,
                'reflexivo': fichaData.reflexivo ? fichaData.reflexivo : false,
                'pasivo': fichaData.pasivo ? fichaData.pasivo : false,
                'apatico': fichaData.apatico ? fichaData.apatico : false,
                'dependiente': fichaData.dependiente ? fichaData.dependiente : false,
                'dominante': fichaData.dominante ? fichaData.dominante : false,
                'cauteloso': fichaData.cauteloso ? fichaData.cauteloso : false,
                'quejoso': fichaData.quejoso ? fichaData.quejoso : false,
                'temeroso': fichaData.temeroso ? fichaData.temeroso : false,
                'teatral': fichaData.teatral ? fichaData.teatral : false,
                'ritualista': fichaData.ritualista ? fichaData.ritualista : false,
                'aislamiento': fichaData.aislamiento ? fichaData.aislamiento : false,
                'ataquesDePanico': fichaData.ataquesDePanico ? fichaData.ataquesDePanico : false,
                'incapacidadDeRealizacionDeActividadesProductivas': fichaData.incapacidadDeRealizacionDeActividadesProductivas ? fichaData.incapacidadDeRealizacionDeActividadesProductivas : false,
                'riesgoPotencialOPotencialSuicida': fichaData.riesgoPotencialOPotencialSuicida ? fichaData.riesgoPotencialOPotencialSuicida : false,
                'inhibicion': fichaData.inhibicion ? fichaData.inhibicion : false,
                'apatia': fichaData.apatia ? fichaData.apatia : false,
                'humorVariable': fichaData.humorVariable ? fichaData.humorVariable : false,
                'altaSensibilidad': fichaData.altaSensibilidad ? fichaData.altaSensibilidad : false,
                'agresividadAfectividad': fichaData.agresividadAfectividad ? fichaData.agresividadAfectividad : false,
                'sumision': fichaData.sumision ? fichaData.sumision : false,
                'rabietas': fichaData.rabietas ? fichaData.rabietas : false,
                'solidaridad': fichaData.solidaridad ? fichaData.solidaridad : false,
                'generosidad': fichaData.generosidad ? fichaData.generosidad : false,
                'afectuoso': fichaData.afectuoso ? fichaData.afectuoso : false,
                'angustia': fichaData.angustia ? fichaData.angustia : false,
                'ansiedadSituacional': fichaData.ansiedadSituacional ? fichaData.ansiedadSituacional : false,
                'timidez': fichaData.timidez ? fichaData.timidez : false,
                'ansiedadExpectante': fichaData.ansiedadExpectante ? fichaData.ansiedadExpectante : false,
                'depresion': fichaData.depresion ? fichaData.depresion : false,
                'perdidaRecienteDeInteres': fichaData.perdidaRecienteDeInteres ? fichaData.perdidaRecienteDeInteres : false,
                'desesperacion': fichaData.desesperacion ? fichaData.desesperacion : false,
                'euforia': fichaData.euforia ? fichaData.euforia : false,
                'indiferencia': fichaData.indiferencia ? fichaData.indiferencia : false,
                'aplanamiento': fichaData.aplanamiento ? fichaData.aplanamiento : false,
                'ambivalencia': fichaData.ambivalencia ? fichaData.ambivalencia : false,
                'irritabilidadAfectividad': fichaData.irritabilidadAfectividad ? fichaData.irritabilidadAfectividad : false,
                'labilidad': fichaData.labilidad ? fichaData.labilidad : false,
                'tenacidad': fichaData.tenacidad ? fichaData.tenacidad : false,
                'incontinencia': fichaData.incontinencia ? fichaData.incontinencia : false,
                'sentimientosInadecuados': fichaData.sentimientosInadecuados ? fichaData.sentimientosInadecuados : false,
                'neotimia': fichaData.neotimia ? fichaData.neotimia : false,
                'disociacionIdeoAfectiva': fichaData.disociacionIdeoAfectiva ? fichaData.disociacionIdeoAfectiva : false,
                'anhedonia': fichaData.anhedonia ? fichaData.anhedonia : false,
                'observacionesGuiaDeObservacion': fichaData.observacionesGuiaDeObservacion,
                'lucidez': fichaData.lucidez ? fichaData.lucidez : false,
                'obnubilacion': fichaData.obnubilacion ? fichaData.obnubilacion : false,
                'estupor': fichaData.estupor ? fichaData.estupor : false,
                'coma': fichaData.coma ? fichaData.coma : false,
                'hipervigilancia': fichaData.hipervigilancia ? fichaData.hipervigilancia : false,
                'confusion': fichaData.confusion ? fichaData.confusion : false,
                'estadoCrepuscular': fichaData.estadoCrepuscular ? fichaData.estadoCrepuscular : false,
                'onirismo': fichaData.onirismo ? fichaData.onirismo : false,
                'sonambulismoEstadoDeConciencia': fichaData.sonambulismoEstadoDeConciencia ? fichaData.sonambulismoEstadoDeConciencia : false,
                'hipercepcion': fichaData.hipercepcion ? fichaData.hipercepcion : false,
                'hipoprosexia': fichaData.hipoprosexia ? fichaData.hipoprosexia : false,
                'disprosexia': fichaData.disprosexia ? fichaData.disprosexia : false,
                'distraibilidad': fichaData.distraibilidad ? fichaData.distraibilidad : false,
                'sinAlteracion': fichaData.sinAlteracion ? fichaData.sinAlteracion : false,
                'hipercepcionSensopercepcion': fichaData.hipercepcionSensopercepcion ? fichaData.hipercepcionSensopercepcion : false,
                'ilusiones': fichaData.ilusiones ? fichaData.ilusiones : false,
                'seudoalucionciones': fichaData.seudoalucionciones ? fichaData.seudoalucionciones : false,
                'alusinosis': fichaData.alusinosis ? fichaData.alusinosis : false,
                'macropsias': fichaData.macropsias ? fichaData.macropsias : false,
                'micropsias': fichaData.micropsias ? fichaData.micropsias : false,
                'noPresenta': fichaData.noPresenta ? fichaData.noPresenta : false,
                'alucinaiones': fichaData.alucinaiones ? fichaData.alucinaiones : false,
                'hipermnecia': fichaData.hipermnecia ? fichaData.hipermnecia : false,
                'amnesiaDeFijacion': fichaData.amnesiaDeFijacion ? fichaData.amnesiaDeFijacion : false,
                'amnesiaDeEvocacion': fichaData.amnesiaDeEvocacion ? fichaData.amnesiaDeEvocacion : false,
                'mixta': fichaData.mixta ? fichaData.mixta : false,
                'lacunar': fichaData.lacunar ? fichaData.lacunar : false,
                'dismensia': fichaData.dismensia ? fichaData.dismensia : false,
                'paramnesias': fichaData.paramnesias ? fichaData.paramnesias : false,
                'sinAlteracionMemoria': fichaData.sinAlteracionMemoria ? fichaData.sinAlteracionMemoria : false,
                'enlentecimiento': fichaData.enlentecimiento ? fichaData.enlentecimiento : false,
                'excitacionPsicomotriz': fichaData.excitacionPsicomotriz ? fichaData.excitacionPsicomotriz : false,
                'catatoniaConductaMotora': fichaData.catatoniaConductaMotora ? fichaData.catatoniaConductaMotora : false,
                'actitudesAnormales': fichaData.actitudesAnormales ? fichaData.actitudesAnormales : false,
                'alteracionesDeLaMarcha': fichaData.alteracionesDeLaMarcha ? fichaData.alteracionesDeLaMarcha : false,
                'inquietudConductaMotora': fichaData.inquietudConductaMotora ? fichaData.inquietudConductaMotora : false,
                'incoherencia': fichaData.incoherencia ? fichaData.incoherencia : 'AUSENTE',
                'bloqueos': fichaData.bloqueos ? fichaData.bloqueos : 'AUSENTE',
                'preservacion': fichaData.preservacion ? fichaData.preservacion : 'AUSENTE',
                'prolijidad': fichaData.prolijidad ? fichaData.prolijidad : 'AUSENTE',
                'desgragacion': fichaData.desgragacion ? fichaData.desgragacion : 'AUSENTE',
                'estereotipiasEstructuraDelPensamiento': fichaData.estereotipiasEstructuraDelPensamiento ? fichaData.estereotipiasEstructuraDelPensamiento : 'AUSENTE',
                'neologismos': fichaData.neologismos ? fichaData.neologismos : 'AUSENTE',
                'musitacion': fichaData.musitacion ? fichaData.musitacion : 'AUSENTE',
                'retardo': fichaData.retardo ? fichaData.retardo : false,
                'aceleracion': fichaData.aceleracion ? fichaData.aceleracion : false,
                'fugaDeIdeas': fichaData.fugaDeIdeas ? fichaData.fugaDeIdeas : false,
                'mutismoCursoDelPensamiento': fichaData.mutismoCursoDelPensamiento ? fichaData.mutismoCursoDelPensamiento : false,
                'grandeza': fichaData.grandeza ? fichaData.grandeza : false,
                'suicidio': fichaData.suicidio ? fichaData.suicidio : false,
                'autocompasion': fichaData.autocompasion ? fichaData.autocompasion : false,
                'inferioridad': fichaData.inferioridad ? fichaData.inferioridad : false,
                'perdidaDeInteres': fichaData.perdidaDeInteres ? fichaData.perdidaDeInteres : false,
                'indecision': fichaData.indecision ? fichaData.indecision : false,
                'necesidadDeAyuda': fichaData.necesidadDeAyuda ? fichaData.necesidadDeAyuda : false,
                'fracaso': fichaData.fracaso ? fichaData.fracaso : false,
                'ruina': fichaData.ruina ? fichaData.ruina : false,
                'autoacusacion': fichaData.autoacusacion ? fichaData.autoacusacion : false,
                'resentimiento': fichaData.resentimiento ? fichaData.resentimiento : false,
                'muerte': fichaData.muerte ? fichaData.muerte : false,
                'danio': fichaData.danio ? fichaData.danio : false,
                'enfermedad': fichaData.enfermedad ? fichaData.enfermedad : false,
                'grave': fichaData.grave ? fichaData.grave : false,
                'hipocondrias': fichaData.hipocondrias ? fichaData.hipocondrias : false,
                'nihilistas': fichaData.nihilistas ? fichaData.nihilistas : false,
                'noTenerSentimientos': fichaData.noTenerSentimientos ? fichaData.noTenerSentimientos : false,
                'elMundoHaDejadoDeExistir': fichaData.elMundoHaDejadoDeExistir ? fichaData.elMundoHaDejadoDeExistir : false,
                'referencia': fichaData.referencia ? fichaData.referencia : false,
                'extravagantes': fichaData.extravagantes ? fichaData.extravagantes : false,
                'fobicas': fichaData.fobicas ? fichaData.fobicas : false,
                'compulsivas': fichaData.compulsivas ? fichaData.compulsivas : false,
                'obsesivas': fichaData.obsesivas ? fichaData.obsesivas : false,
                'desconfianzas': fichaData.desconfianzas ? fichaData.desconfianzas : false,
                'desRelacion': fichaData.desRelacion ? fichaData.desRelacion : false,
                'perdidaDeControl': fichaData.perdidaDeControl ? fichaData.perdidaDeControl : false,
                'serCalumniado': fichaData.serCalumniado ? fichaData.serCalumniado : false,
                'deliriosParanoides': fichaData.deliriosParanoides ? fichaData.deliriosParanoides : false,
                'depresivos': fichaData.depresivos ? fichaData.depresivos : false,
                'misticoReligioso': fichaData.misticoReligioso ? fichaData.misticoReligioso : false,
                'sexuales': fichaData.sexuales ? fichaData.sexuales : false,
                'difusos': fichaData.difusos ? fichaData.difusos : false,
                'otrosContenidoDelPensamiento': fichaData.otrosContenidoDelPensamiento,
                'capacidadDeAutocritica': fichaData.capacidadDeAutocritica ? fichaData.capacidadDeAutocritica : false,
                'heterocritica': fichaData.heterocritica ? fichaData.heterocritica : false,
                'proyectosFuturos': fichaData.proyectosFuturos ? fichaData.proyectosFuturos : false,
                'concienciaDeLaEnfermedad': fichaData.concienciaDeLaEnfermedad ? fichaData.concienciaDeLaEnfermedad : false,
                'desorientacionEnTiempo': fichaData.desorientacionEnTiempo ? fichaData.desorientacionEnTiempo : 'AUSENTE',
                'espacio': fichaData.espacio ? fichaData.espacio : 'AUSENTE',
                'respectoASiMismo': fichaData.respectoASiMismo ? fichaData.respectoASiMismo : 'AUSENTE',
                'respectoAOtrasPersonas': fichaData.respectoAOtrasPersonas ? fichaData.respectoAOtrasPersonas : 'AUSENTE',
                'impresionDiagnostica': fichaData.impresionDiagnostica,
                'derivacionInterconsulta': fichaData.derivacionInterconsulta,
                'objetivoPlanTratamientoIndividual': fichaData.objetivoPlanTratamientoIndividual,
                'estrategiaDeIntervencion': fichaData.estrategiaDeIntervencion,
                'indicadorDeLogro': fichaData.indicadorDeLogro,
                'tiempoEstimado': fichaData.tiempoEstimado,
                'evaluacion': fichaData.evaluacion,
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
                'estado': 1,
                'anamnesisFamiliar': responseForm.anamnesisFamiliar,
                'personal': responseForm.personal,
                'momentosEvolutivosEnElDesarrollo': responseForm.momentosEvolutivosEnElDesarrollo,
                'habitosEnLaOralidad': responseForm.habitosEnLaOralidad,
                'inicioHorarioDeSuenio': responseForm.inicioHorarioDeSuenio,
                'finHorarioDeSuenio': responseForm.finHorarioDeSuenio,
                'tipoHorarioDeSuenio': responseForm.tipoHorarioDeSuenio,
                'companiaSuenio': responseForm.companiaSuenio,
                'especificarCompaniaSuenio': responseForm.especificarCompaniaSuenio,
                'edad': responseForm.edad,
                'hipersomnia': responseForm.hipersomnia,
                'dificultadDeConciliarElSuenio': responseForm.dificultadDeConciliarElSuenio,
                'despertarFrecuente': responseForm.despertarFrecuente,
                'despertarPrematuro': responseForm.despertarPrematuro,
                'sonambulismo': responseForm.sonambulismo,
                'observacionesHabitosDeSuenio': responseForm.observacionesHabitosDeSuenio,
                'temores': responseForm.temores,
                'destructividad': responseForm.destructividad,
                'nerviosismo': responseForm.nerviosismo,
                'irritabilidad': responseForm.irritabilidad,
                'egocentrismo': responseForm.egocentrismo,
                'regresiones': responseForm.regresiones,
                'tics': responseForm.tics,
                'hurto': responseForm.hurto,
                'mentira': responseForm.mentira,
                'cuidadoPersonal': responseForm.cuidadoPersonal,
                'otrosConductasPreocupantes': responseForm.otrosConductasPreocupantes,
                'observacionesConductasPreocupantes': responseForm.observacionesConductasPreocupantes,
                'sexoDeNacimiento': responseForm.sexoDeNacimiento,
                'genero': responseForm.genero,
                'especificarGeneroOtros': responseForm.especificarGeneroOtros,
                'orientacionSexual': responseForm.orientacionSexual,
                'curiosidadSexual': responseForm.curiosidadSexual,
                'gradoDeInformacion': responseForm.gradoDeInformacion,
                'actividadSexual': responseForm.actividadSexual,
                'masturbacion': responseForm.masturbacion,
                'promiscuidad': responseForm.promiscuidad,
                'disfunciones': responseForm.disfunciones,
                'erotismo': responseForm.erotismo,
                'parafilias': responseForm.parafilias,
                'observacionesAspectoPsicosexual': responseForm.observacionesAspectoPsicosexual,
                'palabrasRaras': responseForm.palabrasRaras,
                'logicoYClaro': responseForm.logicoYClaro,
                'vozMonotona': responseForm.vozMonotona,
                'malHablado': responseForm.malHablado,
                'lentoYTeatral': responseForm.lentoYTeatral,
                'pesimista': responseForm.pesimista,
                'hiriente': responseForm.hiriente,
                'charlatan': responseForm.charlatan,
                'incoherente': responseForm.incoherente,
                'verborrea': responseForm.verborrea,
                'abatimiento': responseForm.abatimiento,
                'tension': responseForm.tension,
                'perplejidad': responseForm.perplejidad,
                'suspicacia': responseForm.suspicacia,
                'enfado': responseForm.enfado,
                'preocupacion': responseForm.preocupacion,
                'obscenidad': responseForm.obscenidad,
                'disartria': responseForm.disartria,
                'afasiaExpresiva': responseForm.afasiaExpresiva,
                'afasiaReceptiva': responseForm.afasiaReceptiva,
                'afasiaAnomica': responseForm.afasiaAnomica,
                'afasiaGlobal': responseForm.afasiaGlobal,
                'ecolalia': responseForm.ecolalia,
                'palilalia': responseForm.palilalia,
                'ensimismamiento': responseForm.ensimismamiento,
                'hayQueGuiarlo': responseForm.hayQueGuiarlo,
                'molestoso': responseForm.molestoso,
                'lento': responseForm.lento,
                'noDeseaHacerNada': responseForm.noDeseaHacerNada,
                'haceCosasExtranas': responseForm.haceCosasExtranas,
                'aislado': responseForm.aislado,
                'participaEnGrupos': responseForm.participaEnGrupos,
                'esViolento': responseForm.esViolento,
                'callado': responseForm.callado,
                'amigableYCooperador': responseForm.amigableYCooperador,
                'adaptable': responseForm.adaptable,
                'inquieto': responseForm.inquieto,
                'nervioso': responseForm.nervioso,
                'tieneAmigosIntimos': responseForm.tieneAmigosIntimos,
                'confuso': responseForm.confuso,
                'centradoEnSiMismo': responseForm.centradoEnSiMismo,
                'olvidadizo': responseForm.olvidadizo,
                'piensaYRespondeBien': responseForm.piensaYRespondeBien,
                'pocosPensamientos': responseForm.pocosPensamientos,
                'noVeLosErrores': responseForm.noVeLosErrores,
                'actuaInfaltilmente': responseForm.actuaInfaltilmente,
                'desconfia': responseForm.desconfia,
                'hosco': responseForm.hosco,
                'fastidiado': responseForm.fastidiado,
                'cansado': responseForm.cansado,
                'visteRaramente': responseForm.visteRaramente,
                'desordenado': responseForm.desordenado,
                'mugrosoYFachoso': responseForm.mugrosoYFachoso,
                'excesoDeRopas': responseForm.excesoDeRopas,
                'dramaticoYTeatral': responseForm.dramaticoYTeatral,
                'visteNormalmente': responseForm.visteNormalmente,
                'impecable': responseForm.impecable,
                'dudaDeTodos': responseForm.dudaDeTodos,
                'pasaAislado': responseForm.pasaAislado,
                'diceEstarBien': responseForm.diceEstarBien,
                'gustaDeHacerDanoALosDemas': responseForm.gustaDeHacerDanoALosDemas,
                'tieneIniciativas': responseForm.tieneIniciativas,
                'colabora': responseForm.colabora,
                'reticencia': responseForm.reticencia,
                'rechazo': responseForm.rechazo,
                'mutismo': responseForm.mutismo,
                'negativismo': responseForm.negativismo,
                'agresividad': responseForm.agresividad,
                'sarcasmo': responseForm.sarcasmo,
                'pegajosidad': responseForm.pegajosidad,
                'colaboracionExcesiva': responseForm.colaboracionExcesiva,
                'atento': responseForm.atento,
                'seductor': responseForm.seductor,
                'evitaConversar': responseForm.evitaConversar,
                'impulsivo': responseForm.impulsivo,
                'bromista': responseForm.bromista,
                'toscoYDescortes': responseForm.toscoYDescortes,
                'triste': responseForm.triste,
                'irritable': responseForm.irritable,
                'popensoARinias': responseForm.popensoARinias,
                'suaveYAfable': responseForm.suaveYAfable,
                'indiferente': responseForm.indiferente,
                'preocupadoYPensativo': responseForm.preocupadoYPensativo,
                'tendenciaAlLlanto': responseForm.tendenciaAlLlanto,
                'alegre': responseForm.alegre,
                'euforico': responseForm.euforico,
                'labilDeHumor': responseForm.labilDeHumor,
                'inactivo': responseForm.inactivo,
                'perezoso': responseForm.perezoso,
                'soloHaceCosasIndispensables': responseForm.soloHaceCosasIndispensables,
                'realizaSoloUnTipoDeTrabajo': responseForm.realizaSoloUnTipoDeTrabajo,
                'dedicadoAVariasActividades': responseForm.dedicadoAVariasActividades,
                'apraxia': responseForm.apraxia,
                'catatonia': responseForm.catatonia,
                'agitacion': responseForm.agitacion,
                'amaneramiento': responseForm.amaneramiento,
                'estereotipias': responseForm.estereotipias,
                'ecopraxia': responseForm.ecopraxia,
                'obedienciaAutomatica': responseForm.obedienciaAutomatica,
                'negativismoActividades': responseForm.negativismoActividades,
                'interceptacionMotriz': responseForm.interceptacionMotriz,
                'dispraxias': responseForm.dispraxias,
                'actosImpulsivos': responseForm.actosImpulsivos,
                'actosObsesivos': responseForm.actosObsesivos,
                'ticsActividades': responseForm.ticsActividades,
                'liderazgo': responseForm.liderazgo,
                'sociabilidad': responseForm.sociabilidad,
                'responsabilidad': responseForm.responsabilidad,
                'toleranciaNormal': responseForm.toleranciaNormal,
                'baja': responseForm.baja,
                'colaboracion': responseForm.colaboracion,
                'inquietud': responseForm.inquietud,
                'acataOrdenesVerbales': responseForm.acataOrdenesVerbales,
                'agresivo': responseForm.agresivo,
                'extravagante': responseForm.extravagante,
                'antisocial': responseForm.antisocial,
                'impulsivoComportamiento': responseForm.impulsivoComportamiento,
                'reflexivo': responseForm.reflexivo,
                'pasivo': responseForm.pasivo,
                'apatico': responseForm.apatico,
                'dependiente': responseForm.dependiente,
                'dominante': responseForm.dominante,
                'cauteloso': responseForm.cauteloso,
                'quejoso': responseForm.quejoso,
                'temeroso': responseForm.temeroso,
                'teatral': responseForm.teatral,
                'ritualista': responseForm.ritualista,
                'aislamiento': responseForm.aislamiento,
                'ataquesDePanico': responseForm.ataquesDePanico,
                'incapacidadDeRealizacionDeActividadesProductivas': responseForm.incapacidadDeRealizacionDeActividadesProductivas,
                'riesgoPotencialOPotencialSuicida': responseForm.riesgoPotencialOPotencialSuicida,
                'inhibicion': responseForm.inhibicion,
                'apatia': responseForm.apatia,
                'humorVariable': responseForm.humorVariable,
                'altaSensibilidad': responseForm.altaSensibilidad,
                'agresividadAfectividad': responseForm.agresividadAfectividad,
                'sumision': responseForm.sumision,
                'rabietas': responseForm.rabietas,
                'solidaridad': responseForm.solidaridad,
                'generosidad': responseForm.generosidad,
                'afectuoso': responseForm.afectuoso,
                'angustia': responseForm.angustia,
                'ansiedadSituacional': responseForm.ansiedadSituacional,
                'timidez': responseForm.timidez,
                'ansiedadExpectante': responseForm.ansiedadExpectante,
                'depresion': responseForm.depresion,
                'perdidaRecienteDeInteres': responseForm.perdidaRecienteDeInteres,
                'desesperacion': responseForm.desesperacion,
                'euforia': responseForm.euforia,
                'indiferencia': responseForm.indiferencia,
                'aplanamiento': responseForm.aplanamiento,
                'ambivalencia': responseForm.ambivalencia,
                'irritabilidadAfectividad': responseForm.irritabilidadAfectividad,
                'labilidad': responseForm.labilidad,
                'tenacidad': responseForm.tenacidad,
                'incontinencia': responseForm.incontinencia,
                'sentimientosInadecuados': responseForm.sentimientosInadecuados,
                'neotimia': responseForm.neotimia,
                'disociacionIdeoAfectiva': responseForm.disociacionIdeoAfectiva,
                'anhedonia': responseForm.anhedonia,
                'observacionesGuiaDeObservacion': responseForm.observacionesGuiaDeObservacion,
                'lucidez': responseForm.lucidez,
                'obnubilacion': responseForm.obnubilacion,
                'estupor': responseForm.estupor,
                'coma': responseForm.coma,
                'hipervigilancia': responseForm.hipervigilancia,
                'confusion': responseForm.confusion,
                'estadoCrepuscular': responseForm.estadoCrepuscular,
                'onirismo': responseForm.onirismo,
                'sonambulismoEstadoDeConciencia': responseForm.sonambulismoEstadoDeConciencia,
                'hipercepcion': responseForm.hipercepcion,
                'hipoprosexia': responseForm.hipoprosexia,
                'disprosexia': responseForm.disprosexia,
                'distraibilidad': responseForm.distraibilidad,
                'sinAlteracion': responseForm.sinAlteracion,
                'hipercepcionSensopercepcion': responseForm.hipercepcionSensopercepcion,
                'ilusiones': responseForm.ilusiones,
                'seudoalucionciones': responseForm.seudoalucionciones,
                'alusinosis': responseForm.alusinosis,
                'macropsias': responseForm.macropsias,
                'micropsias': responseForm.micropsias,
                'noPresenta': responseForm.noPresenta,
                'alucinaiones': responseForm.alucinaiones,
                'hipermnecia': responseForm.hipermnecia,
                'amnesiaDeFijacion': responseForm.amnesiaDeFijacion,
                'amnesiaDeEvocacion': responseForm.amnesiaDeEvocacion,
                'mixta': responseForm.mixta,
                'lacunar': responseForm.lacunar,
                'dismensia': responseForm.dismensia,
                'paramnesias': responseForm.paramnesias,
                'sinAlteracionMemoria': responseForm.sinAlteracionMemoria,
                'enlentecimiento': responseForm.enlentecimiento,
                'excitacionPsicomotriz': responseForm.excitacionPsicomotriz,
                'catatoniaConductaMotora': responseForm.catatoniaConductaMotora,
                'actitudesAnormales': responseForm.actitudesAnormales,
                'alteracionesDeLaMarcha': responseForm.alteracionesDeLaMarcha,
                'inquietudConductaMotora': responseForm.inquietudConductaMotora,
                'incoherencia': responseForm.incoherencia,
                'bloqueos': responseForm.bloqueos,
                'preservacion': responseForm.preservacion,
                'prolijidad': responseForm.prolijidad,
                'desgragacion': responseForm.desgragacion,
                'estereotipiasEstructuraDelPensamiento': responseForm.estereotipiasEstructuraDelPensamiento,
                'neologismos': responseForm.neologismos,
                'musitacion': responseForm.musitacion,
                'retardo': responseForm.retardo,
                'aceleracion': responseForm.aceleracion,
                'fugaDeIdeas': responseForm.fugaDeIdeas,
                'mutismoCursoDelPensamiento': responseForm.mutismoCursoDelPensamiento,
                'grandeza': responseForm.grandeza,
                'suicidio': responseForm.suicidio,
                'autocompasion': responseForm.autocompasion,
                'inferioridad': responseForm.inferioridad,
                'perdidaDeInteres': responseForm.perdidaDeInteres,
                'indecision': responseForm.indecision,
                'necesidadDeAyuda': responseForm.necesidadDeAyuda,
                'fracaso': responseForm.fracaso,
                'ruina': responseForm.ruina,
                'autoacusacion': responseForm.autoacusacion,
                'resentimiento': responseForm.resentimiento,
                'muerte': responseForm.muerte,
                'danio': responseForm.danio,
                'enfermedad': responseForm.enfermedad,
                'grave': responseForm.grave,
                'hipocondrias': responseForm.hipocondrias,
                'nihilistas': responseForm.nihilistas,
                'noTenerSentimientos': responseForm.noTenerSentimientos,
                'elMundoHaDejadoDeExistir': responseForm.elMundoHaDejadoDeExistir,
                'referencia': responseForm.referencia,
                'extravagantes': responseForm.extravagantes,
                'fobicas': responseForm.fobicas,
                'compulsivas': responseForm.compulsivas,
                'obsesivas': responseForm.obsesivas,
                'desconfianzas': responseForm.desconfianzas,
                'desRelacion': responseForm.desRelacion,
                'perdidaDeControl': responseForm.perdidaDeControl,
                'serCalumniado': responseForm.serCalumniado,
                'deliriosParanoides': responseForm.deliriosParanoides,
                'depresivos': responseForm.depresivos,
                'misticoReligioso': responseForm.misticoReligioso,
                'sexuales': responseForm.sexuales,
                'difusos': responseForm.difusos,
                'otrosContenidoDelPensamiento': responseForm.otrosContenidoDelPensamiento,
                'capacidadDeAutocritica': responseForm.capacidadDeAutocritica,
                'heterocritica': responseForm.heterocritica,
                'proyectosFuturos': responseForm.proyectosFuturos,
                'concienciaDeLaEnfermedad': responseForm.concienciaDeLaEnfermedad,
                'desorientacionEnTiempo': responseForm.desorientacionEnTiempo,
                'espacio': responseForm.espacio,
                'respectoASiMismo': responseForm.respectoASiMismo,
                'respectoAOtrasPersonas': responseForm.respectoAOtrasPersonas,
                'impresionDiagnostica': responseForm.impresionDiagnostica,
                'derivacionInterconsulta': responseForm.derivacionInterconsulta,
                'objetivoPlanTratamientoIndividual': responseForm.objetivoPlanTratamientoIndividual,
                'estrategiaDeIntervencion': responseForm.estrategiaDeIntervencion,
                'indicadorDeLogro': responseForm.indicadorDeLogro,
                'tiempoEstimado': responseForm.tiempoEstimado,
                'evaluacion': responseForm.evaluacion,

            }
            await fichaPsicologiaClinicaActualizar(fichaData.id, response, message);
            message.success(t('fichaPsicologiaClinicaActualizada'));
        } catch (error) {
            message.error(t('errorActualizarFichaPsicologiaClinica') + error);
        } finally {
            setLoading(false);
        }
    };
    const handleDownload = async () => {
        try {
            const response = await psicologiaClinicaPDF(fichaData.id, message);

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
            const response = await psicologiaClinicaPDF(fichaData.id, message);


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
                    <Card.Meta title={<h1>{t('FichaPsicologiaClinica')}</h1>} />
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
            <BreadCrumbPacientes idPaciente={ficha.paciente.id} page={t('FichaPsicologiaClinica')} />
            <Card>
                <Card.Meta title={
                    <Row justify={'space-between'}>
                        <Col >
                            <h1>{t('FichaPsicologiaClinica')}</h1>
                        </Col>
                        <Col  >

                            <Row justify={{ xs: 'start', sm: 'start', md: 'end' }}>
                                <Col>
                                    <Button onClick={handleDownload} style={{ color: "#fff", backgroundColor: "#28a745" }}>
                                        <DownCircleOutlined />
                                        {t('descargarFichaPsicologiaClinica')}
                                    </Button></Col>
                                <Col>
                                    <Button onClick={handleOpenPDF} style={{ color: "#fff", backgroundColor: "#17a2b8" }}>
                                        <FilePdfOutlined />
                                        {t('abrirFichaPsicologiaClinica')}
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>} />
                <Form form={form} disabled={!user?.permisos?.psicologiaClinica} layout="vertical" onFinish={onFinish}>
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
                    {/* 2. ANAMNESIS FAMILIAR */}
                    <Divider orientation='left'><h2>{t('AnamnesisFamiliar')}</h2></Divider>
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={24}>
                            <Form.Item label={t('anamnesisFamiliar')} name="anamnesisFamiliar">
                                <TextArea rows={4} />
                            </Form.Item>
                        </Col>
                    </Row>
                    {/* 3. PERSONAL */}
                    <Divider orientation='left'><h2>{t('Personal')}</h2></Divider>
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={24}>
                            <Form.Item label={t('personalText')} name="personal">
                                <TextArea rows={4} />
                            </Form.Item>
                        </Col>
                    </Row>
                    {/* 4. MOMENTOS EVOLUTIVOS EN EL DESARROLLO */}
                    <Divider orientation='left'><h2>{t('MomentosEvolucionDesarrollo')}</h2></Divider>
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={24}>
                            <Form.Item label={t('momentosEvolucionDesarrollo')} name="momentosEvolutivosEnElDesarrollo">
                                <TextArea rows={4} />
                            </Form.Item>
                        </Col>
                    </Row>
                    {/* 5. HÁBITOS EN LA ORALIDAD */}
                    <Divider orientation='left'><h2>{t('HabitosOralidad')}</h2></Divider>
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={24}>
                            <Form.Item label={t('habitosOralidad')} name="habitosEnLaOralidad">
                                <TextArea rows={4} />
                            </Form.Item>
                        </Col>
                    </Row>
                    {/* 6. HÁBITOS DE SUEÑO */}
                    <Divider orientation='left'><h2>{t('HabitosSueno')}</h2></Divider>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('inicioHorarioDeSuenio')} name="inicioHorarioDeSuenio">
                                <InputNumber min={0} max={24} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('finHorarioDeSuenio')} name="finHorarioDeSuenio">
                                <InputNumber min={0} max={24} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('tipoHorarioDeSuenio')} name="tipoHorarioDeSuenio">
                                <Select>
                                    <Option value="NOCTURNO">{t('Nocturno')}</Option>
                                    <Option value="DIURNO">{t('Diurno')}</Option>
                                    <Option value="MIXTO">{t('Mixto')}</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('companiaSuenio')} name="companiaSuenio">
                                <Select>
                                    <Option value="SOLO">{t('Solo')}</Option>
                                    <Option value="ACOMPANIADO">{t('Acompañado')}</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('especificarCompaniaSuenio')} name="especificarCompaniaSuenio">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('edad')} name="edad">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <h4>{t('alteracionesDelSuenio')}</h4>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('hipersomnia')} name="hipersomnia">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>

                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('dificultadDeConciliarElSuenio')} name="dificultadDeConciliarElSuenio">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('despertarFrecuente')} name="despertarFrecuente">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('despertarPrematuro')} name="despertarPrematuro">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('sonambulismo')} name="sonambulismo">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24}>
                            <Form.Item label={t('observacionesHabitosDeSuenio')} name="observacionesHabitosDeSuenio">
                                <TextArea rows={4} />
                            </Form.Item>
                        </Col>
                    </Row>
                    {/* 7. CONDUCTAS PREOCUPANTES */}
                    <Divider orientation='left'><h2>{t('ConductasPreocupantes')}</h2></Divider>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('temores')} name="temores">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('destructividad')} name="destructividad">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('nerviosismo')} name="nerviosismo">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('irritabilidad')} name="irritabilidad">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('egocentrismo')} name="egocentrismo">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('regresiones')} name="regresiones">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('tics')} name="tics">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('hurto')} name="hurto">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('mentira')} name="mentira">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('cuidadoPersonal')} name="cuidadoPersonal">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={8}>
                            <Form.Item label={t('otrosConductasPreocupantes')} name="otrosConductasPreocupantes">
                                <Input />
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={24} md={24}>
                            <Form.Item label={t('observacionesConductasPreocupantes')} name="observacionesConductasPreocupantes">
                                <TextArea rows={4} />
                            </Form.Item>
                        </Col>
                    </Row>
                    {/* 8. ASPECTO PSICOSEXUAL */}
                    <Divider orientation='left'><h2>{t('AspectoPsicosexual')}</h2></Divider>




                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('sexoDeNacimiento')} name="sexoDeNacimiento">
                                <Select>
                                    <Option value="MASCULINO">{t('Masculino')}</Option>
                                    <Option value="FEMENINO">{t('Femenino')}</Option>
                                </Select>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('genero')} name="genero">
                                <Select>
                                    <Option value="MASCULINO">{t('Masculino')}</Option>
                                    <Option value="FEMENINO">{t('Femenino')}</Option>
                                    <Option value="OTROS">{t('Otros')}</Option>
                                </Select>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={12}>
                            <Form.Item label={t('especificarGeneroOtros')} name="especificarGeneroOtros">
                                <Input />
                            </Form.Item>
                        </Col>




                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('orientacionSexual')} name="orientacionSexual">
                                <Select>
                                    <Option value="HETEROSEXUAL">{t('Heterosexual')}</Option>
                                    <Option value="HOMOSEXUAL">{t('Homosexual')}</Option>
                                    <Option value="BISEXUAL">{t('Bisexual')}</Option>
                                    <Option value="ASEXUAL  ">{t('Asexual')}</Option>
                                    <Option value="OTROS">{t('Otros')}</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>



                    <h3>{t('adaptacionSexual')}</h3>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('curiosidadSexual')} name="curiosidadSexual">
                                <Select>
                                    <Option value="AUSENTE">{t('Ausente')}</Option>
                                    <Option value="MEDIA">{t('Media')}</Option>
                                    <Option value="ABUNDANTE">{t('Abundante')}</Option>
                                </Select>
                            </Form.Item>
                        </Col>




                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('gradoDeInformacion')} name="gradoDeInformacion">
                                <Select>
                                    <Option value="AUSENTE">{t('Ausente')}</Option>
                                    <Option value="MEDIA">{t('Media')}</Option>
                                    <Option value="ABUNDANTE">{t('Abundante')}</Option>
                                </Select>
                            </Form.Item>
                        </Col>




                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('actividadSexual')} name="actividadSexual">
                                <Select>
                                    <Option value="AUSENTE">{t('Ausente')}</Option>
                                    <Option value="MEDIA">{t('Media')}</Option>
                                    <Option value="ABUNDANTE">{t('Abundante')}</Option>
                                </Select>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('masturbacion')} name="masturbacion">
                                <Select>
                                    <Option value="AUSENTE">{t('Ausente')}</Option>
                                    <Option value="MEDIA">{t('Media')}</Option>
                                    <Option value="ABUNDANTE">{t('Abundante')}</Option>
                                </Select>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('promiscuidad')} name="promiscuidad">
                                <Select>
                                    <Option value="AUSENTE">{t('Ausente')}</Option>
                                    <Option value="MEDIA">{t('Media')}</Option>
                                    <Option value="ABUNDANTE">{t('Abundante')}</Option>
                                </Select>
                            </Form.Item>
                        </Col>




                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('disfunciones')} name="disfunciones">
                                <Select>
                                    <Option value="AUSENTE">{t('Ausente')}</Option>
                                    <Option value="MEDIA">{t('Media')}</Option>
                                    <Option value="ABUNDANTE">{t('Abundante')}</Option>
                                </Select>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('erotismo')} name="erotismo">
                                <Select>
                                    <Option value="AUSENTE">{t('Ausente')}</Option>
                                    <Option value="MEDIA">{t('Media')}</Option>
                                    <Option value="ABUNDANTE">{t('Abundante')}</Option>
                                </Select>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('parafilias')} name="parafilias">
                                <Select>
                                    <Option value="AUSENTE">{t('Ausente')}</Option>
                                    <Option value="MEDIA">{t('Media')}</Option>
                                    <Option value="ABUNDANTE">{t('Abundante')}</Option>
                                </Select>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={24} md={24}>
                            <Form.Item label={t('observacionesAspectoPsicosexual')} name="observacionesAspectoPsicosexual">
                                <TextArea rows={4} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Divider orientation='left'><h2>{t('GuiaDeObservacion')}</h2></Divider>

                    <h3>{t('ExpresionLenguaje')}</h3>


                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('palabrasRaras')} name="palabrasRaras">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('logicoYClaro')} name="logicoYClaro">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('vozMonotona')} name="vozMonotona">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('malHablado')} name="malHablado">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('lentoYTeatral')} name="lentoYTeatral">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('pesimista')} name="pesimista">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('hiriente')} name="hiriente">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('charlatan')} name="charlatan">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('incoherente')} name="incoherente">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('verborrea')} name="verborrea">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('abatimiento')} name="abatimiento">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('tension')} name="tension">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('perplejidad')} name="perplejidad">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('suspicacia')} name="suspicacia">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('enfado')} name="enfado">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('preocupacion')} name="preocupacion">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('obscenidad')} name="obscenidad">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('disartria')} name="disartria">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('afasiaExpresiva')} name="afasiaExpresiva">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('afasiaReceptiva')} name="afasiaReceptiva">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('afasiaAnomica')} name="afasiaAnomica">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('afasiaGlobal')} name="afasiaGlobal">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('ecolalia')} name="ecolalia">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('palilalia')} name="palilalia">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('ensimismamiento')} name="ensimismamiento">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>

                    <h3>{t('HabitosPersonales')}</h3>


                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('hayQueGuiarlo')} name="hayQueGuiarlo">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('molestoso')} name="molestoso">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('lento')} name="lento">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('noDeseaHacerNada')} name="noDeseaHacerNada">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('haceCosasExtranas')} name="haceCosasExtranas">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>

                    <h3>{t('ConductaSocial')}</h3>


                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('aislado')} name="aislado">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('participaEnGrupos')} name="participaEnGrupos">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('esViolento')} name="esViolento">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('callado')} name="callado">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('amigableYCooperador')} name="amigableYCooperador">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('adaptable')} name="adaptable">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('inquieto')} name="inquieto">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('nervioso')} name="nervioso">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('tieneAmigosIntimos')} name="tieneAmigosIntimos">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>

                    <h3>{t('ActividadesIntelectivas')}</h3>


                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('confuso')} name="confuso">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('centradoEnSiMismo')} name="centradoEnSiMismo">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('olvidadizo')} name="olvidadizo">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('piensaYRespondeBien')} name="piensaYRespondeBien">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('pocosPensamientos')} name="pocosPensamientos">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('noVeLosErrores')} name="noVeLosErrores">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('actuaInfaltilmente')} name="actuaInfaltilmente">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('desconfia')} name="desconfia">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>

                    <h3>{t('Aspectos')}</h3>


                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('hosco')} name="hosco">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>




                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('fastidiado')} name="fastidiado">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('cansado')} name="cansado">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('visteRaramente')} name="visteRaramente">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('desordenado')} name="desordenado">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('mugrosoYFachoso')} name="mugrosoYFachoso">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('excesoDeRopas')} name="excesoDeRopas">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('dramaticoYTeatral')} name="dramaticoYTeatral">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('visteNormalmente')} name="visteNormalmente">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('impecable')} name="impecable">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>

                    <h3>{t('FormaDeRelacion')}</h3>


                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('dudaDeTodos')} name="dudaDeTodos">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('pasaAislado')} name="pasaAislado">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('diceEstarBien')} name="diceEstarBien">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('gustaDeHacerDanoALosDemas')} name="gustaDeHacerDanoALosDemas">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('tieneIniciativas')} name="tieneIniciativas">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('colabora')} name="colabora">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('reticencia')} name="reticencia">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('rechazo')} name="rechazo">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('mutismo')} name="mutismo">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('negativismo')} name="negativismo">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('agresividad')} name="agresividad">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('sarcasmo')} name="sarcasmo">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('pegajosidad')} name="pegajosidad">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('colaboracionExcesiva')} name="colaboracionExcesiva">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>

                    <h3>{t('ComportamientoFrenteAlSexoContrario')}</h3>


                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('atento')} name="atento">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('seductor')} name="seductor">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('evitaConversar')} name="evitaConversar">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('impulsivo')} name="impulsivo">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('bromista')} name="bromista">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('toscoYDescortes')} name="toscoYDescortes">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>

                    <h3>{t('Humor')}</h3>


                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('triste')} name="triste">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('irritable')} name="irritable">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('popensoARinias')} name="popensoARinias">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('suaveYAfable')} name="suaveYAfable">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('indiferente')} name="indiferente">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('preocupadoYPensativo')} name="preocupadoYPensativo">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('tendenciaAlLlanto')} name="tendenciaAlLlanto">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('alegre')} name="alegre">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('euforico')} name="euforico">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('labilDeHumor')} name="labilDeHumor">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>

                    <h3>{t('Actividades')}</h3>


                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('inactivotxt')} name="inactivo">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('perezoso')} name="perezoso">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('soloHaceCosasIndispensables')} name="soloHaceCosasIndispensables">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('realizaSoloUnTipoDeTrabajo')} name="realizaSoloUnTipoDeTrabajo">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('dedicadoAVariasActividades')} name="dedicadoAVariasActividades">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('apraxia')} name="apraxia">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('catatonia')} name="catatonia">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('agitacion')} name="agitacion">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('amaneramiento')} name="amaneramiento">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('estereotipias')} name="estereotipias">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('ecopraxia')} name="ecopraxia">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('obedienciaAutomatica')} name="obedienciaAutomatica">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('negativismoActividades')} name="negativismoActividades">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('interceptacionMotriz')} name="interceptacionMotriz">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('dispraxias')} name="dispraxias">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('actosImpulsivos')} name="actosImpulsivos">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('actosObsesivos')} name="actosObsesivos">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('ticsActividades')} name="ticsActividades">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>

                    <h3>{t('Comportamiento')}</h3>


                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('liderazgo')} name="liderazgo">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('sociabilidad')} name="sociabilidad">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('responsabilidad')} name="responsabilidad">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('toleranciaNormal')} name="toleranciaNormal">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('baja')} name="baja">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('colaboracion')} name="colaboracion">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('inquietud')} name="inquietud">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('acataOrdenesVerbales')} name="acataOrdenesVerbales">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('agresivo')} name="agresivo">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('extravagante')} name="extravagante">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('antisocial')} name="antisocial">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('impulsivoComportamiento')} name="impulsivoComportamiento">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('reflexivo')} name="reflexivo">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('pasivo')} name="pasivo">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('apatico')} name="apatico">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('dependiente')} name="dependiente">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('dominante')} name="dominante">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('cauteloso')} name="cauteloso">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('quejoso')} name="quejoso">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('temeroso')} name="temeroso">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('teatral')} name="teatral">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('ritualista')} name="ritualista">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('aislamiento')} name="aislamiento">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('ataquesDePanico')} name="ataquesDePanico">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('incapacidadDeRealizacionDeActividadesProductivas')} name="incapacidadDeRealizacionDeActividadesProductivas">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('riesgoPotencialOPotencialSuicida')} name="riesgoPotencialOPotencialSuicida">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>

                    <h3>{t('Afectividad')}</h3>


                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('inhibicion')} name="inhibicion">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('apatia')} name="apatia">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('humorVariable')} name="humorVariable">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('altaSensibilidad')} name="altaSensibilidad">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('agresividadAfectividad')} name="agresividadAfectividad">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('sumision')} name="sumision">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('rabietas')} name="rabietas">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('solidaridad')} name="solidaridad">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('generosidad')} name="generosidad">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('afectuoso')} name="afectuoso">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('angustia')} name="angustia">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('ansiedadSituacional')} name="ansiedadSituacional">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('timidez')} name="timidez">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('ansiedadExpectante')} name="ansiedadExpectante">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('depresion')} name="depresion">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('perdidaRecienteDeInteres')} name="perdidaRecienteDeInteres">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('desesperacion')} name="desesperacion">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('euforia')} name="euforia">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('indiferencia')} name="indiferencia">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('aplanamiento')} name="aplanamiento">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('ambivalencia')} name="ambivalencia">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('irritabilidadAfectividad')} name="irritabilidadAfectividad">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>

                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('labilidad')} name="labilidad">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('tenacidad')} name="tenacidad">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('incontinencia')} name="incontinencia">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('sentimientosInadecuados')} name="sentimientosInadecuados">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('neotimia')} name="neotimia">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('disociacionIdeoAfectiva')} name="disociacionIdeoAfectiva">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('anhedonia')} name="anhedonia">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={24} md={24}>
                            <Form.Item label={t('observacionesGuiaDeObservacion')} name="observacionesGuiaDeObservacion">
                                <TextArea rows={4} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Divider orientation="left"><h2>{t('ExamenDeFunciones')}</h2></Divider>

                    <h3>{t('EstadoDeConciencia')}</h3>


                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('lucidez')} name="lucidez">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('obnubilacion')} name="obnubilacion">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('estupor')} name="estupor">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('coma')} name="coma">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('hipervigilancia')} name="hipervigilancia">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('confusion')} name="confusion">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('estadoCrepuscular')} name="estadoCrepuscular">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('onirismo')} name="onirismo">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('sonambulismoEstadoDeConciencia')} name="sonambulismoEstadoDeConciencia">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>

                    <h3>{t('Atencion')}</h3>


                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('hipercepcion')} name="hipercepcion">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('hipoprosexia')} name="hipoprosexia">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('disprosexia')} name="disprosexia">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('distraibilidad')} name="distraibilidad">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('sinAlteracion')} name="sinAlteracion">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('hipercepcionSensopercepcion')} name="hipercepcionSensopercepcion">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('ilusiones')} name="ilusiones">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('seudoalucionciones')} name="seudoalucionciones">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('alusinosis')} name="alusinosis">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('macropsias')} name="macropsias">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('micropsias')} name="micropsias">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('noPresenta')} name="noPresenta">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('alucinaiones')} name="alucinaiones">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                    <h3>{t('Memoria')}</h3>

                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('hipermnecia')} name="hipermnecia">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('amnesiaDeFijacion')} name="amnesiaDeFijacion">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('amnesiaDeEvocacion')} name="amnesiaDeEvocacion">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('mixta')} name="mixta">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('lacunar')} name="lacunar">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('dismensia')} name="dismensia">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('paramnesias')} name="paramnesias">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('sinAlteracionMemoria')} name="sinAlteracionMemoria">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                    <h3>{t('ConductaMotora')}</h3>
                    <Row gutter={16}>

                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('enlentecimiento')} name="enlentecimiento">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('excitacionPsicomotriz')} name="excitacionPsicomotriz">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('catatoniaConductaMotora')} name="catatoniaConductaMotora">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('actitudesAnormales')} name="actitudesAnormales">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('alteracionesDeLaMarcha')} name="alteracionesDeLaMarcha">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('inquietudConductaMotora')} name="inquietudConductaMotora">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                    <h3>{t('EstructuraDelPensamiento')}</h3>
                    <Row gutter={16}>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('incoherencia')} name="incoherencia">
                                <Select>
                                    <Option value="AUSENTE">{t('Ausente')}</Option>
                                    <Option value="LEVE">{t('Leve')}</Option>
                                    <Option value="MODERADO">{t('Moderado')}</Option>
                                    <Option value="GRAVE">{t('Grave')}</Option>
                                </Select>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('bloqueos')} name="bloqueos">
                                <Select>
                                    <Option value="AUSENTE">{t('Ausente')}</Option>
                                    <Option value="LEVE">{t('Leve')}</Option>
                                    <Option value="MODERADO">{t('Moderado')}</Option>
                                    <Option value="GRAVE">{t('Grave')}</Option>
                                </Select>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('preservacion')} name="preservacion">
                                <Select>
                                    <Option value="AUSENTE">{t('Ausente')}</Option>
                                    <Option value="LEVE">{t('Leve')}</Option>
                                    <Option value="MODERADO">{t('Moderado')}</Option>
                                    <Option value="GRAVE">{t('Grave')}</Option>
                                </Select>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('prolijidad')} name="prolijidad">
                                <Select>
                                    <Option value="AUSENTE">{t('Ausente')}</Option>
                                    <Option value="LEVE">{t('Leve')}</Option>
                                    <Option value="MODERADO">{t('Moderado')}</Option>
                                    <Option value="GRAVE">{t('Grave')}</Option>
                                </Select>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('desgragacion')} name="desgragacion">
                                <Select>
                                    <Option value="AUSENTE">{t('Ausente')}</Option>
                                    <Option value="LEVE">{t('Leve')}</Option>
                                    <Option value="MODERADO">{t('Moderado')}</Option>
                                    <Option value="GRAVE">{t('Grave')}</Option>
                                </Select>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('estereotipiasEstructuraDelPensamiento')} name="estereotipiasEstructuraDelPensamiento">
                                <Select>
                                    <Option value="AUSENTE">{t('Ausente')}</Option>
                                    <Option value="LEVE">{t('Leve')}</Option>
                                    <Option value="MODERADO">{t('Moderado')}</Option>
                                    <Option value="GRAVE">{t('Grave')}</Option>
                                </Select>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('neologismos')} name="neologismos">
                                <Select>
                                    <Option value="AUSENTE">{t('Ausente')}</Option>
                                    <Option value="LEVE">{t('Leve')}</Option>
                                    <Option value="MODERADO">{t('Moderado')}</Option>
                                    <Option value="GRAVE">{t('Grave')}</Option>
                                </Select>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('musitacion')} name="musitacion">
                                <Select>
                                    <Option value="AUSENTE">{t('Ausente')}</Option>
                                    <Option value="LEVE">{t('Leve')}</Option>
                                    <Option value="MODERADO">{t('Moderado')}</Option>
                                    <Option value="GRAVE">{t('Grave')}</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <h3>{t('CursoDelPensamiento')}</h3>


                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('retardo')} name="retardo">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('aceleracion')} name="aceleracion">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('fugaDeIdeas')} name="fugaDeIdeas">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('mutismoCursoDelPensamiento')} name="mutismoCursoDelPensamiento">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>

                    <h3>{t('ContenidoDelPensamiento')}</h3>


                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('grandeza')} name="grandeza">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('suicidio')} name="suicidio">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('autocompasion')} name="autocompasion">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('inferioridad')} name="inferioridad">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('perdidaDeInteres')} name="perdidaDeInteres">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('indecision')} name="indecision">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('necesidadDeAyuda')} name="necesidadDeAyuda">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('fracaso')} name="fracaso">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('ruina')} name="ruina">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('autoacusacion')} name="autoacusacion">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('resentimiento')} name="resentimiento">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('muerte')} name="muerte">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('danio')} name="danio">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('enfermedad')} name="enfermedad">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('grave')} name="grave">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('hipocondrias')} name="hipocondrias">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('nihilistas')} name="nihilistas">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('noTenerSentimientos')} name="noTenerSentimientos">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('elMundoHaDejadoDeExistir')} name="elMundoHaDejadoDeExistir">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('referencia')} name="referencia">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('extravagantes')} name="extravagantes">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('fobicas')} name="fobicas">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('compulsivas')} name="compulsivas">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('obsesivas')} name="obsesivas">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('desconfianzas')} name="desconfianzas">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('desRelacion')} name="desRelacion">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('perdidaDeControl')} name="perdidaDeControl">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('serCalumniado')} name="serCalumniado">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('deliriosParanoides')} name="deliriosParanoides">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('depresivos')} name="depresivos">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('misticoReligioso')} name="misticoReligioso">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('sexuales')} name="sexuales">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('difusos')} name="difusos">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={24} md={24}>
                            <Form.Item label={t('otrosContenidoDelPensamiento')} name="otrosContenidoDelPensamiento">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>


                    <h3>{t('Juicio')}</h3>


                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('capacidadDeAutocritica')} name="capacidadDeAutocritica">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('heterocritica')} name="heterocritica">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('proyectosFuturos')} name="proyectosFuturos">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('concienciaDeLaEnfermedad')} name="concienciaDeLaEnfermedad">
                                <Radio.Group>
                                    <Radio value={true}>{t('Si')}</Radio>
                                    <Radio value={false}>{t('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>

                    <h3>{t('Orientacion')}</h3>



                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('desorientacionEnTiempo')} name="desorientacionEnTiempo">
                                <Select>
                                    <Option value="AUSENTE">{t('Ausente')}</Option>
                                    <Option value="LEVE">{t('Leve')}</Option>
                                    <Option value="MODERADO">{t('Moderado')}</Option>
                                    <Option value="GRAVE">{t('Grave')}</Option>
                                </Select>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('espacio')} name="espacio">
                                <Select>
                                    <Option value="AUSENTE">{t('Ausente')}</Option>
                                    <Option value="LEVE">{t('Leve')}</Option>
                                    <Option value="MODERADO">{t('Moderado')}</Option>
                                    <Option value="GRAVE">{t('Grave')}</Option>
                                </Select>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('respectoASiMismo')} name="respectoASiMismo">
                                <Select>
                                    <Option value="AUSENTE">{t('Ausente')}</Option>
                                    <Option value="LEVE">{t('Leve')}</Option>
                                    <Option value="MODERADO">{t('Moderado')}</Option>
                                    <Option value="GRAVE">{t('Grave')}</Option>
                                </Select>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item label={t('respectoAOtrasPersonas')} name="respectoAOtrasPersonas">
                                <Select>
                                    <Option value="AUSENTE">{t('Ausente')}</Option>
                                    <Option value="LEVE">{t('Leve')}</Option>
                                    <Option value="MODERADO">{t('Moderado')}</Option>
                                    <Option value="GRAVE">{t('Grave')}</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Divider orientation="left"><h2>{t('ImpresionDiagnostica')}</h2></Divider>



                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={24}>
                            <Form.Item label={t('impresionDiagnostica')} name="impresionDiagnostica">
                                <TextArea rows={4} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Divider orientation="left"><h2>{t('DerivasionDiagnostica')}</h2></Divider>



                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={24}>
                            <Form.Item label={t('derivacionInterconsulta')} name="derivacionInterconsulta">
                                <TextArea rows={4} />
                            </Form.Item>
                        </Col>
                    </Row>



                    <Divider orientation="left"><h2>{t('PlanDeTratamientoIndividual')}</h2></Divider>



                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={24}>
                            <Form.Item label={t('objetivoPlanTratamientoIndividual')} name="objetivoPlanTratamientoIndividual">
                                <TextArea rows={4} />
                            </Form.Item>
                        </Col>




                        <Col xs={24} sm={24} md={24}>
                            <Form.Item label={t('estrategiaDeIntervencion')} name="estrategiaDeIntervencion">
                                <TextArea rows={4} />
                            </Form.Item>
                        </Col>




                        <Col xs={24} sm={24} md={24}>
                            <Form.Item label={t('indicadorDeLogro')} name="indicadorDeLogro">
                                <TextArea rows={4} />
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={24} md={24}>
                            <Form.Item label={t('tiempoEstimado')} name="tiempoEstimado">
                                <Input />
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={24} md={24}>
                            <Form.Item label={t('evaluacion')} name="evaluacion">
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
        const res = await fichaPsicologiaClinicaById(context.params.id);
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
