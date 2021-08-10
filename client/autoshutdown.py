import urllib.request
import requests
import json
import time
from subprocess import call
import datetime

interval = 10
deviceId = "a7T7cDqYwxOmplfSnFii"
endpoint = "https://us-central1-thesync.cloudfunctions.net/"
power_control = endpoint + "endpoint?deviceId=" + deviceId
log = endpoint + "log"


def run_shell(command):
    call(command, shell=True)


def shutdown():
    print("shutting down")
    run_shell("sudo shutdown -h now")


def reboot():
    print("rebooting")
    run_shell("sudo reboot")


def run():
    with urllib.request.urlopen(power_control) as url:
        data = json.loads(url.read().decode())
        print(data)
        if data["shutdown"]:
            shutdown()
        elif data["reboot"]:
            reboot()


def error(message):
    print(message)
    data = {
        error: message,
        time: datetime.datetime.now(),
        "source": "python power manager"
    }
    requests.post(log, data)
    loop()


def loop():
    try:
        while True:
            time.sleep(interval)
            run()
    except Exception as err:
        error(err)


loop()
