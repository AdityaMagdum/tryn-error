# cxone-webapp-agent-profile-ui
FYI: This is an Angular 17 web application. (It does not use any AngularJS code or Bower components.)

## Pre-requisites
1. Follow the instructions in the [Developer Machine Setup](https://nice-ce-cxone-prod.atlassian.net/wiki/spaces/CXONE/pages/13977084/3+-+Developer+Machine+Setup)
2. You can login to a tenant locally into the admin app.

## Run locally

### 1. Clone this repo
```
git clone https://github.com/nice-cxone/cxone-webapp-agent-profile-ui.git
```

###  2. Install npm dependencies
```
npm ci
```

### 3. Setup nginx locations
```
    location /cxone-boilerplate/ {
        proxy_pass http://127.0.0.1:4200/;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_http_version 1.1;
        proxy_cache_bypass $http_upgrade;
    }
```

### 4. Start the app
```
npm run start
```

### 5. To add new application to CXone
Follow the instructions in the [New Application Setup](https://nice-ce-cxone-prod.atlassian.net/wiki/spaces/CXONE/pages/13977197/4+-+New+Application+Setup)

### 6. Login and GO!
1. Login to your local environment [http://na1.dev.localhost:8088/](http://na1.dev.localhost:8088/)
2. Once you are logged in, enter this url [http://na1.dev.localhost:8088/agent-profile/hello](http://na1.dev.localhost:8088/agent-profile/hello)
