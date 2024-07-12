import React from 'react';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import useTranslation from 'next-translate/useTranslation';

const DownloadTemplateButton = () => {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = '/plantilla.xlsx';
        link.download = 'plantilla.xlsx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const { t } = useTranslation('home');
    const lang = t;
    return (
        <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={handleDownload}
            className=""
            style={{ backgroundColor: '#1D9A6C', borderColor: '#1D9A6C' }}
        >
            {lang('descargarPlantilla')}
        </Button>
    );
};

export default DownloadTemplateButton;
