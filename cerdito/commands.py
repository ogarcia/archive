# vim:fenc=utf-8
#
# Copyright © 2024 Óscar García Amor <ogarcia@connectical.com>
#
# Distributed under terms of the GNU GPLv3 license.

from .atlas import pause as atlas_pause
from .config import config
from .kubernetes import pause as kubernetes_pause

import logging

def start():
    atlas_pause(False)
    kubernetes_pause(False)

def stop():
    kubernetes_pause(True)
    atlas_pause(True)
