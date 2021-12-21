# Maintainer: Oscar Garcia Amor <ogarcia@connectical.com>

pkgname=miniweb
pkgver=1.0
pkgrel=1
pkgdesc="Mini control web for systemd daemons"
arch=('any')
url="https://github.com/ogarcia/miniweb"
license=('MIT')
depends=('python2' 'python2-bottle')
makedepends=('git')
source=('git+https://github.com/ogarcia/miniweb.git#branch=1.0' 'miniweb.sudoers.d' 'miniweb.service')
md5sums=('SKIP' 'SKIP' 'SKIP')
install=${pkgname}.install

package(){
	# Copy static files and templates
	cp -r "${srcdir}/${pkgname}/usr" "${pkgdir}"
	cp -r "${srcdir}/${pkgname}/etc" "${pkgdir}"

	# Copy binary file
	install -Dm755 "${srcdir}/${pkgname}/miniweb" "${pkgdir}/usr/bin/miniweb"

	# Copy license
	install -D -m644 "${srcdir}/${pkgname}/LICENSE" "${pkgdir}/usr/share/licenses/${pkgname}/LICENSE"

	# Copy readme
	install -D -m644 "${srcdir}/${pkgname}/README.md" "${pkgdir}/usr/share/doc/${pkgname}/README.md"

	# Copy sudoers file
	install -dm750 "${pkgdir}/etc/sudoers.d"
	install -Dm440 "${startdir}/miniweb.sudoers.d" "${pkgdir}/etc/sudoers.d/miniweb"

	# Copy service file
	install -Dm644 "${startdir}/miniweb.service" "${pkgdir}/usr/lib/systemd/system/miniweb.service"
}
