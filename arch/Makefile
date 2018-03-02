#
# Makefile
# Óscar García Amor, 2017
#

.PHONY: all check-env base_box_x64 base_cloud_x64 net_box_x64 net_cloud_x64 base_box_x32 base_cloud_x32

all: check-env base_cloud_x64 net_cloud_x64 base_cloud_x32

check-env:
ifndef VAGRANTCLOUD_TOKEN
	$(error VAGRANTCLOUD_TOKEN is undefined)
endif

base_box_x64:
	packer-io build -var-file config_base_x64.json template_base_box_x64.json

base_cloud_x64:
	packer-io build -var-file config_base_x64.json template_base_cloud_x64.json

net_box_x64:
	packer-io build -var-file config_net_x64.json template_net_box_x64.json

net_cloud_x64:
	packer-io build -var-file config_net_x64.json template_net_cloud_x64.json

base_box_x32:
	packer-io build -var-file config_base_x32.json template_base_box_x32.json

base_cloud_x32:
	packer-io build -var-file config_base_x32.json template_base_cloud_x32.json

# vim:ft=make
