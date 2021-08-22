#!/usr/bin/env bash

# Ensure everything is up-to-date
# sudo apt-get update
# sudo apt-get upgrade
# sudo apt-get dist-upgrade

# Install unclutter to hide the cursor and lxde for its dependencies 
sudo apt-get install chromium-browser unclutter lxde git --yes
# sudo pip3 install urllib

# Download Python script from GitHub
cd /home/pi/Desktop/
git clone https://github.com/MrSucik/thesync
cd thesync 
sudo git pull

# Enable autologin from raspi-config

# Update ~/.config/lxsession/LXDE/autostart to auto-start Chromium

read -r -d '' CHROME_STARTUP << EOM
@lxpanel --profile LXDE-pi
@pcmanfm --desktop --profile LXDE-pi
@xscreensaver -no-splash
@xset s off
@xset -dpms
@xset s noblank
@sed -i 's/"exited_cleanly": false/"exited_cleanly": true/' ~/.config/chromium-browser Default/Preferences
@chromium-browser --noerrdialogs --kiosk https://thesync.web.app/preview/m2TW95XRoJod3tVT8ly5 --incognito --disable-translate
EOM

# sudo mkdir -p /home/pi/.config/lxsession/LXDE/
sudo mkdir -p /etc/xdg/lxsession/LXDE-pi/

sudo echo "$CHROME_STARTUP" | sudo tee /etc/xdg/lxsession/LXDE-pi/autostart
# sudo bash -c 'echo "$CHROME_STARTUP" > "/home/pi/.config/lxsession/LXDE/autostart"'

# Create scheduled start for Python script

cd /home/pi/Desktop/thesync/client/
sudo chmod 755 launcher.sh
sudo mkdir -p logs
sudo crontab -l | { cat; echo "@reboot sh /home/pi/Desktop/thesync/client/launcher.sh >/home/pi/logs/cronlog 2>&1"; } | crontab -