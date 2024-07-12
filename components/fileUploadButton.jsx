import React, { useState } from 'react';
import axios from 'axios';
import { Upload, Button, message, Row, Col } from 'antd';
import { UploadOutlined, FileExcelOutlined, UploadOutlined as UploadIcon } from '@ant-design/icons';
import useTranslation from 'next-translate/useTranslation';

const FileUploadButton = () => {
    const [fileList, setFileList] = useState([]);

    const handleUpload = async () => {
        const formData = new FormData();
        fileList.forEach(file => {
            formData.append('file', file);
        });

        try {
            const response = await axios.post(process.env['BASE_URL'] + "api/pacientes/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            message.success(response.data);
        } catch (error) {
            console.error('Error al subir el archivo:', error);
            message.error('Error al subir el archivo: ' + error.message);
        }
    };
    const { t } = useTranslation('home');
    const lang = t;
    const props = {
        onRemove: file => {
            setFileList(prevFileList => {
                const index = prevFileList.indexOf(file);
                const newFileList = prevFileList.slice();
                newFileList.splice(index, 1);
                return newFileList;
            });
        },
        beforeUpload: file => {
            const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel';
            if (!isExcel) {
                message.error(`${file.name} no es un archivo Excel válido`);
            } else {
                setFileList(prevFileList => [...prevFileList, file]);
            }
            return false;
        },
        fileList,
        accept: '.xls,.xlsx', // Limita los tipos de archivos aceptados a Excel
    };

    return (
        <div className="container">
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
