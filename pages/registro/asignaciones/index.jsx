'use client';
import Assignments from '@/components/asignaciones/asignaciones';
import AssignmentDetails from '@/components/asignaciones/asignacionesDetalle';
import MenuWrapper from '@/components/sidebar';
import React, { useState } from 'react';


const MainComponent = () => {
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
                <Assignments pasanteSeleccionado={pasanteSeleccionado} handlePasanteSelect={handlePasanteSelect} />
            ) : (
                <AssignmentDetails pasanteSeleccionado={pasanteSeleccionado} handlePasanteDeselect={handlePasanteDeselect} />
            )}
        </MenuWrapper>
    );
};

export default MainComponent;
