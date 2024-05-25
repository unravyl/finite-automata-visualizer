import Parser from '../classes/Parser';

const readline = require('readline-sync');

const repl = async () => {
    console.log('\nRepl v0.1\n');

    while (true) {
        const input = readline.question('> ');

        const parser = new Parser(input);

        if (!input || input.includes('exit')) {
            process.exit();
        }

        const followpos = parser.followPos;
        const firstpos = parser.firstPos;

        console.log(followpos);
        console.log(firstpos);
    }
};

repl();
