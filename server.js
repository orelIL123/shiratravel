const http = require('http');
const fs = require('fs');
const path = require('path');
const https = require('https');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url);
    let filePath = '.' + parsedUrl.pathname;
    
    if (parsedUrl.pathname === '/proxy-api/chat') {
        // Handle CORS for API requests
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        
        // Handle OPTIONS request (preflight)
        if (req.method === 'OPTIONS') {
            res.writeHead(200);
            res.end();
            return;
        }
        
        // For POST requests
        if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            
            req.on('end', () => {
                console.log('Forwarding request to Vercel API');
                
                const options = {
                    hostname: 'orelagantmoney-cs3k6lxd--oreli123s-projects.vercel.app',
                    path: '/api/chat',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': Buffer.byteLength(body)
                    }
                };
                
                const proxyReq = https.request(options, proxyRes => {
                    let responseData = '';
                    
                    proxyRes.on('data', chunk => {
                        responseData += chunk;
                    });
                    
                    proxyRes.on('end', () => {
                        res.writeHead(proxyRes.statusCode, { 'Content-Type': 'application/json' });
                        res.end(responseData);
                    });
                });
                
                proxyReq.on('error', error => {
                    console.error('Proxy error:', error);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'שגיאת שרת פרוקסי' }));
                });
                
                proxyReq.write(body);
                proxyReq.end();
            });
            
            return;
        }
    }
    
    // Handle static files
    if (filePath === './') {
        filePath = './index.html';
    }
    
    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml'
    };
    
    const contentType = mimeTypes[extname] || 'application/octet-stream';
    
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.writeHead(500);
                res.end('Server error: ' + error.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
}); 