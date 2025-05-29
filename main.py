import webview
import os

WEB_DIR = 'web'
ASSETS = 'assets'
HTML_FILE = os.path.join(WEB_DIR, 'index.html')

class funcs:        
    def printLog(self, msg, type="INFO"):
        log = open(os.path.join(ASSETS, 'owi.log'), "w")
        
        if type == "INFO":
            log.write("Info: " + msg)
            log.close()
            return 0
        elif type == "WARN":
            log.write("Warning: " + msg)
            log.close()
            return 1
        elif type == "ERR":
            log.write("Error: " + msg)
            log.close()
            return -1
        else:
            log.close()
            return None
        
f = funcs()
            
window = webview.create_window(
    'OWI',
    url=HTML_FILE,
    width=800,
    height=600,
    resizable=True,
    min_size=(400, 300),
    js_api=f
)

def destruct():
    res = f.printLog("Exiting...")
    return res

window.events.closed += destruct

webview.start()