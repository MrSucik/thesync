# Ensure everything is up-to-date
sudo apt-get update
sudo apt-get upgrade
sudo apt-get dist-upgrade

# Install unclutter to hide the cursor and lxde for its dependencies 
sudo apt-get install chromium-browser unclutter lxde git

# Download Python script from GitHub
cd /home/pi/Desktop/
git clone https://github.com/MrSucik/thesync/tree/master/client

# Update /etc/rc.local to run Python script on startup
mkdir /home/pi/.config/autostart
read -r -d '' PYTHON_STARTUP << EOM
[Desktop Entry]
Type=Application
Name=Blink
Exec=/usr/bin/python3 /home/pi/blink.py
EOM

sudo echo "$PYTHON_STARTUP" > '/home/pi/.config/autostart/blink.desktop'

# Enable 1: Desktop / CLI and 4: Desktop / Autologin from raspi-config

# Update ~/.config/lxsession/LXDE/autostart to auto-start Chromium

read -r -d '' CHROME_STARTUP << EOM
@xset s off
@xset -dpms
@xset s noblank
@sed -i 's/"exited_cleanly": false/"exited_cleanly": true/' ~/.config/chromium-browser Default/Preferences
@chromium-browser --noerrdialogs --kiosk https://thesync.web.app/preview/m2TW95XRoJod3tVT8ly5 --incognito --disable-translate
EOM

sudo echo "$CHROME_STARTUP" > '/home/pi/.config/lxsession/LXDE/autostart'