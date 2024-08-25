import { useUserContext } from "@/assets/useUserContext";
import { Breadcrumb } from "antd";
import useTranslation from 'next-translate/useTranslation';

export default function BreadCrumbPacientes({ idPaciente, page }) {
    const { t } = useTranslation('home');
    const { user } = useUserContext();

    let items = [
        { title: t('Dashboard'), href: '/dashboard' },
        { title: t('Pacientes'), href: `/pacientes/` },
    ];

    if (idPaciente) {
        const patientMenuItems = [
            {
                label: (
                    <a style={{ textDecoration: 'none' }} rel="noopener noreferrer" href={`/pacientes/${idPaciente}`}>
                        {t('VerPaciente')}
                    </a>
                ),
            },
            {
                label: (
                    <a style={{ textDecoration: 'none' }} rel="noopener noreferrer" href={`/pacientes/edit/${idPaciente}`}>
                        {t('EditarPaciente')}
                    </a>
                ),
            },
            {
                label: (
                    <a style={{ textDecoration: 'none' }} rel="noopener noreferrer" href={`/pacientes/seguimientos/${idPaciente}`}>
                        {t('SeguimientosPacientes')}
                    </a>
                ),
            },
            {
                label: (
                    <a style={{ textDecoration: 'none' }} rel="noopener noreferrer" href={`/pacientes/tests/${idPaciente}`}>
                        {t('TestPacientes')}
                    </a>
                ),
            },
            {
                label: (
                    <a style={{ textDecoration: 'none' }} rel="noopener noreferrer" href={`/pacientes/fichaMedica/${idPaciente}`}>
                        {t('FichaMedicaPaciente')}
                    </a>
                ),
            },
            {
                label: (
                    <a style={{ textDecoration: 'none' }} rel="noopener noreferrer" href={`/pacientes/fichaPsicologiaEducativa/${idPaciente}`}>
                        {t('FichaPsicologiaEducativa')}
                    </a>
                ),
            },
        ];

        if (user?.permisos["pacientes"]) {
            patientMenuItems.push({
                label: (
                    <a style={{ textDecoration: 'none' }} rel="noopener noreferrer" href={`/pacientes/cambios/${idPaciente}`}>
                        {t('Cambios')}
                    </a>
                ),
            });
        }

        items.push({
            title: page,
            menu: {
                items: patientMenuItems
            }
        });
    } else {
        if (user.permisos["pacientes"]) {
            items.push({
                title: page,
                menu: {
                    items: [
                        {
                            label: (
                                <a style={{ textDecoration: 'none' }} rel="noopener noreferrer" href={`/pacientes/new`}>
                                    {t('NuevoPaciente')}
                                </a>
                            ),
                        }
                    ]
                }
            });
        } else {
            items.push({ title: page });
        }
    }

    return <Breadcrumb items={items} />;
}
