// Copyright (c) Sixty Large 2014 All Rights Reserved

var fs = require('fs');
var http = require('http');
var querystring = require('querystring');

var webroot = __dirname + '/../../root';

var extensions = {
  'html': {contentType: 'text/html', binary: false},
  'css': {contentType: 'text/css', binary: false},
  'js': {contentType: 'application/javascript', binary: false},
  'gif': {contentType: 'image/gif', binary: true},
  'jpeg': {contentType: 'image/jpeg', binary: true},
  'jpg': {contentType: 'image/jpeg', binary: true},
  'png': {contentType: 'image/png', binary: true},
  'ico': {contentType: 'image/x-icon', binary: true},
  'svg': {contentType: 'image/svg+xml', binary: true},
  'other': {contentType: 'text/plain', binary: false}
};

var redirects = {
  '/': {type: 200, name: '/index.html'},
};

var keywords = {
};

var endpoints = {
};

function getExtension(url) {
  var lastDot = url.lastIndexOf('.') + 1;
  var questionMark = url.indexOf('?');
  if (questionMark != -1) {
    var extension = url.substr(lastDot, questionMark - lastDot);
  } else {
    var extension = url.substr(lastDot);
  }
  return extensions[extension] || extensions['other'];
}

function getFilepath(url) {
  if (url.indexOf('?') == -1) {
    return url;
  }
  // strip get params if there are any
  return url.substr(0, url.indexOf('?'));
}

function endpointCallback(response, data) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end(data, 'utf8');
};

http.createServer(function(request, response) {
  var url = getFilepath(request.url);

  // if it's an endpoint then call the endpoint
  if (endpoints.hasOwnProperty(url)) {
    var queryString = '';
    request.on('data', function(data) {
      queryString += data;
    });
    request.on('end', function() {
      var queryData = querystring.parse(queryString);
      var endpoint = endpoints[url];
      var cb = endpointCallback.bind(this, response);
      if (endpoint.respond) {
        endpoint.respond(queryData, cb);
      } else if (endpoint.respondSync) {
        var data = endpoint.respondSync(queryData);
        cb(data);
      } else {
        console.log('endpoint ' + url + ' does not implement respond or respondSync');
        cb('error: server side issue');
      }
    });
    return;
  }

  // if it's a redirect then fix the url
  if (redirects.hasOwnProperty(url)) {
    if (redirects[url].type == 200) {
      url = redirects[url].name;
    } else if (redirects[url].type == 301) {
      response.writeHead(301, {'Location': redirects[url].name});
      response.end();
      return;
    }
  }

  if (keywords.hasOwnProperty(url)) {
    var handler = new keywords[url](request, response);
    handler.handle();
    return;
  }

  // if the file doesn't exist return a 404
  var filepath = webroot + url;
  if (!fs.existsSync(filepath)) {
    response.writeHead(404);
    response.end();
    return;
  }

  var checkFilename = fs.existsSync(filepath) ? filepath : (fs.existsSync(filepath + '.html') ? filepath + '.html' : filepath + '.html.ejs');
  var checkFile = fs.realpathSync(checkFilename);
  var rootDir = fs.realpathSync(__dirname + '/../../root');
  if (!(checkFile.indexOf(rootDir) == 0)) {
    response.writeHead(404);
    response.end();
    return;
  }

  var extension = getExtension(url);
  response.writeHead(200, {'Content-Type': extension.contentType});
  var contents = fs.readFileSync(filepath, extension.binary ? 'binary' : 'utf8');
  response.end(contents, extension.binary ? 'binary' : 'utf8');
}).listen(8004);
