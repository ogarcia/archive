# Build Arch Linux Vagrant images

To build images and upload to Vagrant Cloud simply run:

```sh
make
```

To build only one image and upload run:

```sh
make base_cloud # To base image
make net_cloud  # To net image
```

If you only wants to build image but not upload it:

```sh
make base_box # To base image
make net_box  # To net image
```

You can build images with full command too:

```sh
packer-io build -var-file config_base.json template_base_box_x64.json
packer-io build -var-file config_net.json template_net_box_x64.json
```

Note that inside of `config_*.json` files there are a reference to Arch ISO
URL, and box tag in vagrant cloud. You must adjust the URL to download
latest ISO and checksum before run the build command.
