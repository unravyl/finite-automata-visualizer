import Parser from "../classes/Parser";

const readline = require('readline-sync');

const repl = async () => {
    const parser = new Parser()

    console.log("\nRepl v0.1\n")

    while (true) {
        const input = readline.question("> ")

        if (!input || input.includes('exit')) {
            process.exit()
        }

        const ast = parser.produceAST(input)
        console.log(JSON.stringify(ast))
    }
}

repl()