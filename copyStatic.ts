import fs from 'fs-extra';

/**
 * Copy contents of the static folder into dist
 */

fs.copy('src/static', 'dist/static', (err) => {
    if(err) {
        console.error(err);
    } else {
        console.log('copied static folder');
    }
});

fs.copy('src/css', 'dist/static/css', (err) => {
    err ? console.log(err) : console.log('copied css folder');
})

fs.copy('src/imgs', 'dist/static/imgs', (err) => {
    err ? console.log(err) : console.log('copied imgs folder');
})