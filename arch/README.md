# Build archlinux vagrant base image for virtualbox

To build image simply run:

```bash
packer-io build template.json
```

Note that inside of `template.json` there is a reference to Arch ISO URL.
You must adjust the URL to download latest ISO and checksum before run the
build command.
