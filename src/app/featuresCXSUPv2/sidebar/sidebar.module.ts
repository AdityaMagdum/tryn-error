import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { EffectsModule } from '@ngrx/effects';
// import { StoreModule } from '@ngrx/store';
import { AccordionModule } from 'cxone-components/accordion';
import { CheckboxModule } from 'cxone-components/checkbox';
import { GridModule } from 'cxone-components/grid';
import { ModalModule } from 'cxone-components/modal';
import { MultiselectDropdownModule } from 'cxone-components/multiselect-dropdown';
import { NumericSelectorModule } from 'cxone-components/numeric-selector';
import { OverflowTooltipModule } from 'cxone-components/overflow-tooltip';
import { RadioModule } from 'cxone-components/radio';
import { SingleselectDropdownModule } from 'cxone-components/singleselect-dropdown';
import { SlideToggleModule } from 'cxone-components/slide-toggle';
import { SpinnerModule } from 'cxone-components/spinner';
import { SvgSpriteIconModule } from 'cxone-components/svg-sprite-icon';
import { TabsModule } from 'cxone-components/tabs';
import { TextInputModule } from 'cxone-components/text-input';
import { ToastrManagerModule } from 'cxone-components/toastr';
import { TranslationModule } from 'cxone-components/translation';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ButtonModule } from 'nice-solaris-ngx/button';
import { CheckboxModule as SolCheckboxModule } from 'nice-solaris-ngx/checkbox';
import { TabsModule as SolTabsModule } from 'nice-solaris-ngx/tabs';
import { TextInputModule as SolTextInputModule } from 'nice-solaris-ngx/text-input';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
// import { SharedEffects } from '../shared/+state/shared.effects';
// import { sharedReducer } from '../shared/+state/shared.reducer';
// import { PipesModule } from '../shared/pipes/pipes.module';
// import { AlertMultipleToggleComponent } from './alerts/alert-multiple-toggle/alert-multiple-toggle.component';
// import { AlertComponent } from './alerts/alert/alert.component';
// import { AlertsMonitoringPanelComponent } from './alerts/alert/alerts-monitoring-panel/alerts-monitoring-panel.component';
// import { AlertsClearAllComponent } from './alerts/alerts-clear-all/alerts-clear-all.component';
// import { AlertsConfigurationsComponent } from './alerts/alerts-configurations/alerts-configurations.component';
// import { AlertsPanelComponent } from './alerts/alerts-panel/alerts-panel.component';
// import { AlertsComponent } from './alerts/alerts/alerts.component';
// import { MonitoringInstanceChatComponent } from './monitoring/monitoring-instance/monitoring-instance-chat/monitoring-instance-chat.component';
// import { MonitoringInstanceVoiceComponent } from './monitoring/monitoring-instance/monitoring-instance-voice/monitoring-instance-voice.component';
// import { MonitoringInstanceComponent } from './monitoring/monitoring-instance/monitoring-instance.component';
// import { MonitoringInstancesComponent } from './monitoring/monitoring-instances/monitoring-instances.component';
import { SidebarComponent } from './sidebar.component';
import { QMEvaluationHelperModule } from 'cxone-qm-library/evaluation-helper';
import { FormDesignerService } from 'cxone-qm-library/form-designer';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
// import { EvaluationPanelComponent } from './monitoring/evaluation-panel/evaluation-panel.component';
import { DateRangepickerModule } from 'nice-solaris-ngx/date-range-picker';
// import { FullLogActivityModalComponent } from '../shared/components/modals/full-log-activity-modal/full-log-activity-modal.component';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [
    SidebarComponent
    // AlertsMonitoringPanelComponent,
    // AlertComponent,
    // AlertsComponent,
    // AlertMultipleToggleComponent,
    // AlertsClearAllComponent,
    // AlertsConfigurationsComponent,
    // AlertsPanelComponent,
    // MonitoringInstanceChatComponent,
    // MonitoringInstanceVoiceComponent,
    // MonitoringInstanceComponent,
    // MonitoringInstancesComponent,
    // EvaluationPanelComponent,
    // FullLogActivityModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SingleselectDropdownModule,
    SvgSpriteIconModule,
    TabsModule,
    ButtonModule,
    SolTabsModule,
    TextInputModule,
    SolTextInputModule,
    GridModule,
    SpinnerModule,
    ToastrManagerModule,
    MultiselectDropdownModule,
    NumericSelectorModule,
    RadioModule,
    CheckboxModule,
    SolCheckboxModule,
    ModalModule,
    DynamicDialogModule,
    SlideToggleModule,
    AccordionModule,
    PopoverModule,
    PopoverModule.forRoot(),
    OverflowTooltipModule,
    TooltipModule.forRoot(),
    // StoreModule.forFeature('shared', sharedReducer),
    // EffectsModule.forFeature([SharedEffects]),
    // PipesModule,
    TranslationModule,
    QMEvaluationHelperModule,
    FileUploadModule,
    DateRangepickerModule,
    HighchartsChartModule
  ],
  providers: [
    FormDesignerService,
    {
      provide: 'Upload',
      useClass: FileUploader,
      useValue: {}
    }
  ],
  exports: [
    // HighchartsChartModule,
    SidebarComponent
    // AlertsMonitoringPanelComponent,
    // AlertComponent,
    // AlertsComponent,
    // AlertMultipleToggleComponent,
    // AlertsClearAllComponent,
    // AlertsConfigurationsComponent,
    // AlertsPanelComponent,
    // MonitoringInstanceChatComponent,
    // MonitoringInstanceVoiceComponent,
    // MonitoringInstanceComponent,
    // MonitoringInstancesComponent,
    // EvaluationPanelComponent,
    // FullLogActivityModalComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class SidebarModule {}
