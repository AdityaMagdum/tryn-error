import { HelloworldComponent } from './helloworld/helloworld.component';
import { GridDemoComponent } from './grid-demo/grid-demo.component';
import { Routes } from '@angular/router';
import { SolDemoComponent } from './sol-demo/sol-demo.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'hello',
    pathMatch: 'full'
  },
  {
    path: 'hello',
    component: HelloworldComponent,
    data: {
        permission: 'user:view',
        moduleId: 'scheduler',
        pageId: 'angularValidation',
        dirtyCheck: true
    }
  },
  {
    path: 'grid',
    component: GridDemoComponent,
    data: {
        permission: 'user:view',
        moduleId: 'scheduler',
        pageId: 'gridDemo'
    }
  },
  {
    path: 'sol-demo',
    component: SolDemoComponent,
    data: {
        permission: 'user:view',
        moduleId: 'scheduler',
        pageId: 'solDemo'
    }
  }
];
