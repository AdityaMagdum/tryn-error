/* eslint-disable no-undef */
/* eslint-disable quotes */
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup } from '@angular/forms';
import { PostConstraintsService } from '../../shared/services/agent-profile/post-constraints.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-phone-settings',
  templateUrl: './phone-settings.component.html',
  styleUrls: ['./phone-settings.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PhoneSettingsComponent implements OnInit {
  constraints: any[];
  @Input() public state: any[];
  selectedOptions: string[] = [];
  formData: any;
  // selectedOptions: string;
  constructor(private postConstraints: PostConstraintsService) {
    this.formData = {
      tenantID: 1,
      phoneConstraints: []
    };
  }
  ngOnInit() {
    this.selectedOptions = new Array(this.state.length).fill('');
  }
  saveForm(form: FormGroup) {
    const formData = this.formData;
    const phoneConstraints = formData.phoneConstraints;

    this.state.forEach((label, i) => {
      const selectedOption = this.selectedOptions[i];
      phoneConstraints.push({
        key: label,
        constraintID: i + 10,
        value: selectedOption,
        default: 'Enabled'
      });
    });
    this.postConstraints.postConstraints(this.formData);
    form.reset();
  }

  cancelEdit(form: FormGroup) {
    form.reset();
  }
}
