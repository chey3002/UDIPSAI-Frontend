import Assignments from '@/components/asignaciones/asignaciones';
import AssignmentDetails from '@/components/asignaciones/asignacionesDetalle';
import MenuWrapper from '@/components/sidebar';
import React, { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';


const Asignaciones = () => {
    const { t } = useTranslation('home');
    const lang = t;
    const [pasanteSeleccionado, setPasanteSeleccionado] = useState(null);

    const handlePasanteSelect = (pasante) => {
        setPasanteSeleccionado(pasante);
    };

    const handlePasanteDeselect = () => {
        setPasanteSeleccionado(null);
    };

    return (
        <MenuWrapper>
            {!pasanteSeleccionado ? (
                <Assignments pasanteSeleccionado={pasanteSeleccionado} handlePasanteSelect={handlePasanteSelect} lang={lang} />
            ) : (
                <AssignmentDetails pasanteSeleccionado={pasanteSeleccionado} handlePasanteDeselect={handlePasanteDeselect} lang={lang} />
            )}
        </MenuWrapper>
    );
};

export default Asignaciones;
