#
# Makefile
# Óscar García Amor, 2017-2018
#

.PHONY: all clean check-env box_base_x32 box_base_x64 box_net_x64 cloud_base_x32 cloud_base_x64 cloud_net_x64

all: cloud_base_x64

clean:
	rm -f *.box
	rm -rf packer_cache

check-env:
ifndef VAGRANTCLOUD_TOKEN
	$(error VAGRANTCLOUD_TOKEN is undefined)
endif
ifndef USER
	$(error USER is undefined)
endif

box_base_x32:
	packer build -var-file config_x32.json templates/boxes/base_x32.json

box_base_x64:
	packer build -var-file config_x64.json templates/boxes/base_x64.json

box_net_x64:
	packer build -var-file config_x64.json templates/boxes/net_x64.json

cloud_base_x32: check-env
	packer build -var-file config_x32.json templates/cloud/base_x32.json

cloud_base_x64: check-env
	packer build -var-file config_x64.json templates/cloud/base_x64.json

cloud_net_x64: check-env
	packer build -var-file config_x64.json templates/cloud/net_x64.json

# vim:ft=make
