import urllib.request
import requests
import json
import time
from subprocess import call
import datetime

DEVICE_ID_FILE = "/home/pi/Desktop/device.id"

def read_file(path):
    f = open(path)
    content = f.read()
    f.close()
    return content

SLEEP_INTERVAL = 10
DEVICE_ID = read_file(DEVICE_ID_FILE)
ENDPOINT = "https://us-central1-thesync.cloudfunctions.net/"
POWER_CONTROL_ENDPOINT = ENDPOINT + "endpoint?deviceId=" + DEVICE_ID
LOG_ENDPOINT = ENDPOINT + "log"

def run_shell(command):
    call(command, shell=True)


def shutdown():
    print("shutting down")
    run_shell("sudo shutdown -h now")


def reboot():
    print("rebooting")
    run_shell("sudo reboot")


def run():
    with urllib.request.urlopen(POWER_CONTROL_ENDPOINT) as url:
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
    requests.post(LOG_ENDPOINT, data)
    loop()


def loop():
    try:
        while True:
            time.sleep(SLEEP_INTERVAL)
            run()
    except Exception as err:
        error(err)


loop()
