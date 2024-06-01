import React from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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
            variant="success"
            onClick={handleDownload}
            className=""
        >
            <i class="bi bi-download"></i> Descargar Plantilla
        </Button>
    );
};

export default DownloadTemplateButton;
