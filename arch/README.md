# Build archlinux vagrant base image for virtualbox

To build image and upload to vagrant cloud simply run:

```bash
make
```

If you only wants to build image run:

```sh
make x64_box
```

You can build it at by hand with full command:

```bash
packer-io build -var-file config.json template_box_x64.json
```

Note that inside of `config.json` there is a reference to Arch ISO URL, and
box tag in vagrant cloud. You must adjust the URL to download latest ISO and
checksum before run the build command.
