export class RollDice {
    eval(input: string): Object {
        let b: Array<string> = input.replace(/ /g, '').split(/(\+|\-)/g);
        let plus: Array<string> = [];
        let minus: Array<string> = [];
        this._intoArr("+", b, plus);
        this._intoArr("-", b, minus);
        return this._evaluateDices(b[0], plus, minus);
    }

    private _intoArr(char: string, inArr: Array<string>, outArr: Array<string>) {
        while (inArr.indexOf(char) != -1) {
            let i1: number = inArr.indexOf(char);
            let i2: number = i1 + 1;
            outArr.push(inArr[i2]);
            delete inArr[i1];
            delete inArr[i2];
        }
    }

    private _evaluateDices(start: string, plus: Array<string>, minus: Array<string>): Object {
        let resultArr: Array<Object> = [];
        let resultInt: number = 0;

        let temp: Object = this._roll(start);
        resultInt += temp.result;
        resultArr.push({ input: start, output: temp });

        for (let diceID in plus) {
            let dice: string = plus[diceID];
            temp = this._roll(dice);
            resultInt += temp.result;
            resultArr.push({ input: dice, output: temp });
        }


        for (let diceID in minus) {
            let dice: string = minus[diceID];
            temp = this._roll(dice);
            resultInt += temp.result;
            resultArr.push({ input: dice, output: temp });
        }

        return {
            value: resultInt,
            array: resultArr
        }
    }

    private _roll(dice): Object {
        let parts: Array<any> = dice.match(/(\d+)?d(\d+)/);
        if (!parts) {
            return { result: parseInt(dice, 10) };
        } else {
            let result: Object = { result: 0, array: [] };
            for (let i = 0; i < (parts[1] ? parseInt(parts[1], 10) : 1); i++) {
                let temp: number = Math.floor(Math.random() * parseInt(parts[2] - 1, 10)) + 1;
                result.result += temp;
                result.array.push(temp);
            }
            return result;
        }
    }
}