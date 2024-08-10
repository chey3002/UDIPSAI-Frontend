import React, { useState } from 'react';
import axios from 'axios';
import { Upload, Button, message, Row, Col, Modal, Card } from 'antd';
import { FileExcelOutlined, UploadOutlined as UploadIcon } from '@ant-design/icons';
import useTranslation from 'next-translate/useTranslation';

const FileUploadButton = () => {
    const [fileList, setFileList] = useState([]);
    const [modal2Open, setModal2Open] = useState(false);
    const [modal2Content, setModal2Content] = useState([]);
    const handleUpload = async () => {
        if (fileList.length === 0) {
            message.error('No hay archivo para subir');
            return;
        }

        const formData = new FormData();
        formData.append('file', fileList[0]);

        try {
            const response = await axios.post(process.env['BASE_URL'] + "api/pacientes/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            await setModal2Content(response.data);
            await setModal2Open(true);

        } catch (error) {
            console.error('Error al subir el archivo:', error);
            message.error('Error al subir el archivo: ' + error.message);
        }
    };

    const { t } = useTranslation('home');
    const lang = t;

    const props = {
        onRemove: () => {
            setFileList([]);
        },
        beforeUpload: file => {
            const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel';
            if (!isExcel) {
                message.error(`${file.name} no es un archivo Excel válido`);
                return Upload.LIST_IGNORE;
            }

            setFileList([file]); // Replace the existing file with the new one
            return false; // Prevent automatic upload
        },
        multiple: false,
        fileList,
        accept: '.xls,.xlsx', // Limita los tipos de archivos aceptados a Excel
    };
    const copyContent = () => {
        const contentToCopy = modal2Content.join('\n');
        navigator.clipboard.writeText(contentToCopy)
            .then(() => {
                message.success('Contenido copiado al portapapeles');
            })
            .catch(() => {
                message.error('Error al copiar el contenido');
            });
    };
    const handleCloseModal = () => {
        setModal2Open(false);
        setModal2Content([]);
    }
    return (
        <div className="container">
            <Modal
                title="Resumen de la carga"
                centered
                cancelButtonProps={{ style: { display: 'none' } }}
                open={modal2Open}
                onOk={() => setModal2Open(false)}
                style={{ maxWidth: '500px' }}
                footer={[
                    <Button key="back" type="primary" onClick={() => handleCloseModal()}>
                        Ok
                    </Button>,
                    <Button key="copy" onClick={copyContent}>
                        Copiar
                    </Button>,
                ]}
            >
                <Card style={{ maxHeight: '400px', overflowY: 'auto' }}
                >
                    <ul>
                        {modal2Content.map((content, index) => (
                            <li key={index}>{content}</li>
                        ))}
                    </ul>
                </Card>

            </Modal>
            <Row gutter={16}>

                <Col>
                    <Upload {...props}>
                        <Button icon={<FileExcelOutlined />}>{lang('Seleccionar_Archivo')}</Button>
                    </Upload>
                </Col>
                <Col>
                    <Button
                        type="primary"
                        onClick={handleUpload}
                        disabled={fileList.length === 0}
                    >
                        <UploadIcon /> {lang('Subir_Archivo')}
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

export default FileUploadButton;
