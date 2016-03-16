class Die {
    sides: number;
    value: number;
    constructor(sides: number) {
        this.sides = sides;
        this.rethrow();
    }
    rethrow(): number {
        this.value = Math.ceil(Math.random() * this.sides)
        return this.value;
    }
}

export class DieThrow {
    dieThrow: string;
    throwResult: string;
    private _throwFormat: string;
    private _expandedThrow: string;
    private _operatorArray: Array<string>;
    private _validExpression: RegExp;
    
    constructor(dieThrow: string) {
        this._validExpression = /^(\+|\-)?((\d*d\d+|\d+)(\+|\-))*(\d*d\d+|\d+)$/i;
        this.dieThrow = dieThrow;
        this.throwResult = '';
        this._analyzeThrowString();
    }
    
    rethrow(): string {
        this.throwResult = '';
        for(let i: number = 0; i < this._operatorArray.length; i++) {
            let partial: string = this._expandedThrow.split(/\+|\-/g)[i+1];
            if(/d/gi.test(partial)) {
                this.throwResult += this._operatorArray[i] + new Die(parseInt(partial.split(/d/gi)[1])).value;
            } else {
                this.throwResult += this._operatorArray[i] + partial;
            }
        }
        return this.throwResult + '=' + eval(this.throwResult);
    }
    
    private _analyzeThrowString() {
        this.dieThrow = this.dieThrow.replace(/ /g, '');
        if (this._validExpression.test(this.dieThrow)) {
            this._expandString();
            this.rethrow();
        }
    }
    
    private _expandString() {
        if (/[^(\+|\-)]/gi.test(this.dieThrow.charAt(0))) {
            this.dieThrow = '+' + this.dieThrow;
        }
        this._expandedThrow = '';
        this._operatorArray = this.dieThrow.replace(/[^(\+|\-)]/gi, '').split('');
        this.dieThrow.split(/\+|\-/g).forEach((element: string, index: number) => {
            if (index != 0) {
                let limiter: number;
                let value: string;
                if (/\d+d\d+/gi.test(element)) {
                    limiter = parseInt(element.split(/d/gi)[0]);
                    value = 'd' + element.split(/d/gi)[1];
                } else {
                    limiter = 1;
                    value = element;
                }
                for (let i: number = 0; i < limiter; i++) {
                    this._expandedThrow += this._operatorArray[index - 1] + value;
                }
            }
        });
        this._operatorArray = this._expandedThrow.replace(/[^(\+|\-)]/gi, '').split('');
    }
}