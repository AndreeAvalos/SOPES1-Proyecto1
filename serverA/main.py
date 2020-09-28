from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient

cliente = MongoClient("localhost",port="27017")
db = cliente["sopesDB"]
coleccion = db["publicacion"]

app = Flask(__name__)
CORS(app)

@app.route('/')
def inicio():
    return '<h1>Servidor A</h1>'


if __name__ == '__main__':
    app.run('0.0.0.0', 3000, debug= False)
