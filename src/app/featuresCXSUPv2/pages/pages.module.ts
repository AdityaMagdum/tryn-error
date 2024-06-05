import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// import { EffectsModule } from '@ngrx/effects';
// import { StoreModule } from '@ngrx/store';
import { AngularResizeEventModule } from 'angular-resize-event';
import { AccordionModule } from 'cxone-components/accordion';
import { CheckboxModule } from 'cxone-components/checkbox';
import { GridModule } from 'cxone-components/grid';
import { ModalModule } from 'cxone-components/modal';
import { DateTimePickersModule } from 'cxone-components/date-time-pickers';
import { MultiselectDropdownModule } from 'cxone-components/multiselect-dropdown';
import { NumericSelectorModule } from 'cxone-components/numeric-selector';
import { OmnibarModule } from 'cxone-components/omnibar';
import { OverflowTooltipModule } from 'cxone-components/overflow-tooltip';
import { RadioModule } from 'cxone-components/radio';
import { SingleselectDropdownModule } from 'cxone-components/singleselect-dropdown';
import { SlideToggleModule } from 'cxone-components/slide-toggle';
import { SpinnerModule } from 'cxone-components/spinner';
import { SvgSpriteIconModule } from 'cxone-components/svg-sprite-icon';
import { TabsModule } from 'cxone-components/tabs';
import { TextInputModule } from 'cxone-components/text-input';
import { ToastrManagerModule } from 'cxone-components/toastr';
import { ToggleButtonGroupModule } from 'cxone-components/toggle-button-group';
import { TranslationModule } from 'cxone-components/translation';
import { HighchartsChartModule } from 'highcharts-angular';
import { NouisliderModule } from 'ng2-nouislider';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ButtonModule } from 'nice-solaris-ngx/button';
import { CheckboxModule as SolCheckboxModule } from 'nice-solaris-ngx/checkbox';
import { InlineNotificationModule } from 'nice-solaris-ngx/inline-notification';
import { SelectedTagsModule } from 'nice-solaris-ngx/selected-tags';
import { TabsModule as SolTabsModule } from 'nice-solaris-ngx/tabs';
import { TextInputModule as SolTextInputModule } from 'nice-solaris-ngx/text-input';
import { ToastrManagerModule as SolToastrManagerModule } from 'nice-solaris-ngx/toastr';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { SwiperModule } from 'swiper/angular';
// import { AgentsAdminContextMenuComponent } from '../admin-view/grids/admin-agents-grid/cell-renderer-components/admin-context-menu/admin-context-menu.component';
// import { CustomOmnibarComponent } from '../core-components/live-monitoring/custom-omnibar/custom-omnibar.component';
// import { AgentsGridComponent } from '../core-components/live-monitoring/grids/agents-grid/agents-grid.component';
// import { AgentsAgentComponent } from '../core-components/live-monitoring/grids/agents-grid/cell-renderer-components/agent/agent.component';
// import { AgentsContextMenuComponent } from '../core-components/live-monitoring/grids/agents-grid/cell-renderer-components/context-menu/context-menu.component';
// import { AgentsDurationComponent } from '../core-components/live-monitoring/grids/agents-grid/cell-renderer-components/duration/duration.component';
// import { AgentsInteractionComponent } from '../core-components/live-monitoring/grids/agents-grid/cell-renderer-components/interactions/interactions.component';
// import { AgentsStateComponent } from '../core-components/live-monitoring/grids/agents-grid/cell-renderer-components/state/state.component';
// import { AgentsSkillsGridComponent } from '../core-components/live-monitoring/grids/agents-skills-grid/agents-skills-grid.component';
// import { InteractionsAgentComponent } from '../core-components/live-monitoring/grids/interactions-grid/cell-renderer-components/agent/agent.component';
// import { InteractionsContextMenuComponent } from '../core-components/live-monitoring/grids/interactions-grid/cell-renderer-components/context-menu/context-menu.component';
// import { InteractionsDurationComponent } from '../core-components/live-monitoring/grids/interactions-grid/cell-renderer-components/duration/duration.component';
// import { InteractionsInteractionComponent } from '../core-components/live-monitoring/grids/interactions-grid/cell-renderer-components/interactions/interactions.component';
// import { InteractionsStateComponent } from '../core-components/live-monitoring/grids/interactions-grid/cell-renderer-components/state/state.component';
// import { InteractionsGridComponent } from '../core-components/live-monitoring/grids/interactions-grid/interactions-grid.component';
// import { LiveMonitoringComponent } from '../core-components/live-monitoring/live-monitoring/live-monitoring.component';
// import { AgentStatesWidgetComponent } from '../core-components/live-monitoring/widgets/agent-states-widget/agent-states-widget.component';
// import { ChannelDistributionWidgetComponent } from '../core-components/live-monitoring/widgets/channel-distribution-widget/channel-distribution-widget.component';
// import { ContactsCurrentlyHandledComponent } from '../core-components/live-monitoring/widgets/contacts-currently-handled/contacts-currently-handled.component';
// import { ContactsInQueueWidgetComponent } from '../core-components/live-monitoring/widgets/contacts-in-queue-widget/contacts-in-queue-widget.component';
// import { LongestDurationWidgetComponent } from '../core-components/live-monitoring/widgets/longest-duration-widget/longest-duration-widget.component';
// import { LongestWaitTimeWidgetComponent } from '../core-components/live-monitoring/widgets/longest-wait-time-widget/longest-wait-time-widget.component';
// import { SkillsCampaignActivityComponent } from '../core-components/live-monitoring/widgets/queue-widget/cell-renderer-components/skills-campaign/skills-campaign.component';
// import { SkillsActivityComponent } from '../core-components/live-monitoring/widgets/queue-widget/cell-renderer-components/skills/skills.component';
// import { SkillsActivitySLAComponent } from '../core-components/live-monitoring/widgets/queue-widget/cell-renderer-components/sla/sla.component';
// import { SkillsActivityWaitComponent } from '../core-components/live-monitoring/widgets/queue-widget/cell-renderer-components/wait/wait.component';
// import { SlaWidgetComponent } from '../core-components/live-monitoring/widgets/sla-widget/sla-widget.component';
// import { WidgetsComponent } from '../core-components/live-monitoring/widgets/widgets.component';
// import { AgentSkillsPanelActionPopoverComponent } from '../core-components/panels/agent-skills-panel-action-popover/agent-skills-panel-action-popover.component';
// import { AgentsActivityPanelNewContactComponent } from '../core-components/panels/agents-panel/agents-activity-panel/agent-activity-panel-new-contact/agents-activity-panel-new-contact.component';
// import { AgentsActivityPanelNewStateComponent } from '../core-components/panels/agents-panel/agents-activity-panel/agent-activity-panel-new-state/agents-activity-panel-new-state.component';
// import { AgentsActivityPanelNewComponent } from '../core-components/panels/agents-panel/agents-activity-panel/agents-activity-panel-new.component';
// import { AgentsActivityStateComponent } from '../core-components/panels/agents-panel/agents-activity-panel/cell-renderer-components/activity/activity.component';
// import { AgentsContactActivityComponent } from '../core-components/panels/agents-panel/agents-activity-panel/cell-renderer-components/contact-activity/contact-activity.component';
// import { AgentsContactDurationComponent } from '../core-components/panels/agents-panel/agents-activity-panel/cell-renderer-components/contact-duration/contact-duration.component';
// import { AgentsActivityDurationComponent } from '../core-components/panels/agents-panel/agents-activity-panel/cell-renderer-components/duration/duration.component';
// import { ActivityHeaderComponent } from '../core-components/panels/agents-panel/agents-activity-panel/header-components/activity-header/activity-header.component';
// import { AgentsChatContactsPanelComponent } from '../core-components/panels/agents-panel/agents-contacts-panel/agents-chat-contacts-panel/agents-chat-contacts-panel.component';
// import { AgentsContactsPanelComponent } from '../core-components/panels/agents-panel/agents-contacts-panel/agents-contacts-panel.component';
// import { AgentsVoiceContactsPanelComponent } from '../core-components/panels/agents-panel/agents-contacts-panel/agents-voice-contacts-panel/agents-voice-contacts-panel.component';
// import { AgentsPanelComponent } from '../core-components/panels/agents-panel/agents-panel.component';
// import { ContactHandlingPanelComponent } from '../core-components/panels/agents-panel/contact-handling-panel/contact-handling-panel.component';
// import { AgentSkillPanelProficiencyEditorComponent } from '../core-components/panels/agents-panel/new-agents-skills-panel/cell-editor-components/agent-skill-panel-proficiency-editor/agent-skill-panel-proficiency-editor.component';
// import { AgentSkillPanelProficiencyComponent } from '../core-components/panels/agents-panel/new-agents-skills-panel/cell-renderer-components/agent-skill-panel-proficiency/agent-skill-panel-proficiency.component';
// import { AgentSkillsPanelActionPopoverRendererComponent } from '../core-components/panels/agents-panel/new-agents-skills-panel/cell-renderer-components/agent-skills-panel-action-renderer/agent-skills-panel-action-renderer.component';
// import { AssignSkillsComponent } from '../core-components/panels/agents-panel/new-agents-skills-panel/cell-renderer-components/assign-skills/assign-skills.component';
// import { AgentSkillsPanelContextMenuComponent } from '../core-components/panels/agents-panel/new-agents-skills-panel/cell-renderer-components/context-menu/agent-skills-panel-context-menu.component';
// import { AgentSkillPanelSkillComponent } from '../core-components/panels/agents-panel/new-agents-skills-panel/cell-renderer-components/skills/skills.component';
// import { NewAgentSkillsPanelComponent } from '../core-components/panels/agents-panel/new-agents-skills-panel/new-agent-skills-panel.component';
// import { ContactHistoryDurationComponent } from '../core-components/panels/interactions-panel/contact-history-panel/cell-renderer-components/contact-history-duration/contact-history-duration.component';
// import { ContactHistoryStateComponent } from '../core-components/panels/interactions-panel/contact-history-panel/cell-renderer-components/contact-history-state/contact-history-state.component';
// import { ContactHistoryPanelComponent } from '../core-components/panels/interactions-panel/contact-history-panel/contact-history-panel.component';
// import { InteractionsPanelComponent } from '../core-components/panels/interactions-panel/interactions-panel.component';
// import { RtigPanelComponent } from '../core-components/panels/interactions-panel/rtig-panel/rtig-panel.component';
// import { SharedEffects } from '../shared/+state/shared.effects';
// import { sharedReducer } from '../shared/+state/shared.reducer';
// import { AdminAgentsActionPopoverComponent } from '../shared/components/admin-agents-action-popover/admin-agents-action-popover.component';
// import { AgentsActionPopoverComponent } from '../shared/components/agents-action-popover/agents-action-popover.component';
// import { InteractionsActionPopoverComponent } from '../shared/components/interactions-action-popover/interactions-action-popover.component';
// import { AgentsVoiceMonitoringModalComponent } from '../shared/components/modals/agents-voice-monitoring-modal.component';
// import { CustomHeaderComponent } from '../shared/components/shared-rendered-components/custom-header/custom-header.component';
// import { MultiselectSortingDropdownComponent } from '../shared/components/shared-rendered-components/multiselect-sorting-dropdown/multiselect-sorting-dropdown.component';
// import { PipesModule } from '../shared/pipes/pipes.module';
// import { SharedModule } from '../shared/shared.module';
// import { LiveMonitoringPageComponent } from './live-monitoring-page/live-monitoring-page.component';
// import { PagesRoutingModule } from './pages.routing.module';
// import { SchedulePanelComponent } from '../core-components/panels/agents-panel/agents-schedule-panel/schedule-panel.component';
// import { AgentScheduleComponent } from '../shared/components/agent-schedule/agent-schedule.component';

@NgModule({
  declarations: [
    // CustomHeaderComponent,
    // LiveMonitoringPageComponent,
    // LiveMonitoringComponent,
    // AgentsVoiceMonitoringModalComponent,
    // CustomOmnibarComponent,
    // WidgetsComponent,
    // // Popover
    // AgentsActionPopoverComponent,
    // AdminAgentsActionPopoverComponent,
    // InteractionsActionPopoverComponent,
    // // Agents Grid
    // AgentsGridComponent,
    // AgentsAgentComponent,
    // AgentsContextMenuComponent,
    // AgentsDurationComponent,
    // AgentsInteractionComponent,
    // AgentsStateComponent,
    // // Skill Grid
    // AgentsSkillsGridComponent,
    // // Interaction Grid
    // InteractionsGridComponent,
    // InteractionsAgentComponent,
    // InteractionsContextMenuComponent,
    // InteractionsDurationComponent,
    // InteractionsInteractionComponent,
    // InteractionsStateComponent,
    // //New Import Agent Panel
    // AgentsPanelComponent,
    // ContactHandlingPanelComponent,
    // SchedulePanelComponent,
    // AgentsAdminContextMenuComponent,
    // AgentsContactsPanelComponent,
    // AgentsVoiceContactsPanelComponent,
    // AgentsChatContactsPanelComponent,
    // AgentsActivityPanelNewComponent,
    // ActivityHeaderComponent,
    // AgentsActivityDurationComponent,
    // AgentsContactDurationComponent,
    // AgentsContactActivityComponent,
    // AgentsActivityStateComponent,
    // AgentsActivityPanelNewStateComponent,
    // AgentsActivityPanelNewContactComponent,
    // //New Import Interaction Panel
    // InteractionsPanelComponent,
    // RtigPanelComponent,
    // ContactHistoryPanelComponent,
    // ContactHistoryStateComponent,
    // ContactHistoryDurationComponent,
    // // Widgets
    // AgentStatesWidgetComponent,
    // ChannelDistributionWidgetComponent,
    // ContactsInQueueWidgetComponent,
    // LongestDurationWidgetComponent,
    // LongestWaitTimeWidgetComponent,
    // SkillsActivityComponent,
    // SkillsCampaignActivityComponent,
    // SkillsActivitySLAComponent,
    // SkillsActivityWaitComponent,
    // SlaWidgetComponent,
    // AgentSkillsPanelActionPopoverComponent,
    // NewAgentSkillsPanelComponent,
    // AgentSkillsPanelContextMenuComponent,
    // AssignSkillsComponent,
    // AgentSkillsPanelActionPopoverRendererComponent,
    // AgentSkillPanelProficiencyComponent,
    // AgentSkillPanelSkillComponent,
    // AgentSkillPanelProficiencyEditorComponent,
    // ContactsCurrentlyHandledComponent,
    // // Monitoring moved to shared module as required for admin view as well
    // // MonitoringInstanceDetailsScreenMonitoringComponent,
    // // MonitoringInstanceDetailsChatMonitoringComponent,
    // MultiselectSortingDropdownComponent,
    // AgentScheduleComponent
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
    SolToastrManagerModule,
    MultiselectDropdownModule,
    NumericSelectorModule,
    RadioModule,
    CheckboxModule,
    SolCheckboxModule,
    DateTimePickersModule,
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
    // PagesRoutingModule,
    RouterModule,
    AngularResizeEventModule,
    OmnibarModule,
    ToggleButtonGroupModule,
    NouisliderModule,
    // PipesModule,
    TranslationModule,
    SelectedTagsModule,
    SwiperModule,
    InlineNotificationModule
    // SharedModule
  ],
  exports: [
    // SwiperModule,
    // CustomHeaderComponent,
    // WidgetsComponent,
    // // Popover
    // AgentsActionPopoverComponent,
    // AdminAgentsActionPopoverComponent,
    // InteractionsActionPopoverComponent,
    // CustomOmnibarComponent,
    // // Agents Grid
    // AgentsGridComponent,
    // AgentsAgentComponent,
    // AgentsContextMenuComponent,
    // AgentsAdminContextMenuComponent,
    // AgentsDurationComponent,
    // AgentsInteractionComponent,
    // AgentsStateComponent,
    // Skill Grid
    // AgentsSkillsGridComponent,
    // // Interaction Grid
    // InteractionsGridComponent,
    // InteractionsAgentComponent,
    // InteractionsContextMenuComponent,
    // InteractionsDurationComponent,
    // InteractionsInteractionComponent,
    // InteractionsStateComponent,
    // //New Import Agent Panel
    // AgentsPanelComponent,
    // ContactHandlingPanelComponent,
    // SchedulePanelComponent,
    // AgentsContactsPanelComponent,
    // AgentsVoiceContactsPanelComponent,
    // AgentsChatContactsPanelComponent,
    // AgentsActivityPanelNewComponent,
    // ActivityHeaderComponent,
    // AgentsActivityDurationComponent,
    // AgentsContactDurationComponent,
    // AgentsContactActivityComponent,
    // AgentsActivityStateComponent,
    // AgentsActivityPanelNewStateComponent,
    // AgentsActivityPanelNewContactComponent,
    // //New Import Interaction Panel
    // InteractionsPanelComponent,
    // RtigPanelComponent,
    // ContactHistoryPanelComponent,
    // ContactHistoryStateComponent,
    // ContactHistoryDurationComponent,
    // Widgets
    // AgentStatesWidgetComponent,
    // ChannelDistributionWidgetComponent,
    // ContactsInQueueWidgetComponent,
    // LongestDurationWidgetComponent,
    // LongestWaitTimeWidgetComponent,
    // SkillsActivityComponent,
    // SkillsCampaignActivityComponent,
    // SkillsActivitySLAComponent,
    // SkillsActivityWaitComponent,
    // SlaWidgetComponent,
    // AgentsVoiceMonitoringModalComponent,
    // AgentSkillsPanelActionPopoverComponent,
    // NewAgentSkillsPanelComponent,
    // AgentSkillsPanelContextMenuComponent,
    // AssignSkillsComponent,
    // AgentSkillsPanelActionPopoverRendererComponent,
    // AgentSkillPanelProficiencyComponent,
    // AgentSkillPanelSkillComponent,
    // AgentSkillPanelProficiencyEditorComponent,
    // ContactsCurrentlyHandledComponent,
    // MultiselectSortingDropdownComponent,
    // AgentScheduleComponent
  ],
  // entryComponents: [],
  providers: [DialogService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})

export class PagesModule {}
