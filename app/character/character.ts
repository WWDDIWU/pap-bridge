export class Grundwert {
    name: string;
    short: string;
    value: number;
    private _initial: number;
    constructor(json: Object);
    constructor(name: string, short: string, initial: number);
    constructor(jsonOrName: any, short?: string, initial?: number) {
        if(typeof jsonOrName==='string') {
            this.name = jsonOrName;
            this.short = short;
            this.value = initial;
            this._initial = initial;
        } else {
            console.log(jsonOrName);
            this.name = jsonOrName.name;
            this.short = jsonOrName.short;
            this.value = jsonOrName.value;
            this._initial = jsonOrName._initial;
        }
    }
    get initial(): number {
        return this._initial;
    }
}

export class Talentwert extends Grundwert {
    category: number;
    constructor(json: Object);
    constructor(name: string, short: string, initial: number, category: number);
    constructor(jsonOrName: any, short?: string, initial?: number, category?: number) {
        if(typeof jsonOrName==='string') {
            super(jsonOrName, short, initial);
            this.category = category;
        } else {
            super(jsonOrName.name, jsonOrName.short, jsonOrName._initial);
            this.category = jsonOrName.category;
        }
    }
}

export class Character {
    name: string;
    geschlecht: string;
    beruf: string;
    alter: number;
    baseValues: Array<Grundwert>;
    talentValues: Array<Talentwert>;
    constructor(json: Object);
    constructor(baseValues: Array<Grundwert>, talentValues: Array<Talentwert>);
    constructor(jsonOrBaseValues: any, talentValues?: Array<Talentwert>) {
        if(jsonOrBaseValues.baseValues==undefined) {
            this.baseValues = jsonOrBaseValues;
            this.talentValues = talentValues;
        } else {
            this.baseValues = new Array<Grundwert>();
            jsonOrBaseValues.baseValues.forEach((element: Object) => {
                this.baseValues.push(new Grundwert(element));
            });
            this.talentValues = new Array<Talentwert>();
            jsonOrBaseValues.talentValues.forEach((element: Object) => {
                this.talentValues.push(new Talentwert(element));
            });
        }
    }
}