import React from 'react';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

const DownloadTemplateButton = () => {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = '/plantilla.xlsx';
        link.download = 'plantilla.xlsx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={handleDownload}
            className=""
            style={{ backgroundColor: '#1D9A6C', borderColor: '#1D9A6C' }}
        >
            Descargar Plantilla
        </Button>
    );
};

export default DownloadTemplateButton;
