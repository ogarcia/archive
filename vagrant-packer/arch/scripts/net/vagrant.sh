#! /bin/sh
#
# vagrant.sh
# Copyright (C) 2015 Óscar García Amor <ogarcia@connectical.com>
#
# Distributed under terms of the MIT license.
#

# Installing vagrant keys
mkdir -pm 700 /mnt/home/vagrant/.ssh
curl --insecure https://raw.githubusercontent.com/mitchellh/vagrant/master/keys/vagrant.pub > /mnt/home/vagrant/.ssh/authorized_keys
chmod 0600 /mnt/home/vagrant/.ssh/authorized_keys
chown -R 1000:1000 /mnt/home/vagrant/.ssh
