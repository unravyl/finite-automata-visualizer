import RegularExpression from "./RegularExpression";
import Tree from "./Tree";

class SyntaxTree extends Tree {
    public inputString: string

    constructor(inputString:string, key='0', value='.') {
        super(key,value)
        this.inputString = inputString
    }

    private generateParsedAugementedRegEx() {
        const regEx = new RegularExpression(this.inputString)
        const parsedAugmentedRegEx = regEx.parseAugmentedRegEx()
        return parsedAugmentedRegEx
    }

    public generateSyntaxTree() {
        return this.generateParsedAugementedRegEx()
    }
}

export default SyntaxTree