#! /bin/sh
#
# base.sh
# Copyright (C) 2015 Óscar García Amor <ogarcia@connectical.com>
#
# Distributed under terms of the MIT license.
#

# Create filesystems
mkfs.ext4 /dev/sda1
mkfs.ext4 /dev/sda3
mkswap /dev/sda2

# Label filesystems
e2label /dev/sda1 boot
e2label /dev/sda3 root
swaplabel -L swap /dev/sda2

# Do mounts and enable swap
mount /dev/sda3 /mnt
mkdir /mnt/boot
mount /dev/sda1 /mnt/boot
swapon /dev/sda2

# Install base and base-devel arch linux stuff
pacstrap /mnt base base-devel

# Generate fstab with mounts
genfstab -p /mnt >> /mnt/etc/fstab

# Enter in chroot and finish installation
arch-chroot /mnt << EOF
echo arch > /etc/hostname
ln -s /usr/share/zoneinfo/UTC /etc/localtime
sed -i 's/#en_US.UTF-8/en_US.UTF-8/g' /etc/locale.gen
locale-gen
echo LANG=en_US.UTF-8 > /etc/locale.conf
echo KEYMAP=es > /etc/vconsole.conf
useradd -m vagrant
echo vagrant:vagrant | chpasswd
usermod -a -G adm,disk,wheel,log vagrant
sed -i 's/# %wheel ALL=(ALL) N/%wheel ALL=(ALL) N/g' /etc/sudoers
pacman -S --noconfirm grub openssh virtualbox-guest-utils-nox
echo vboxguest > /etc/modules-load.d/virtualbox.conf
echo vboxsf >> /etc/modules-load.d/virtualbox.conf
echo vboxvideo >> /etc/modules-load.d/virtualbox.conf
systemctl enable sshd
grub-install --target=i386-pc --recheck --debug /dev/sda
sed -i 's/GRUB_TIMEOUT=5/GRUB_TIMEOUT=1/g' /etc/default/grub
grub-mkconfig -o /boot/grub/grub.cfg
cp /etc/netctl/examples/ethernet-dhcp /etc/netctl/enp0s3
sed -i 's/Interface=eth0/Interface=enp0s3/g' /etc/netctl/enp0s3
netctl enable enp0s3
pacman -Scc --noconfirm
exit
EOF

# Do final sync
sync
