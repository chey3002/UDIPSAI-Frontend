import { Breadcrumb, } from "antd";
import useTranslation from 'next-translate/useTranslation';

export default function BreadCrumbEspecialista({ cedula, page }) {
    const { t } = useTranslation('home');

    if (cedula) {
        var items = [
            { title: t('Dashboard'), href: '/dashboard' },
            { title: t('especialistas'), href: `/registro/` },
            {
                title: page, menu: {
                    items: [
                        {
                            label: (
                                <a rel="noopener noreferrer" href={`/registro/${cedula}`}>
                                    {t('Ver')}
                                </a>
                            ),
                        },
                        {
                            label: (
                                <a rel="noopener noreferrer" href={`/registro/edit/${cedula}`}>
                                    {t('editar')}
                                </a>
                            ),
                        }
                    ]

                }
            }
        ]
    } else {
        var items = [
            { title: t('Dashboard'), href: '/dashboard' },
            { title: t('especialistas'), href: `/registro/` },
            {
                title: page, menu: {
                    items: [
                        {
                            label: (
                                <a rel="noopener noreferrer" href={`/registro/new`}>
                                    {t('nuevo')}
                                </a>
                            ),
                        }
                    ]
                }
            }
        ]
    }
    return <Breadcrumb items={items} />
}