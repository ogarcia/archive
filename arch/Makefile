#
# Makefile
# Óscar García Amor, 2017
#

.PHONY: all check-env base_box base_cloud net_box net_cloud

all: check-env base_cloud net_cloud

check-env:
ifndef VAGRANTCLOUD_TOKEN
	$(error VAGRANTCLOUD_TOKEN is undefined)
endif

base_box:
	packer-io build -var-file config_base.json template_base_box_x64.json

base_cloud:
	packer-io build -var-file config_base.json template_base_cloud_x64.json

net_box:
	packer-io build -var-file config_net.json template_net_box_x64.json

net_cloud:
	packer-io build -var-file config_net.json template_net_cloud_x64.json

# vim:ft=make
