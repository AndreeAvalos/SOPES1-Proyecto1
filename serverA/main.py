from flask import Flask, request
from flask_cors import CORS
from pymongo import MongoClient


cliente = MongoClient(host = [ str("172.17.0.2") + ":" + str(27017) ], serverSelectionTimeoutMS = 3000)
db = cliente["sopesDB"]
coleccion = db["publicacion"]

app = Flask(__name__)
CORS(app)

def insercion(autor, nota):
    coleccion.insert_one({'autor': autor, 'nota':nota})

@app.route('/')
def inicio():
    return '<h1>Servidor A 1</h1>'

@app.route('/post/insert', methods=['POST'])
def insert():
    autor = request.form['autor']
    nota = request.form['nota']
    insercion(autor, nota)
    return "OK"

@app.route('/get/publicaciones')
def get_publicaciones():
    num = coleccion.find().count(True)
    return str(num)
    
@app.route('/get/ram')
def get_ram():
    archivo = open('/elements/procs/mem-info','r')
    contenido = archivo.read()
    archivo.close()
    return contenido

@app.route('/get/cpu')
def get_cpu():
    archivo = open('/elements/procs/cpu-info','r')
    contenido = archivo.read()
    archivo.close()
    return contenido

if __name__ == '__main__':
    app.run('0.0.0.0', 3000, debug= False)
