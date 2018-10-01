# Build Arch Linux Vagrant images

## To build to a box file

To build image using `Makefile`.
```sh
make box_base_x32 # To base image 32 bit
make box_base_x64 # To base image 64 bit
make box_net_x64  # To net image 64 bit
```

You can build images with full command too.
```sh
packer build -var-file config_x32.json templates/boxes/base_x32.json
packer build -var-file config_x64.json templates/boxes/base_x64.json
packer build -var-file config_x64.json templates/boxes/net_x64.json
```

## To build and upload it to Vagrant Cloud

First you must export environment variables `VAGRANTCLOUD_TOKEN` and `USER`.
The first one is your Vagrant Cloud access token and the second one you
username in Vagrant Cloud. Then simply run make command.
```sh
make
```

If you wish build only one image you can do the following.
```sh
make cloud_base_x32 # To base image 32 bit tagged as ${USER}/archlinux-x32
make cloud_base_x64 # To base image 64 bit tagged as ${USER}/archlinux-x64
make cloud_net_x64  # To net image 64 bit tagged as ${USER}/archlinux-net-x64
```

## About config files

Note that inside of `config_*.json` files there are a reference to Arch ISO
URL. You must adjust the URL to download latest ISO and checksum before run
the build command.
