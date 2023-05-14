const http = require('http');
const fs = require('fs');

HTTP => (request, response)

http.createServer((request,response)=>{

  const file = request.url == '/' ? './www/index.html' : `./www${request.url}`;


  if(request.method == "POST"){
    let data = [];
    request.on("data", value => {
        data.push(value);
    }).on("end", () => {    
        let params =Buffer.concat(data).toString();
        cleanParams = params.replaceAll("&"," ");
        cleanParams = cleanParams.replaceAll("+"," ");
        cleanParams = cleanParams.replaceAll("%40","@");
        cleanParams = cleanParams.replaceAll("%2C",",");
        fs.appendFileSync('contact.txt', cleanParams + "\n", 'utf-8')
    })
}

  //const data = fs.readFileSync('./www/index.html');
  fs.readFile(file,(err,data)=>{
    if(err){
      response.writeHead(404,{"Content-Type":"text/html"});
      response.write("Not found");
      response.end();
    }else{
      const extension = request.url.split('.').pop();
      switch (extension) {
        case 'txt':
          response.writeHead(200,{"Content-Type":"text/plane"});
          break;
        case 'html':
          response.writeHead(200,{"Content-Type":"text/html"});
          break;
        case 'css':
        response.writeHead(200,{"Content-Type":"text/css"});
        break;
        case 'ico':
        response.writeHead(200,{"Content-Type":"image/x-icon"});
        break;
        case 'jpg':
        response.writeHead(200,{"Content-Type":"image/jpeg"});
        break;
        case 'png':
        response.writeHead(200,{"Content-Type":"image/png"});
        break;
        case 'js':
        response.writeHead(200,{"Content-Type":"text/javascript"});
        break;
        default:
        response.writeHead(200,{"Content-Type":"text/html"});
        break;
      }
      response.write(data);
      response.end();
    }
  });
}).listen(8888);
