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