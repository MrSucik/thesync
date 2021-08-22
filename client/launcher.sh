#!/bin/sh

cd /

cd home/pi/Desktop/thesync
git pull

cd client
sudo python3 autoupdate.py

cd /