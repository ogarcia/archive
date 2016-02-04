#
# Makefile
# Óscar García Amor, 2016
#

.PHONY: all x32 x64

all: x32 x64

x32:
	packer-io build -var-file config.json template_x64.json

x64:
	packer-io build -var-file config.json template_x64.json

# vim:ft=make
