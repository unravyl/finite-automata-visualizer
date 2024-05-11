import regjsparser from 'regjsparser'

class RegularExpression {
    public value: string;

    constructor(value: string) {
        const regex = this.augmentRegEx(value)
        this.value = regex
    }
 
    public convertToDFA() {
        
    }

    private augmentRegEx(regex: string): string {
        let augmentedRegEx = regex
        return augmentedRegEx
    }

    private convertToNFA() {

    }

    public generateSyntaxTree() {
        const syntaxTree = regjsparser.parse(this.value,'')
        return syntaxTree
    }

}

export default RegularExpression;