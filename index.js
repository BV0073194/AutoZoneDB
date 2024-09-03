const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/autozone', createProxyMiddleware({
  target: 'https://www.autozone.com',
  changeOrigin: true,
  onProxyReq: (proxyReq, req, res) => {
    proxyReq.setHeader('X-Frame-Options', 'ALLOWALL');
    proxyReq.setHeader('Content-Security-Policy', "frame-ancestors 'self'");
  }
}));

app.listen(3000, () => {
  console.log('Proxy server running on port 3000');
});
