import Parser from '../classes/Parser';
import { calculateFollowpos, computeFunctions } from '../utils/dfa';

const readline = require('readline-sync');

const repl = async () => {
    console.log('\nRepl v0.1\n');

    while (true) {
        const parser = new Parser();

        const input = readline.question('> ');

        if (!input || input.includes('exit')) {
            process.exit();
        }

        const ast = parser.produceAST(input);
        computeFunctions(ast.body);

        console.log(JSON.stringify(ast));

        const followpos = calculateFollowpos(ast.body);
        const firstpos = ast.body.firstpos;

        console.log(followpos);
        console.log(firstpos);
    }
};

repl();
