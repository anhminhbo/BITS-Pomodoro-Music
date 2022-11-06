# INSTALL NGINX

- The architecture is our vm firewall expose port 22(SSH), 80(HTTP), 443(HTTPS) to the outside
- Therefore, we set up an nginx for our application
- The proxy will proxy to the frontend and backend containers living inside our VM
- Here's how to install nginx:

```
sudo apt update
sudo apt install nginx
```

- Delete default:

```
sudo rm /etc/nginx/sites-available/default
sudo rm /etc/nginx/sites-enabled/default
```

- Create your domain config, here using our domain:

```
sudo touch /etc/nginx/sites-available/pumidoro-music.homes
```

- The contents inside:

```
    client_max_body_size 500M;
    server_name pumidoro-music.homes www.pumidoro-music.homes;
    location / {
            proxy_pass http://localhost:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header x-forwarded-for $remote_addr;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
    }
    location /api {
            # Rewrite /api/test to be /test and req to backend
            # rewrite /api/(.*) /$1 break;
            proxy_pass http://localhost:8080;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host $http_host;
    }

    listen [::]:443 ssl ipv6only=on; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/pumidoro-music.homes/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/pumidoro-music.homes/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot


}
server {
    if ($host = www.pumidoro-music.homes) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    if ($host = pumidoro-music.homes) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


        listen [::]:80;
        listen 80;

        server_name pumidoro-music.homes www.pumidoro-music.homes;
    return 404; # managed by Certbot

}
```

- We create symbolic links to site-enabled

```
sudo ln -s /etc/nginx/sites-available/pumidoro-music.homes /etc/nginx/sites-enabled/pumidoro-music.homes
```

- Verified if nginx config corrected

```
sudo nginx -t
```

- Restart nginx to apply config

```
sudo service nginx restart
```

- Now follow to [Add cert to proxy](https://github.com/anhminhbo/BITS-Pomodoro-Music/blob/minh-dev/docs/app-vm/ADD-CERT.md)
