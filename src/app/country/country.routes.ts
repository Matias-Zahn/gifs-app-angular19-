import { Routes } from '@angular/router';
import { CountryLayout } from './layouts/country-layout/country-layout';
import ByCapitalPage from './pages/by-capital-page/by-capital-page';
import { CountryPage } from './pages/countryPage/countryPage';

export const countryRoutes: Routes = [
    {
        path: '',
        component: CountryLayout,
        children: [
            {
                path: 'by-capital',
                component: ByCapitalPage
            },
            {
                path: 'by-country',
                loadComponent: () => import('./pages/by-country-page/by-country-page')
            },
            {
                path: 'by-region',
                loadComponent: () => import('./pages/by-region-page/by-region-page')
            },
            {
                path: 'by/:countryCode',
                component: CountryPage,
            },
            {
                path: '**',
                redirectTo: 'by-capital'
            },
        ]
    },
];

export default countryRoutes;