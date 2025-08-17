# Deployment Guide - Scala XLA WebAssembly Miner

This guide covers deployment options for the CryptoTab-style Scala (XLA) WebAssembly miner.

## 🚀 Quick Deployment Options

### Option 1: Static File Hosting
The simplest deployment method for immediate use.

**Required Files:**
- `scala-miner.html` (main interface)
- `scala-miner.js` (WebAssembly loader)
- `scala-miner.wasm` (compiled mining core)
- `scala-pool-connector.js` (pool connectivity)

**Steps:**
1. Upload all files to your web server
2. Ensure MIME types are configured:
   - `.wasm` → `application/wasm`
   - `.js` → `application/javascript`
   - `.html` → `text/html`
3. Access via `https://yourdomain.com/scala-miner.html`

### Option 2: CDN Deployment
For global distribution and better performance.

**Recommended CDNs:**
- Cloudflare Pages
- Netlify
- Vercel
- GitHub Pages

**Benefits:**
- Global edge distribution
- Automatic HTTPS
- Fast loading times
- Built-in security features

### Option 3: Self-Hosted Server
For full control and customization.

**Requirements:**
- Web server (Apache, Nginx, or similar)
- HTTPS certificate (required for WebAssembly)
- Proper MIME type configuration

## 🔧 Server Configuration

### Nginx Configuration
```nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com;
    
    # SSL configuration
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Referrer-Policy strict-origin-when-cross-origin;
    
    # MIME types for WebAssembly
    location ~* \.wasm$ {
        add_header Content-Type application/wasm;
        add_header Cache-Control "public, max-age=31536000";
    }
    
    # Main application
    location / {
        root /var/www/scala-miner;
        index scala-miner.html;
        try_files $uri $uri/ =404;
    }
}
```

### Apache Configuration
```apache
<VirtualHost *:443>
    ServerName yourdomain.com
    DocumentRoot /var/www/scala-miner
    
    # SSL configuration
    SSLEngine on
    SSLCertificateFile /path/to/certificate.crt
    SSLCertificateKeyFile /path/to/private.key
    
    # Security headers
    Header always set X-Frame-Options DENY
    Header always set X-Content-Type-Options nosniff
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy strict-origin-when-cross-origin
    
    # MIME type for WebAssembly
    AddType application/wasm .wasm
    
    # Cache control
    <FilesMatch "\.(wasm|js)$">
        ExpiresActive On
        ExpiresDefault "access plus 1 year"
    </FilesMatch>
</VirtualHost>
```

## 🌐 Production Deployment

### Using Cloudflare Pages

1. **Prepare Files:**
   ```bash
   mkdir scala-miner-deploy
   cp scala-miner.html scala-miner-deploy/index.html
   cp scala-miner.js scala-miner-deploy/
   cp scala-miner.wasm scala-miner-deploy/
   cp scala-pool-connector.js scala-miner-deploy/
   ```

2. **Deploy to Cloudflare:**
   - Connect your GitHub repository
   - Set build command: `echo "Static deployment"`
   - Set output directory: `/`
   - Deploy automatically

3. **Configure Custom Domain:**
   - Add your domain in Cloudflare Pages
   - Update DNS records
   - Enable automatic HTTPS

### Using Netlify

1. **Create `netlify.toml`:**
   ```toml
   [build]
     publish = "."
   
   [[headers]]
     for = "*.wasm"
     [headers.values]
       Content-Type = "application/wasm"
       Cache-Control = "public, max-age=31536000"
   
   [[headers]]
     for = "/*"
     [headers.values]
       X-Frame-Options = "DENY"
       X-Content-Type-Options = "nosniff"
       X-XSS-Protection = "1; mode=block"
   ```

2. **Deploy:**
   - Drag and drop files to Netlify dashboard
   - Or connect GitHub repository
   - Custom domain configuration available

### Using Vercel

1. **Create `vercel.json`:**
   ```json
   {
     "headers": [
       {
         "source": "*.wasm",
         "headers": [
           {
             "key": "Content-Type",
             "value": "application/wasm"
           }
         ]
       }
     ]
   }
   ```

2. **Deploy:**
   ```bash
   npx vercel --prod
   ```

## 🔒 Security Considerations

### HTTPS Requirement
WebAssembly requires HTTPS in production:
- Obtain SSL certificate (Let's Encrypt recommended)
- Configure proper SSL/TLS settings
- Redirect HTTP to HTTPS

### Content Security Policy
Add CSP headers for enhanced security:
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               connect-src 'self' wss:; 
               style-src 'self' 'unsafe-inline';">
```

### Security Headers
Essential security headers:
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

## 📊 Performance Optimization

### File Compression
Enable gzip/brotli compression:
```nginx
# Nginx
gzip on;
gzip_types application/wasm application/javascript text/html text/css;

# Apache
LoadModule deflate_module modules/mod_deflate.so
<Location />
    SetOutputFilter DEFLATE
    SetEnvIfNoCase Request_URI \.(?:gif|jpe?g|png)$ no-gzip dont-vary
</Location>
```

### Caching Strategy
```nginx
# Long-term caching for static assets
location ~* \.(wasm|js)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# Short-term caching for HTML
location ~* \.html$ {
    expires 1h;
    add_header Cache-Control "public, must-revalidate";
}
```

### CDN Configuration
- Enable automatic minification
- Use HTTP/2 push for critical resources
- Configure edge caching rules
- Enable Brotli compression

## 🔧 Monitoring & Analytics

### Performance Monitoring
```javascript
// Add to your deployment
if ('performance' in window) {
    window.addEventListener('load', () => {
        const timing = performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.log('Page load time:', loadTime + 'ms');
    });
}
```

### Error Tracking
```javascript
window.addEventListener('error', (event) => {
    // Send error data to your monitoring service
    console.error('Mining error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
});
```

### Usage Analytics
Consider privacy-friendly analytics:
- Plausible Analytics
- Fathom Analytics
- Self-hosted Matomo

## 🚀 Scaling Considerations

### Load Balancing
For high-traffic deployments:
```nginx
upstream scala_miners {
    server miner1.yourdomain.com;
    server miner2.yourdomain.com;
    server miner3.yourdomain.com;
}

server {
    location / {
        proxy_pass http://scala_miners;
    }
}
```

### Geographic Distribution
- Deploy to multiple regions
- Use GeoDNS for routing
- Consider regional mining pools
- Optimize for local regulations

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] Test in multiple browsers
- [ ] Verify WebAssembly loading
- [ ] Test pool connectivity
- [ ] Check mobile responsiveness
- [ ] Validate wallet address handling
- [ ] Test mining intensity controls

### Security Checklist
- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] CSP policy implemented
- [ ] MIME types properly set
- [ ] Error handling implemented
- [ ] User consent system working

### Performance Checklist
- [ ] File compression enabled
- [ ] Caching headers configured
- [ ] CDN setup (if applicable)
- [ ] Load testing completed
- [ ] Mobile performance verified
- [ ] WebAssembly optimization confirmed

### Post-Deployment
- [ ] Monitor error rates
- [ ] Track performance metrics
- [ ] Verify pool connections
- [ ] Test from different locations
- [ ] Monitor resource usage
- [ ] Collect user feedback

## 🔄 Updates & Maintenance

### Version Management
```bash
# Create versioned deployments
mkdir releases/v1.0.0
cp *.html *.js *.wasm releases/v1.0.0/

# Symlink current version
ln -sf releases/v1.0.0 current
```

### Automated Deployment
```yaml
# GitHub Actions example
name: Deploy Scala Miner
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Emscripten
        run: |
          git clone https://github.com/emscripten-core/emsdk.git
          cd emsdk && ./emsdk install latest && ./emsdk activate latest
      - name: Build
        run: |
          source emsdk/emsdk_env.sh
          make clean && make
      - name: Deploy
        run: |
          # Deploy to your hosting service
```

### Rollback Strategy
- Keep previous versions available
- Implement blue-green deployment
- Monitor for issues post-deployment
- Have rollback procedure documented

## 📞 Support & Troubleshooting

### Common Deployment Issues

**MIME Type Errors**
- Ensure `.wasm` files served with `application/wasm`
- Check server configuration
- Verify browser developer tools

**HTTPS Issues**
- WebAssembly requires HTTPS in production
- Check SSL certificate validity
- Verify mixed content warnings

**Performance Issues**
- Enable compression
- Check CDN configuration
- Monitor server resources
- Optimize caching strategy

### Monitoring Commands
```bash
# Check server status
curl -I https://yourdomain.com/scala-miner.html

# Test WebAssembly MIME type
curl -I https://yourdomain.com/scala-miner.wasm

# Monitor server logs
tail -f /var/log/nginx/access.log
```

---

**🎯 Deployment Success**: Your Scala XLA miner should now be accessible globally with optimal performance and security!

