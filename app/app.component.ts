import {Component} from 'angular2/core'

import {FieldComponent} from './field.component'

@Component({
    selector: 'pap-bridge',
    templateUrl: 'app/app.component.html',
    directives: [FieldComponent]
})
export class AppComponent {
    
}