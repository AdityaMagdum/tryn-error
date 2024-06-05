// import { FeatureToggleGuard } from './featuresCXSUPv2/shared/guard/feature-toggle-guard';

const pathMatch: 'full' | 'prefix' = 'full';

export const APP_ROUTES = [
  {
    path: 'liveMonitoring',
    loadChildren: () => import('./featuresCXSUPv2/pages/pages.module').then(m => m.PagesModule),
    data: {
      requireLogin: true,
      moduleId: 'supervisor',
      pageId: 'liveMonitoring',
      permission: 'cxsup:view cxsup:admin LaunchSupervisor:View cxsupNew:view cxsupAdminView:View',
      translationKey: 'liveMonitoring'
    }
  },
  {
    path: 'admin',
    loadChildren: () => import('./featuresCXSUPv2/admin-view/admin-view.module').then(m => m.AdminViewModule),
    // canActivate: [FeatureToggleGuard],
    data: {
      requireLogin: true,
      moduleId: 'supervisor',
      pageId: 'admin',
      permission: 'cxsupAdminView:View',
      translationKey: 'admin'
    }
  },
  { path: '', redirectTo: 'liveMonitoring', pathMatch: pathMatch },
  { path: '**', redirectTo: 'liveMonitoring', pathMatch: pathMatch }
];
