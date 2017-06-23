#
# Makefile
# Óscar García Amor, 2017
#

.PHONY: all check-env x64_box x64_cloud

all: check-env x64_cloud

check-env:
ifndef VAGRANTCLOUD_TOKEN
	$(error VAGRANTCLOUD_TOKEN is undefined)
endif

x64_box:
	packer-io build -var-file config.json template_box_x64.json

x64_cloud:
	packer-io build -var-file config.json template_cloud_x64.json

# vim:ft=make
