# elma-rc

# Configuration
Добавьте в корень файлы .env и instances.yml

Параметры .env:
```dotenv
# Порт на котором работает приложение
PORT=8000
# Путь к файлу конфигурации, относительно app.js
PATH_INSTANCE_FILE=./instances.yml
```

Описание инстансов в instances.yml:
```yaml
---
# <common name>:
#   name: Display server name
#   host: ip server address
#   user: ssh username
#   pass: ssh password
i1:
  name: "my-host"
  host: "192.168.1.1"
  user: "user"
  pass: "pass"
```

# Run
npm run start:dev
