#! /bin/sh
#
# clean.sh
# Copyright (C) 2015 Óscar García Amor <ogarcia@connectical.com>
#
# Distributed under terms of the MIT license.
#

# Remove chroot bash_history and ssh keys
rm -f /mnt/root/.bash_history
rm -f /mnt/home/vagrant/.bash_history
rm -f /mnt/etc/ssh/ssh_host_*

# Force sync
sync
umount -R /mnt
sync
