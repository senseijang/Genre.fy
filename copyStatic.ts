import fs from 'fs-extra';

fs.copy('src/static', 'dist/static', (err) => {
    if(err) {
        console.error(err);
    } else {
        console.log('copied static folder');
    }
});

fs.copy('src/css', 'dist/css', (err) => {
    err ? console.log(err) : console.log('copied css folder');
})