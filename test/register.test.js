

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import Register from '@/components/register/register';

describe('Register component', () => {
    it('renders correctly in Spanish by default', () => {
        const { getByText, getByLabelText } = render(<Register />);

        expect(getByText('Registro de usuario')).toBeInTheDocument();
        expect(getByLabelText('Cédula')).toBeInTheDocument();
        expect(getByLabelText('Primer Nombre')).toBeInTheDocument();
        expect(getByLabelText('Segundo Nombre')).toBeInTheDocument();
        expect(getByLabelText('Primer Apellido')).toBeInTheDocument();
        expect(getByLabelText('Segundo Apellido')).toBeInTheDocument();
        expect(getByLabelText('ID de Especialidad')).toBeInTheDocument();
        expect(getByLabelText('¿Es Pasante?')).toBeInTheDocument();
        expect(getByLabelText('Contraseña')).toBeInTheDocument();
        expect(getByLabelText('Confirmar Contraseña')).toBeInTheDocument();
        expect(getByText('Registrarse')).toBeInTheDocument();
        expect(getByText('Inicia sesión')).toBeInTheDocument();
    });

    it('shows error message on password mismatch', async () => {
        const { getByLabelText, getByText } = render(<Register />);

        fireEvent.change(getByLabelText('Contraseña'), { target: { value: 'password' } });
        fireEvent.change(getByLabelText('Confirmar Contraseña'), { target: { value: 'different' } });
        fireEvent.submit(getByLabelText('Confirmar Contraseña'));

        await waitFor(() => {
            const invalidFeedback = getByLabelText('Confirmar Contraseña').nextElementSibling; // Get the next element after the Confirmar Contraseña input
            expect(invalidFeedback).toHaveClass('invalid-feedback'); // Verify it has the class invalid-feedback
            expect(invalidFeedback).toHaveTextContent('Las contraseñas no coinciden'); // Verify it contains the expected error message
        });
    });


    it('changes language to English when clicking on English button', () => {
        const { getByText, getByLabelText } = render(<Register />);

        fireEvent.click(getByText('🇺🇸'));

        expect(getByText('User Registration')).toBeInTheDocument();
        expect(getByLabelText('ID Number')).toBeInTheDocument();
        expect(getByLabelText('First Name')).toBeInTheDocument();
        expect(getByLabelText('Middle Name')).toBeInTheDocument();
        expect(getByLabelText('Last Name')).toBeInTheDocument();
        expect(getByLabelText('Second Last Name')).toBeInTheDocument();
        expect(getByLabelText('Specialty ID')).toBeInTheDocument();
        expect(getByLabelText('Intern?')).toBeInTheDocument();
        expect(getByLabelText('Password')).toBeInTheDocument();
        expect(getByLabelText('Confirm Password')).toBeInTheDocument();
        expect(getByText('Register')).toBeInTheDocument();
        expect(getByText('Log in')).toBeInTheDocument();
    });
});
