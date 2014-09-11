# Init Scripts

Useful init scripts to Linux Systems.

To install this init scripts you must copy it to proper folder

## systemd

The scripts in `system` folder must be copied to `/usr/lib/systemd/system/` folder. When a new script is added to this folder (or a script has been modified) you must execute `systemctl daemon-reload` to reload it into systemd. To enable the scripts you must execute `systemctl enable service` (being service the name of the script without .service extension).

## System V Scripts

The scripts in `sysv` folder must be copied to `/etc/init.d` folder and enabled with `update-rc.d`command in Debian or with `chkconfig` in Red Hat.

## Upstart Scripts

The scripts in `upstart` folder must be copied to `/etc/init` and don't need to enable them because this occurs automagically. You can make a symbolic link in `/etc/init.d` folder with the same name to `/lib/init/upstart-job` for use the old fashion `/etc/init.d/script start|stop|restart...`.
