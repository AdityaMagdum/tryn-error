import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridModule } from 'cxone-components/grid';
import { OverflowTooltipModule } from 'cxone-components/overflow-tooltip';
import { SpinnerModule } from 'cxone-components/spinner';
import { SvgSpriteIconModule } from 'cxone-components/svg-sprite-icon';
import { TranslationModule } from 'cxone-components/translation';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TabsModule } from 'nice-solaris-ngx/tabs';
import { TextInputModule as SolTextInputModule, TextInputModule } from 'nice-solaris-ngx/text-input';
import { ToastrManagerModule as SolToastrManagerModule } from 'nice-solaris-ngx/toastr';
// import { PipesModule } from '../shared/pipes/pipes.module';
import { SharedModule } from '../shared/shared.module';
import { AdminViewComponent } from './admin-view.component';
import { AdminViewRoutingModule } from './admin-view.routing.module';
import { AdminAgentsGridComponent } from './grids/admin-agents-grid/admin-agents-grid.component';
import { AgentDurationComponent } from './grids/admin-agents-grid/renderers/agent-duration/agent-duration.component';
import { AgentStateIconComponent } from './grids/admin-agents-grid/renderers/agent-state-icon/agent-state-icon.component';
import { MediaTypeIconComponent } from './grids/admin-agents-grid/renderers/media-type-icon/media-type-icon.component';
import { AdminSkillsGridComponent } from './grids/admin-skills-grid/admin-skills-grid.component';
import { SkillsActivityComponent } from './grids/admin-skills-grid/renderers/skills/skills.component';
import { WaitTimeComponent } from './grids/admin-skills-grid/renderers/wait-time/wait-time.component';
import { AdminAgentStatesWidgetComponent } from './widgets/admin-agent-states-widget/admin-agent-states-widget.component';
import { AdminSkillsSLAWidgetComponent } from './widgets/admin-skills-sla-widget/admin-skills-sla-widget.component';
import { AdminWidgetsComponent } from './widgets/admin-widgets.component';
import { AdminAgentPanelComponent } from './panels/admin-panels/admin-agent-panel/admin-agent-panel.component';
import { PagesModule } from '../pages/pages.module';
import { AdminPanelsComponent } from './panels/admin-panels/admin-panels.component';

@NgModule({
  declarations: [
    AdminViewComponent,
    AdminAgentsGridComponent,
    AdminSkillsGridComponent,
    AgentDurationComponent,
    AgentStateIconComponent,
    MediaTypeIconComponent,
    SkillsActivityComponent,
    AdminWidgetsComponent,
    AdminAgentStatesWidgetComponent,
    AdminSkillsSLAWidgetComponent,
    WaitTimeComponent,
    AdminPanelsComponent,
    AdminAgentPanelComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SvgSpriteIconModule,
    TabsModule,
    GridModule,
    SpinnerModule,
    SolToastrManagerModule,
    // PipesModule,
    TranslationModule,
    PopoverModule,
    PopoverModule.forRoot(),
    OverflowTooltipModule,
    TooltipModule.forRoot(),
    AdminViewRoutingModule,
    SharedModule,
    TextInputModule,
    SolTextInputModule,
    SvgSpriteIconModule,
    PagesModule
  ],
  exports: [AdminAgentStatesWidgetComponent, AdminSkillsSLAWidgetComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AdminViewModule {}
