# Build archlinux vagrant base image for virtualbox

To build images simply run:

```bash
make
```
You can build only 32 bit or 64 bit image with:

```bash
make x32
make x64
```

Or you can make it at by hand with full command:

```bash
packer-io build -var-file config.json template_x32.json
packer-io build -var-file config.json template_x64.json
```

Note that inside of `config.json` there is a reference to Arch ISO URL.
You must adjust the URL to download latest ISO and checksum before run the
build command.
