const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Configure the proxy middleware
app.use('/autozone', createProxyMiddleware({
  target: 'https://www.autozone.com',
  changeOrigin: true,
  pathRewrite: {
    '^/autozone': '', // remove base path from the request
  },
  onProxyReq: (proxyReq, req, res) => {
    // Forward all headers including query parameters
    proxyReq.setHeader('X-Frame-Options', 'ALLOWALL');
    proxyReq.setHeader('Content-Security-Policy', "frame-ancestors 'self'");
  },
  onProxyRes: (proxyRes, req, res) => {
    // Modify response headers if necessary
  },
}));

// Start the server
app.listen(3000, () => {
  console.log('Proxy server running on port 3000');
});
