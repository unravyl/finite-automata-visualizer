import regjsparser from 'regjsparser'

class RegularExpression {
    private augmentedRegEx: string;
    public regExString: string

    constructor(inputString: string) {
        const augmentedRegEx = this.augmentRegEx(inputString)
        this.augmentedRegEx = augmentedRegEx
        this.regExString = inputString
    }
 
    public convertToDFA() {
        
    }

    private augmentRegEx(inputString: string): string {
        let augmentedRegEx = inputString
        return augmentedRegEx
    }

    private convertToNFA() {

    }

    public parseAugmentedRegEx() {
        const parsedAugmentedRegEx = regjsparser.parse(this.augmentedRegEx,'')
        return parsedAugmentedRegEx
    }

}

export default RegularExpression;