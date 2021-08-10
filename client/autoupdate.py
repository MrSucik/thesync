import urllib.request
from subprocess import call

repository = "https://raw.githubusercontent.com/MrSucik/thesync/master/client/"
file = "service.py"


def run_shell(command):
    call(command, shell=True)


def write_file(path, content):
    f = open(path)
    f.write(content)
    f.close()


print("Updating from: " + repository + file)

with urllib.request.urlopen(repository + file) as url:
    string = url.read().decode('utf-8')
    write_file(file, string)
    print("Successfully updated")
    run_shell("python3 " + file)
