# ADD CERT
- Install certbot
```
sudo apt-get update
sudo apt-get install python-certbot-nginx
```
- Get cert https for your domain
```
sudo certbot --nginx -d pumidoro-music.homes -d www.pumidoro-music.homes
```

- Certbot auto renew every 2 days if the cert is going to expired in 30days, one cert default is 90 days.