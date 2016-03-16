import {Component} from 'angular2/core'

import {DieThrow} from './dice/roll-dice'

@Component({
    selector: 'pap-field',
    templateUrl: 'app/field.component.html'
})
export class FieldComponent {
    rollDiceInputString: string;
    constructor() {
    }
    ngAfterViewInit() {
        componentHandler.upgradeAllRegistered();
    }
    clickRollDice() {
        console.log(this._rollDice(this.rollDiceInputString));
    }
    private _rollDice(input: string): Object {
        let dieThrow: DieThrow = new DieThrow(input)
        return dieThrow.rethrow();
    }
}