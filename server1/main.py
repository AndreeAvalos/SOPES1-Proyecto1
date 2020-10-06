from flask import Flask, request
from flask_cors import CORS
import os
import requests

#constantes
serverA = os.getenv('SERVERA', '104.154.153.247')
serverB = os.getenv('SERVERB', '35.194.41.237')
PORT = 3000
urlA = "http://{0}:{1}".format(serverA,PORT)
urlB = "http://{0}:{1}".format(serverB,PORT)

app = Flask(__name__)
CORS(app)


def getRAM(entrada):
    segmentos = entrada.split("|")
    usage = segmentos[2].split(":")
    ram = usage[1].split(" ")
    return str(ram[1])

def getCPU(entrada):
    usage = entrada.split(":")
    cpu = usage[1].split("%")
    return str(cpu[0])

@app.route('/')
def inicio():
    return '<h1>Servidor 1.1</h1>'

@app.route('/post/insert', methods=['POST'])
def insert():
    autor = request.form['autor']
    nota = request.form['nota']
    resA = requests.get(urlA+"/get/publicaciones")
    resB = requests.get(urlB+"/get/publicaciones")
    numA = int(resA.text)
    numB = int(resB.text)
    if numA>numB:
        requests.post(urlB+"/post/insert", data={'autor': autor, 'nota': nota})
    elif numB>numA:
        requests.post(urlA+"/post/insert", data={'autor': autor, 'nota': nota})
    else:
        resA = requests.get(urlA+"/get/ram")
        resB = requests.get(urlB+"/get/ram")
        numA = int(getRAM(resA.text))
        numB = int(getRAM(resB.text))
        if numA>numB:
            requests.post(urlB+"/post/insert", data={'autor': autor, 'nota': nota})
        elif numB>numA:
            requests.post(urlA+"/post/insert", data={'autor': autor, 'nota': nota})
        else:
            resA = requests.get(urlA+"/get/cpu")
            resB = requests.get(urlB+"/get/cpu")
            numA = int(getCPU(resA.text))
            numB = int(getCPU(resB.text))
            if numA>numB:
                requests.post(urlB+"/post/insert", data={'autor': autor, 'nota': nota})
            elif numB>numA:
                requests.post(urlA+"/post/insert", data={'autor': autor, 'nota': nota})
            else:
                requests.post(urlA+"/post/insert", data={'autor': autor, 'nota': nota})     
    return "OK"

    

if __name__ == '__main__':
    app.run('0.0.0.0', 3000, debug= False)