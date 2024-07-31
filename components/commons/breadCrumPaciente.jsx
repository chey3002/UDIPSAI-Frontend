import { useUserContext } from "@/assets/useUserContext";
import { Breadcrumb, } from "antd";
import useTranslation from 'next-translate/useTranslation';

export default function BreadCrumbPacientes({ idPaciente, page }) {
    const { t } = useTranslation('home');
    const { user } = useUserContext();

    if (idPaciente) {
        var items = [
            { title: t('Dashboard'), href: '/dashboard' },
            { title: t('Pacientes'), href: `/pacientes/` },
            {
                title: page, menu: {
                    items: [
                        {
                            label: (
                                <a rel="noopener noreferrer" href={`/pacientes/${idPaciente}`}>
                                    {t('VerPaciente')}
                                </a>
                            ),
                        },
                        {
                            label: (
                                <a rel="noopener noreferrer" href={`/pacientes/edit/${idPaciente}`}>
                                    {t('EditarPaciente')}
                                </a>
                            ),
                        },
                        {
                            label: (
                                <a rel="noopener noreferrer" href={`/pacientes/seguimientos/${idPaciente}`}>
                                    {t('SeguimientosPacientes')}
                                </a>
                            ),
                        },
                        {
                            label: (
                                <a rel="noopener noreferrer" href={`/pacientes/tests/${idPaciente}`}>
                                    {t('TestPacientes')}
                                </a>
                            ),
                        },
                    ]
                }
            }

        ]
    } else {
        var items = [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Pacientes', href: `/pacientes/` },
            user.permisos["pacientes"] ? {
                title: page, menu: {
                    items: [
                        {
                            label: (
                                <a rel="noopener noreferrer" href={`/pacientes/new`}>
                                    {t('NuevoPaciente')}
                                </a>
                            ),
                        }
                    ]
                }
            } : { title: page }

        ]
    }
    return <Breadcrumb items={items} />
}