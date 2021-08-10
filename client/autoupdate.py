import urllib.request

repository = ""

with urllib.request.urlopen(repository) as url:
    html = url.read().decode('utf-8')
