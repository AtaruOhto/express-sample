const console = require('console');

export const stdOut = (msg: string) => {
    console.log(msg);
};

export const stdErr = (msg: string) => {
    console.error(msg);
};
