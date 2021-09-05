import threading
import webbrowser

import runserver

def open_browser(port):
    """Start a browser after waiting for half a second."""
    def _open_browser():
        webbrowser.open('http://localhost:%s/' % runserver.PORT)
    thread = threading.Timer(0.5, _open_browser)
    thread.start()

if __name__ == "__main__":
    open_browser(runserver.PORT)
    runserver.start_server()
