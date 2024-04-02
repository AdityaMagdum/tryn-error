import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ActionBarModule } from '@niceltd/cxone-domain-components/action-bar';
import { TabsModule } from '@niceltd/cxone-components/tabs';
import { I18NextModule } from 'angular-i18next';
import { SpinnerModule } from '@niceltd/cxone-components/spinner';
import { TranslationModule } from '@niceltd/cxone-components/translation';
import { SvgSpriteIconModule } from '@niceltd/cxone-components/svg-sprite-icon';
import { CoreServicesModule } from '@niceltd/cxone-core-services';
import { CheckboxModule } from '@niceltd/cxone-components/checkbox';
import { NavigationV2Module } from '@niceltd/cxone-domain-components/navigation-v2';
import { ToastrModule } from 'ngx-toastr';
import { ToastrManagerModule } from '@niceltd/cxone-components/toastr';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ModalModule } from '@niceltd/cxone-components/modal';

@NgModule({
    declarations: [
    ],
    imports: [
      I18NextModule.forRoot(),
      ToastrModule.forRoot(),
      PopoverModule.forRoot(),
      DynamicDialogModule,
      ModalModule
    ],
    providers: [
      DialogService
    ],
    exports: [
      ActionBarModule,
      CheckboxModule,
      CommonModule,
      CoreServicesModule,
      FormsModule,
      NavigationV2Module,
      RouterModule,
      SpinnerModule,
      SvgSpriteIconModule,
      TabsModule,
      ToastrManagerModule,
      TranslationModule
    ]
})
export class SharedModule { }