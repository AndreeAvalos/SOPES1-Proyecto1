FROM node:alphine
#Creamos una estacion de trabajo
WORKDIR /server
#Instalamos react
RUN npm install create-react-app
#Instalamos todo lo necesario para poder correr la app de react
RUN npm install react-router-dom \
    && npm install react-chartjs-2 \
    && npm install --save chart.js \
    && npm install react-border-wrapper
#copiamos todo el contenido de la carpeta hacia /server
COPY . .
#Comando para iniciar 
CMD ["npm", "start"]