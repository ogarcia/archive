# vim:fenc=utf-8
#
# Copyright © 2024 Óscar García Amor <ogarcia@connectical.com>
#
# Distributed under terms of the GNU GPLv3 license.

from . import NAME, VERSION

import sys

def version():
    sys.stdout.write('{} {}\n'.format(NAME, VERSION))
