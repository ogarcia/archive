packer {
  required_plugins {
    vagrant = {
      source  = "github.com/hashicorp/vagrant"
      version = "~> 1"
    }
    virtualbox = {
      source = "github.com/hashicorp/virtualbox"
      version = ">= 0.0.1"
    }
  }
}

variable "boxtag" {
  type    = string
  default = "${env("USER")}/archlinux-net-x64"
}

variable "isochecksum" {
  type = string
}

variable "isourl" {
  type = string
}

variable "vagrantcloud_token" {
  type    = string
  default = "${env("VAGRANTCLOUD_TOKEN")}"
}

locals {
  version = "${formatdate("YYYY.MM", timestamp())}.01"
}

source "virtualbox-iso" "archlinux" {
  boot_command         = ["<enter><wait10><wait10><wait10>", "fdisk /dev/sda<enter>", "n<enter><enter><enter><enter>+512M<enter>", "n<enter><enter><enter><enter>+2G<enter>", "n<enter><enter><enter><enter><enter>", "t<enter>2<enter>82<enter>w<enter>", "echo root:toor | chpasswd<enter>", "systemctl start sshd<enter>"]
  boot_wait            = "10s"
  disk_size            = 51200
  guest_additions_mode = "disable"
  guest_os_type        = "ArchLinux_64"
  headless             = false
  iso_checksum         = "${var.isochecksum}"
  iso_url              = "${var.isourl}"
  memory               = 1024
  shutdown_command     = "echo '/sbin/halt -h -p' > shutdown.sh; echo 'vagrant'|sudo -S bash 'shutdown.sh'"
  ssh_password         = "toor"
  ssh_port             = 22
  ssh_username         = "root"
  ssh_wait_timeout     = "10000s"
  #vboxmanage           = [["modifyvm", "{{ .Name }}", "--paravirtprovider", "kvm"]]
}

build {
  sources = ["source.virtualbox-iso.archlinux"]

  provisioner "shell" {
    scripts = ["scripts/net/base.sh", "scripts/net/vagrant.sh", "scripts/net/clean.sh"]
  }

  post-processors {
    post-processor "vagrant" {
      output = "archlinux-x64-${formatdate("YYYYMM", timestamp())}.box"
    }
    post-processor "vagrant-cloud" {
      access_token        = "${var.vagrantcloud_token}"
      box_tag             = "${var.boxtag}"
      version             = "${local.version}"
      version_description = "- base package\n- base devel package\n- cifs-utils\n- grub\n- net-tools\n- nfs-tools\n- openssh\n- rsync\n- virtualbox-guest-utils-nox"
    }
  }
}