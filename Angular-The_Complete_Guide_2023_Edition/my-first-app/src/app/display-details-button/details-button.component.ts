import { Component } from '@angular/core'

@Component({
    selector: 'app-details-button',
    templateUrl: 'details-button.component.html',
    styles: [`
        .online{
            color: white
        }
    `]
})

export class DetailsButtonComponent{
    toggle = false
    buttonClicks = 0;

    onToggle = () => {
        this.toggle = !this.toggle
    }
    onClick = () => {
        this.buttonClicks += 1;
    }
}