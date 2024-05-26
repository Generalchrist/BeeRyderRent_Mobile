"# BeeRyderRent_Mobile" 


## Api Config

- {your api path}\WebAPI\Properties\launchSettings.json go here and change the port number to your port number

- like this
```json
{
  "$schema": "http://json.schemastore.org/launchsettings.json",
  "iisSettings": {
    "windowsAuthentication": false,
    "anonymousAuthentication": true,
    "iisExpress": {
      "applicationUrl": "http://127.0.0.1:47376",
      "sslPort": 44371
    }
  },
  "profiles": {
    "IIS Express": {
      "commandName": "IISExpress",
      "launchBrowser": true,
      "launchUrl": "swagger",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    },
    "WebAPI": {
      "commandName": "Project",
      "launchBrowser": true,
      "launchUrl": "swagger",
      "applicationUrl": "https://127.0.0.1:5001;http://127.0.0.1:5000",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    }
  }
}

```
- then on your mobile emulator open the proxy settings and set the host name 10.0.2.2 and the port number to your port number

- om my test it takes a couple of minutes to load the data from the server so please be patient