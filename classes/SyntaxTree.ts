import Tree from "./Tree";

class SyntaxTree extends Tree {
    public regex: string

    constructor(key: string, value=key, regex) {
        super(key,value)
        this.regex = regex
    }


}