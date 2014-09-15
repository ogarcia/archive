# Init Scripts

Useful init scripts to Linux Systems.

To install this init scripts you must copy it to proper folder

## runit

## systemd

The scripts in `systemd` folder must be copied to
`/usr/lib/systemd/system/`. When a new script is added to this folder (or
a script has been modified) you must execute `systemctl daemon-reload` to
reload it into systemd. To enable the scripts you must execute `systemctl
enable service` (being service the name of the script without .service
extension).

## System V

The scripts in `sysv` folder must be copied to `/etc/init.d` and enabled
with `update-rc.d`command in Debian or with `chkconfig` in Red Hat.

## Upstart

The scripts in `upstart` folder must be copied to `/etc/init` and don't need
to enable them because this occurs automagically. You can make a symbolic
link in `/etc/init.d` folder with the same name to `/lib/init/upstart-job`
for use the old fashion `/etc/init.d/script start|stop|restart...`.

## Runit

The scripts in `runit` folder could be copied to `/etc/runit` in most systems,
where `runsvdir` parse them (check runit documentation for your OS for more
information, because of the path can change in some distributions). Our
recomendation is to put these files in other path `/etc/sv` and (soft) linking
them to `/etc/runit`, to avoid unwanted running actions.
