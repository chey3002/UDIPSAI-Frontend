/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useUserContext } from '@/assets/useUserContext';
import MenuWrapper from '@/components/sidebar';
import React, { useState, useEffect } from 'react';
import { Button, Card, Row, Col, Modal, message, Table, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { act } from 'react';
import BreadCrumbPacientes from '@/components/commons/breadCrumPaciente';
import { documentoGet, testEliminar, testPaciientes, testSubir } from '@/utils/apiRequests';

const { Dragger } = Upload;

export default function PacienteTests({ pacienteId }) {
    const { t } = useTranslation('home');
    const lang = t;
    const { user } = useUserContext();
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        fetchTests();
    }, []);

    const fetchTests = async () => {
        try {
            setLoading(true);
            const response = await testPaciientes(pacienteId, message);
            //console.log(response);

            setTests(response.data);
            setLoading(false);
        } catch (error) {
            message.error(lang('errorCargarTests'));
            setLoading(false);
        }
    };

    const handleUpload = async (file) => {
        if (file.type !== 'application/pdf') {
            message.error(lang('soloPdf'));
            return;
        }

        const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = error => reject(error);
        });

        Modal.confirm({
            title: lang('confirmarSubida'),
            content: lang('seguroSubirArchivo'),
            okText: lang('si'),
            cancelText: lang('no'),
            onOk: async () => {
                try {
                    const base64Content = await toBase64(file);
                    const newTest = {
                        paciente: { id: pacienteId },
                        especialista: { cedula: user.cedula },
                        activo: '1',
                        nombreArchivo: file.name,
                        fecha: new Date().toISOString().split('T')[0],
                        contenido: ""
                    };
                    const form = new FormData();
                    form.append('file', file);
                    form.append('testDTO', JSON.stringify(newTest));
                    await testSubir(form, message);
                    fetchTests();
                } catch (error) {
                    message.error(lang('errorSubirTest'));
                }
            },
        });
    };

    const handleDelete = async (id) => {
        try {
            await testEliminar(id, message);
            fetchTests();
        } catch (error) {
            message.error(lang('errorEliminarTest'));
        }
    };

    const showDeleteConfirm = (id) => {
        Modal.confirm({
            title: lang('confirmarEliminacion'),
            content: lang('seguroEliminar'),
            okText: lang('si'),
            okType: 'danger',
            cancelText: lang('no'),
            onOk() {
                handleDelete(id);
            },
        });
    };

    const openDocument = async (documentoId, nombreArchivo) => {
        try {

            const response = await documentoGet(documentoId, message);
            //console.log(response);

            if (!response) {
                message.error(lang('errorAbrirDocumento'));
                return;
            } const contenido = response.data;

            //console.log(contenido);

            const binaryString = atob(contenido); // 'contenido' es la cadena base64
            const len = binaryString.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            const blob = new Blob([bytes], { type: 'application/pdf' }); const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
        } catch (error) {
            message.error(lang('errorAbrirDocumento'));
        }
    };

    const downloadDocument = async (documentoId, nombreArchivo) => {
        try {
            const response = await documentoGet(documentoId, message);
            if (!response) {
                message.error(lang('errorAbrirDocumento'));
                return;
            } const contenido = response.data;
            const binaryString = atob(contenido); // 'contenido' es la cadena base64
            const len = binaryString.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            const blob = new Blob([bytes], { type: 'application/pdf' }); const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = nombreArchivo;
            a.click();
        } catch (error) {
            message.error(lang('errorDescargarDocumento'));
        }
    };

    const columns = [
        {
            title: lang('nombreArchivo'),
            dataIndex: 'nombreArchivo',
            key: 'nombreArchivo',
        },
        {
            title: lang('especialista'),
            dataIndex: 'especialista',
            key: 'especialista',
            render: (especialista) => `${especialista?.primerNombre + " " + especialista?.primerApellido} (${especialista?.especialidad?.area})`,
        },
        {
            title: lang('fecha'),
            dataIndex: 'fecha',
            key: 'fecha',
        },
        {
            title: lang('acciones'),
            key: 'acciones',
            render: (text, record) => (
                <>
                    <Button type="link" onClick={() => openDocument(record.documentoId, record.nombreArchivo)} style={{ color: "#17a2b8" }}>
                        {lang('abrir')}
                    </Button>
                    <Button type="primary" onClick={() => downloadDocument(record.documentoId, record.nombreArchivo)} style={{ color: "#fff", backgroundColor: "#007bff", marginLeft: 5 }}>
                        {lang('descargar')}
                    </Button>
                    {isClient && user?.cedula === record.especialista?.cedula && (
                        <Button type="danger" onClick={() => showDeleteConfirm(record.id)} style={{ color: "#fff", backgroundColor: "#dc3545", marginLeft: 5 }}>
                            {lang('eliminar')}
                        </Button>
                    )}
                </>
            ),
        },
    ];

    return (
        <MenuWrapper setLang={true}>
            <BreadCrumbPacientes idPaciente={pacienteId} page={lang('TestPacientes')} />

            <Card>
                <Card.Meta title={<h1>{lang('testsDelPaciente')} {pacienteId}</h1>} />
                <div style={{ marginBottom: '20px' }}>
                    <Dragger
                        customRequest={({ file }) => handleUpload(file)}
                        showUploadList={false}
                        accept=".pdf"
                    >
                        <p className="ant-upload-drag-icon">
                            <UploadOutlined />
                        </p>
                        <p className="ant-upload-text">{lang('arrastrarSubir')}</p>
                        <p className="ant-upload-hint">{lang('soloPdf')}</p>
                    </Dragger>
                </div>
                <Table
                    columns={columns}
                    dataSource={tests}
                    rowKey="id"
                    loading={loading}
                />
            </Card>
        </MenuWrapper>
    );
}

export const getServerSideProps = async (context) => {
    const { id } = context.query;
    return {
        props: {
            pacienteId: id,
        },
    };
};
