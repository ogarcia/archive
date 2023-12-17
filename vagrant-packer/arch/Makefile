#
# Makefile
# Óscar García Amor, 2017-2023
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
	packer build -var-file config_x32.pkrvars.hcl templates/boxes/base_x32.pkr.hcl

box_base_x64:
	packer build -var-file config_x64.pkrvars.hcl templates/boxes/base_x64.pkr.hcl

box_net_x64:
	packer build -var-file config_x64.pkrvars.hcl templates/boxes/net_x64.pkr.hcl

cloud_base_x32: check-env
	packer build -var-file config_x32.pkrvars.hcl templates/cloud/base_x32.pkr.hcl

cloud_base_x64: check-env
	packer build -var-file config_x64.pkrvars.hcl templates/cloud/base_x64.pkr.hcl

cloud_net_x64: check-env
	packer build -var-file config_x64.pkrvars.hcl templates/cloud/net_x64.pkr.hcl

# vim:ft=make
