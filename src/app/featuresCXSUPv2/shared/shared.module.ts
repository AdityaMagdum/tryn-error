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
import { HighchartsChartModule } from 'highcharts-angular';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ButtonModule } from 'nice-solaris-ngx/button';
import { CheckboxModule as SolCheckboxModule } from 'nice-solaris-ngx/checkbox';
import { TabsModule as SolTabsModule } from 'nice-solaris-ngx/tabs';
import { TextInputModule as SolTextInputModule } from 'nice-solaris-ngx/text-input';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
// import { MonitoringInstanceDetailsComponent } from '../core-components/monitoring-instance-details/monitoring-instance-details';
// import { MonitoringInstanceDetailsChatMonitoringComponent } from '../core-components/monitoring-instance-details/monitoring-instance-details-chat-monitoring/monitoring-instance-details-chat-monitoring.component';
// import { MonitoringInstanceDetailsScreenMonitoringComponent } from '../core-components/monitoring-instance-details/monitoring-instance-details-screen-monitoring/monitoring-instance-details-screen-monitoring.component';
// import { AgentsSkillsGridPanelComponent } from '../core-components/panels/agents-skills-grid-panel/agents-skills-grid-panel.component';
// import { SkillsGridProficiencyCellEditorComponent } from '../core-components/panels/agents-skills-grid-panel/cell-editor-components/skills-grid-panel-proficiency-cell-editor/skills-grid-proficiency-cell-editor.component';
// import { SkillsAgentStateIconComponent } from '../core-components/panels/agents-skills-grid-panel/cell-renderer-components/skills-agent-state-icon/skills-agent-state-icon.component';
// import { SkillsAgentStateTimestampComponent } from '../core-components/panels/agents-skills-grid-panel/cell-renderer-components/skills-agent-state-timestamp/skills-agent-state-timestamp.component';
// import { AssignAgentsComponent } from '../core-components/panels/agents-skills-grid-panel/cell-renderer-components/assign-agents/assign-agents.component';
// import { SkillsPanelContextMenuComponent } from '../core-components/panels/agents-skills-grid-panel/cell-renderer-components/context-menu/skills-panel-context-menu.component';
// import { SkillGridPanelProficiencyComponent } from '../core-components/panels/agents-skills-grid-panel/cell-renderer-components/skill-grid-panel-proficiency/skill-grid-panel-proficiency.component';
// import { SkillsPanelActionPopoverRendererComponent } from '../core-components/panels/agents-skills-grid-panel/cell-renderer-components/skills-panel-action-renderer/skills-panel-action-renderer.component';
// import { SharedEffects } from './+state/shared.effects';
// import { sharedReducer } from './+state/shared.reducer';
// import { NoResultsComponent } from './components/no-results/no-results.component';
// import { ToggleSupervisorViewComponent } from './components/toggle-supervisor-view/toggle-supervisor-view.component';
// import { PipesModule } from './pipes/pipes.module';
// import { SkillsPanelActionPopoverComponent } from './components/skills-panel-action-popover/skills-panel-action-popover.component';
// import { AgentDayScheduleComponent } from './components/agent-day-schedule/agent-day-schedule.component';
// import { AgentDayScheduleService } from './wfm/services/agent-day-schedule.service';
import { UserScheduleService, ActivityCodesService } from 'cxone-wfm-shared-components/services-lib';
@NgModule({
  declarations: [
    // AgentsVoiceMonitoringModalComponent,
    // CustomHeaderComponent,
    // NoResultsComponent
    // ToggleSupervisorViewComponent,
    // MonitoringInstanceDetailsComponent,
    // MonitoringInstanceDetailsScreenMonitoringComponent,
    // MonitoringInstanceDetailsChatMonitoringComponent,
    // NoResultsComponent,
    // ToggleSupervisorViewComponent,
    // //New Import Skill Panel
    // AgentsSkillsGridPanelComponent,
    // SkillsAgentStateIconComponent,
    // SkillsAgentStateTimestampComponent,
    // AssignAgentsComponent,
    // SkillsPanelContextMenuComponent,
    // SkillGridPanelProficiencyComponent,
    // SkillsPanelActionPopoverRendererComponent,
    // SkillsGridProficiencyCellEditorComponent,
    // SkillsPanelActionPopoverComponent,
    // AgentDayScheduleComponent
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
    HighchartsChartModule,
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
    TranslationModule
  ],
  providers: [UserScheduleService, ActivityCodesService],
  exports: [
    // AgentsVoiceMonitoringModalComponent,
    // CustomHeaderComponent,
    // NoResultsComponent
    // ToggleSupervisorViewComponent,
    // MonitoringInstanceDetailsComponent,
    // MonitoringInstanceDetailsScreenMonitoringComponent,
    // MonitoringInstanceDetailsChatMonitoringComponent,
    // NoResultsComponent,
    // ToggleSupervisorViewComponent,
    // //New Import Skill Panel
    // AgentsSkillsGridPanelComponent,
    // SkillsAgentStateIconComponent,
    // SkillsAgentStateTimestampComponent,
    // AssignAgentsComponent,
    // SkillsPanelContextMenuComponent,
    // SkillGridPanelProficiencyComponent,
    // SkillsPanelActionPopoverRendererComponent,
    // SkillsGridProficiencyCellEditorComponent,
    // SkillsPanelActionPopoverComponent,
    // AgentDayScheduleComponent
  ],
  // entryComponents: [AgentsVoiceMonitoringModalComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class SharedModule {}
