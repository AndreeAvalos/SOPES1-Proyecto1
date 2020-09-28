import names
import os

class main():
    def __init__(self):
        'Constructor de main'
        self.URL = ""
        self.datos = []

    def __getPATH(self):
        os.system ("clear")
        print("***** Ruta *****")
        try:
            ruta = input("Introduce ruta de archivo (C:\\archivos\\prueba.txt): ")
            archivo = open(ruta,"r")
            contenido = archivo.read()
            oraciones = contenido.split(".")
            for oracion in oraciones:
                self.datos.append({'autor':names.get_first_name(), 'nota':oracion})
            print("Datos generados con exito")
        except:
            print("No existe archivo en ruta")
        
        finally:
            input("Presiones cualquier tecla para regresar al menu...")

    def __showData(self):
        os.system ("clear")
        print("***** Datos *****")
        for nota in self.datos:
            print(nota)
        input("Presiones cualquier tecla para regresar al menu...")

    def __getURL(self):
        os.system ("clear")
        print("***** Direccion *****")
        self.URL = input("Introduce direccion (192.168.1.2:200): ")
        print("Direccion guardada con exito")
        input("Presiones cualquier tecla para regresar al menu...")
    def __postData(self):
        os.system ("clear")
        print("***** Direccion *****")
        print("Datos enviados con exito hacia:",self.URL)
        input("Presiones cualquier tecla para regresar al menu...")

    def menu(self):
        salir = False
        while salir != True:
            os.system ("clear")
            print("***** Menu *****")
            print("1. Ingresar Ruta")
            print("2. Ingresar Direccion")
            print("3. Ver Datos")
            print("4. Enviar Datos")
            print("5. Salir")
            numero = int(input("Introduce un numero: "))

            if numero == 5:
                salir = True
            elif numero == 1:
                self.__getPATH()
            elif numero == 2:
                self.__getURL()
            elif numero == 3:
                self.__showData()
            elif numero == 4:
                self.__postData()
        
        print("Hasta luego....")

main = main()
main.menu()
            


        