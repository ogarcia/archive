# vim:fenc=utf-8
#
# Copyright © 2024 Óscar García Amor <ogarcia@connectical.com>
#
# Distributed under terms of the GNU GPLv3 license.

from . import NAME

import logging
import os

try:
    import tomllib
except (ImportError, ModuleNotFoundError):
    import tomli as tomllib

CONFIG_FILE_NAME = f'{NAME}.toml'
LOCAL_CONFIG_FILE = os.path.join('.', CONFIG_FILE_NAME)
SYSTEM_CONFIG_FILE = os.path.join('/etc', CONFIG_FILE_NAME)

logger = logging.getLogger(__name__)

class Config:
    def __init__(self):
        # By default set all values to None
        self.config_file = None
        self.atlas_public_key = None
        self.atlas_private_key = None
        self.atlas_clusters = None
        self.kubernetes_kubeconfig = None
        self.kubernetes_projects = None

    def __str__(self):
        atlas_private_key = '*' * len(self.atlas_private_key) if self.atlas_private_key is not None else None
        atlas_cluster_names = [cluster.get('name') for cluster in self.atlas_clusters] if self.atlas_clusters is not None else []
        kubernetes_projects = [project.get('namespace') for project in self.kubernetes_projects] if self.kubernetes_projects is not None else []
        return f"Config file: {self.config_file}; Atlas public key: {self.atlas_public_key}; Atlas private key: {atlas_private_key}; Atlas clusters: {atlas_cluster_names}; Kubernetes kubeconfig: {self.kubernetes_kubeconfig}; Kubernetes projects: {kubernetes_projects}"

    def _get_config_file(self):
        xdg_config_home = os.environ.get('XDG_CONFIG_HOME', os.path.join(os.path.expanduser('~'), '.config'))
        logger.debug(f'XDG_CONFIG_HOME: \'{xdg_config_home}\'.')
        user_config_file = os.path.join(xdg_config_home, NAME, CONFIG_FILE_NAME)
        logger.debug(f'User config file: \'{user_config_file}\'.')
        for config_file in [LOCAL_CONFIG_FILE, user_config_file, SYSTEM_CONFIG_FILE]:
            if os.access(config_file, os.R_OK):
                logger.debug(f'Config file found: \'{config_file}\'.')
                return config_file
        raise SystemExit('No config file found.')

    def configure(self, config_file=None, atlas_public_key=None, atlas_private_key=None, kube_config=None):
        if config_file is None:
            # Try to get one of default config locations
            self.config_file = self._get_config_file()
        else:
            self.config_file = config_file
            if not os.access(self.config_file, os.R_OK):
                raise SystemExit(f'Cannot read config file \'{self.config_file}\'.')
        logger.info(f'Using config file \'{self.config_file}\'.')

        try:
            with open(self.config_file, "rb") as f:
                data = tomllib.load(f)
        except Exception as err:
            raise SystemExit(f'sysdweb config file is corrupted.\n{err}')

        atlas_config = data.get('atlas')
        kubernetes_config = data.get('kubernetes')

        if atlas_config is not None:
            self.atlas_public_key = atlas_config.get('public_key')
            self.atlas_private_key = atlas_config.get('private_key')
            self.atlas_clusters = atlas_config.get('clusters')

        # If atlas_public_key or atlas_private_key are passed override them
        if atlas_public_key is not None:
            self.atlas_public_key = atlas_public_key
        if atlas_private_key is not None:
            self.atlas_private_key = atlas_private_key

        if kubernetes_config is not None:
            self.kubernetes_kubeconfig = kubernetes_config.get('kubeconfig', os.path.join(os.path.expanduser('~'), '.kube/config'))
            self.kubernetes_projects = kubernetes_config.get('projects')

        # If kubeconfig is passed override them
        if kube_config is not None:
            self.kubernetes_kubeconfig = kube_config

        logger.info(f'Using kubeconfig file \'{self.kubernetes_kubeconfig}\'.')

config = Config()
