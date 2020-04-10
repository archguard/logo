var elements = require('./elements.json');
var fs = require('fs');
var request = require('request');

for (let i = 0; i < elements.elements.length; i++) {
    var element = elements.elements[i];
    let newName = element.name.toLowerCase().replace(/\s/g, '-')
    if (!element.image) {
        continue;
    }

    var download = function (uri, filename, callback) {
        request.head(uri, function (err, res, body) {
            if ('image/jpeg' !== res.headers['content-type']) {
                return;
            }
            console.log('content-type:', res.headers['content-type']);
            console.log('content-length:', res.headers['content-length']);

            request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
        });
    };

    download(element.image, 'images/' + newName.replace(/\//g, '') + '.jpg', function () {
        console.log('done');
    });
}
