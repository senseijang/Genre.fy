import fs from 'fs-extra';

fs.copy('src/static', 'dist/static', (err) => {
    if(err) {
        console.error(err);
    } else {
        console.log('copied static folder');
    }
});