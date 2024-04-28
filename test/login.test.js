import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'

import Login from '@/components/login/login';

describe('Login component', () => {
    it('renders correctly in spanish by default', () => {
        const { getByText, getByLabelText } = render(<Login />);

        expect(getByText('Inicio de sesión')).toBeInTheDocument();
        expect(getByLabelText('Nombre de usuario')).toBeInTheDocument();
        expect(getByLabelText('Contraseña')).toBeInTheDocument();
        expect(getByText('Ingresar')).toBeInTheDocument();
        expect(getByText('Registrarse')).toBeInTheDocument();
    });

    it('shows error message on incorrect login', async () => {
        const { getByText, getByLabelText, getByRole } = render(<Login />);

        fireEvent.change(getByLabelText('Nombre de usuario'), { target: { value: 'invalid' } });
        fireEvent.change(getByLabelText('Contraseña'), { target: { value: 'invalid' } });
        fireEvent.click(getByRole('button', { name: 'Ingresar' }));

        await waitFor(() => {
            expect(getByText('Usuario o contraseña incorrectos')).toBeInTheDocument();
        });
    });
    it('changes language to English when clicking on English button', () => {
        const { getByText, getByLabelText } = render(<Login />);

        fireEvent.click(getByText('🇺🇸'));

        expect(getByText('Login')).toBeInTheDocument();
        expect(getByLabelText('Username')).toBeInTheDocument();
        expect(getByLabelText('Password')).toBeInTheDocument();
        expect(getByText('Log in')).toBeInTheDocument();
        expect(getByText('Register')).toBeInTheDocument();
    });

    it('logs in successfully with admin credentials', async () => {
        const { getByLabelText, getByRole, findByText } = render(<Login />);

        fireEvent.change(getByLabelText('Nombre de usuario'), { target: { value: 'admin' } });
        fireEvent.change(getByLabelText('Contraseña'), { target: { value: 'admin' } });
        fireEvent.click(getByRole('button', { name: 'Ingresar' }));
        await waitFor(() => {
            findByText('Soy un Dashboard');
        });
    });

});
