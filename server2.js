// import http from 'http';

// const PORT = process.env.PORT;

// const server = http.createServer((req, res) => {
//   res.setHeader('Content-Type', 'text/html');
//   res.end('<h1>Hello my urban pac</h1>');
// });

// server.listen(PORT, () => {
//   console.log(`your server is running from ${PORT} Port`);
// });

import { createServer } from 'http';
const PORT = process.env.PORT

const users = [
  {id: 1, name: "Urban pac"},
  {id: 2, name: "Gentil Mugisha"},
  {id: 3, name: "Bertin Niyontwari"},
  {id: 4, name: "Lena Paolla"},
];

const server = createServer((req, res) => {
  if(req.url === '/api/users' && req.method === 'GET'){
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(users));
    res.end();
  }else if(req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET') {
    const id = req.url.split('/')[3];
    const user = users.find((user) => user.id === parseInt(id));

    if(user) {
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(user));
      res.end();
    } else{
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 404;
      res.write(JSON.stringify({message: 'User not found'}));
     res.end();
    }
  }
  else{
    res.setHeader('Content-Type', 'application/json');
     res.statusCode = 404;
     res.write(JSON.stringify({message: 'Route not found'}));
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`your server is running from ${PORT} Port`);
});