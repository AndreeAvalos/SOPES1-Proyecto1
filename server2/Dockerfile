FROM node:alpine
#Creamos una estacion de trabajo
WORKDIR /server
COPY package.json . 
COPY package-lock.json .
#Instalamos react
RUN npm install create-react-app 
#Instalamos todo lo necesario para poder correr la app de react
RUN npm install \
    && npm install -g server \
    && serve -s build
#copiamos todo el contenido de la carpeta hacia /server
COPY . .
#Comando para iniciar 
CMD ["npm", "start"]