const pathMatch: 'full' | 'prefix' = 'full';

export const APP_ROUTES = [
  // {
  //   path: 'insights',
  //   loadChildren: () => import('./featuresCXSUPv2/insights/insights.module').then(m => m.InsightsModule),
  //   data: {
  //     requireLogin: true,
  //     moduleId: 'supervisor',
  //     pageId: 'insights',
  //     permission: 'cxsupViewInsightOverview:view LaunchSupervisor:View cxsupNew:view',
  //     translationKey: 'insights'
  //   }
  // },
  // {
  //   path: 'liveMonitoring',
  //   loadChildren: () => import('./featuresCXSUPv2/live-monitoring/live-monitoring.module').then(m => m.LiveMonitoringModule),
  //   data: {
  //     requireLogin: true,
  //     moduleId: 'supervisor',
  //     pageId: 'liveMonitoring',
  //     permission: 'cxsup:view cxsup:admin LaunchSupervisor:View cxsupNew:view',
  //     translationKey: 'liveMonitoring'
  //   }
  // },
  { path: '', redirectTo: 'insights', pathMatch: pathMatch },
  { path: '**', redirectTo: 'insights', pathMatch: pathMatch }
];
