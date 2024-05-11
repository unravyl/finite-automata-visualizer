import regjsparser from 'regjsparser'

class RegularExpression {
    public value: string;

    constructor(value: string) {
        this.value = value
    }

    public convertToDFA() {
        
    }

    private convertToNFA() {

    }

    public generateSyntaxTree() {
        const syntaxTree = regjsparser.parse(this.value,'')
        return syntaxTree
    }

}

export default RegularExpression;