/*eslint-disable no-console*/
import fs from 'fs';
import cheerio from 'cheerio';
import colors from 'colors';

fs.readFile('src/admin/index.html', 'utf8', (err, markup) => {
  if (err) {
    return console.log(err);
  }

  const $ = cheerio.load(markup);

  $('head').prepend('<link rel="stylesheet" href="/admin.css">');

  fs.writeFile('dist/admin/index.html', $.html(), 'utf8', function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('admin/index.html written to /dist'.green);
  });
});


fs.readFile('src/web/index.html', 'utf8', (err, markup) => {
  if (err) {
    return console.log(err);
  }

  const $ = cheerio.load(markup);

  $('head').prepend('<link rel="stylesheet" href="/styles.css">');

  fs.writeFile('dist/web/index.html', $.html(), 'utf8', function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('web/index.html written to /dist'.green);
  });
});
