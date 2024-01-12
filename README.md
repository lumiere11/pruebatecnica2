
## Prerequisitos
Node.js
npm or yarn
## Instalación
Clonar repositorio:

```sh
git clone https://github.com/lumiere11/pruebatecnica2.git
```
Cambiar al directorio del proyecto:
```sh
cd pruebaTecnica
```

Instalar dependencias:
```sh
cd api
```
```sh
npm install
```
Ahora para el frontend
```sh
cd ../frontend
```
```sh
npm install
npm -g install serve
```
## Ejecucion
Backend
```sh
cd api
```

```sh
node app.js
```


Frontend
```sh
cd frontend
```

```sh
npm run build
serve -s build
```