# FIX-REACT-BUILD-ENV
- Go to frontend folder and install runtime-env-cra
```
npm i runtime-env-cra
```

- in frontend/public
- Create runtime-env.js:
```javascript
window.__RUNTIME_CONFIG__ = {"NODE_ENV":"development","WDS_SOCKET_PORT":"0","BACKEND_URL":"http://localhost:8080"};
```
- In index.html, add this to the head tag:
```javascript
<script src="%PUBLIC_URL%/runtime-env.js"></script>

```
- In package.json, replace start with this:
```json
"start": "NODE_ENV=development runtime-env-cra --config-name=./public/runtime-env.js && react-scripts start"
```