# miniweb
Mini control web for systemd daemons

This branch contains the files to construct Arch Linux package.

If you want make it, first be sure that you have installed the base-devel group.

`pacman -S base-devel`

If you have installed the prerequisites for make packages, do the following.
```sh
git clone -b arch https://github.com/ogarcia/miniweb.git
cd miniweb
makepkg
sudo pacman -U miniweb-1.0-1-any.pkg.tar.xz
```
