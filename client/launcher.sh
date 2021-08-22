#!/bin/sh

cd /

cd home/pi/Desktop/thesync
git fetch --all
git reset --hard origin/master

cd client
sudo python3 autoupdate.py

cd /