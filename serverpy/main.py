from flask import Flask, render_template
import socketio

# Crea una instancia de Flask
app = Flask(__name__)

# Crea una instancia de Socket.IO
sio = socketio.Server(cors_allowed_origins='*')

# Adjunta Socket.IO al servidor de Flask
app.wsgi_app = socketio.WSGIApp(sio, app.wsgi_app)

@sio.event
def connect(sid, environ):
    print('Cliente conectado:', sid)

@sio.event
def disconnect(sid):
    print('Cliente desconectado:', sid)

@sio.event
def message(sid, data):
    print('Mensaje recibido:', data)

@sio.event
def pidValuesChange(sid, data):
    print('Cambio en valores PID:', data)

@app.route('/')
def index():
    return "Servidor funcionando"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
