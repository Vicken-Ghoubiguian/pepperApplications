import os
import BaseHTTPServer
import SimpleHTTPServer

PORT = 8081

def start_server():
    """Start the server."""
    os.chdir("./html")
    server_address = ("", PORT)
    handler_class = SimpleHTTPServer.SimpleHTTPRequestHandler
    handler_class.extensions_map['.png'] = 'image/png';
    server = BaseHTTPServer.HTTPServer(server_address, handler_class)
    server.serve_forever()

if __name__ == "__main__":
    start_server()
