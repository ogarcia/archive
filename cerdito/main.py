# vim:fenc=utf-8
#
# Copyright © 2024 Óscar García Amor <ogarcia@connectical.com>
#
# Distributed under terms of the GNU GPLv3 license.

from . import NAME
from .config import config
from .commands import start, stop
from .version import version

import argparse
import logging
import os

def main():
    config_file = os.getenv(f'{NAME.upper()}_CONFIG')
    level = os.getenv(f'{NAME.upper()}_LOGLEVEL')
    atlas_public_key = os.getenv('MONGODB_ATLAS_PUBLIC_KEY')
    atlas_private_key = os.getenv('MONGODB_ATLAS_PRIVATE_KEY')
    kubernetes_kubeconfig = os.environ.get('KUBECONFIG')

    # Check loglevel environment variable
    if level:
        log_level = getattr(logging, level.upper(), None)
        if not isinstance(log_level, int):
            raise ValueError('Invalid log level: {}'.format(level))
    else:
        log_level = None

    # Set loglevel equivalents for argument parser
    log_levels = {
            1: logging.INFO,
            2: logging.DEBUG }

    # Create argument parser to get config via arguments
    parser = argparse.ArgumentParser()
    parser.add_argument('-c', '--config', metavar='value', default=config_file, help='custom configuration file path')
    parser.add_argument('-k', '--kube-config', metavar='value', default=kubernetes_kubeconfig, help='custom kube config file path')
    parser.add_argument('-v', '--verbose', action='count', default=0, help='be verbose (add more v to increase verbosity)')
    subparsers = parser.add_subparsers(required=True)
    parser_start = subparsers.add_parser('start', help='start all configured elements')
    parser_start.set_defaults(func=start)
    parser_stop = subparsers.add_parser('stop', help='stop all configured elements')
    parser_stop.set_defaults(func=stop)
    parser_version = subparsers.add_parser('version', help='show version')
    parser_version.set_defaults(func=version)
    args = parser.parse_args()

    # Maximum loglevel is 3 if user sends more vvv we ignore it
    args.verbose = 2 if args.verbose >= 2 else args.verbose

    # Set loglevel via argument or environment (untouched warning by default)
    if args.verbose > 0:
        log_level = log_levels[args.verbose]
    if log_level:
        logging.basicConfig(level=log_level)

    logger = logging.getLogger(NAME)
    logger.info('Setting loglevel to {}'.format(logging.getLevelName(log_level)))

    # Read config and insert public and private key if they have been declared
    config.configure(args.config, atlas_public_key, atlas_private_key, args.kube_config)
    logger.debug(config)

    # Execute command
    args.func()
