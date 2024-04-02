import {Component, Inject} from '@angular/core';
import {ModalModule, ModalService} from '@niceltd/sol/modal';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {TextInputModule} from '@niceltd/sol/text-input';

@Component({
    template: `
        <sol-modal
                [title]="'Web Worker Messages'"
                [primaryButtonLabel]="'OK'"
                [message]="options.message"
                (closed)="onClose()"
                (dismissed)="onDismiss()">
        </sol-modal>
    `,
    standalone: true,
    imports: [ModalModule, TextInputModule]
})
export class AlertWebWorkerInfoModalExample {
    constructor(private solModalService: ModalService, @Inject(MAT_DIALOG_DATA) public options: any) {}
    onDismiss() {
        this.solModalService.close(false);
    }
    onClose() {
        this.solModalService.close(true);
    }
}