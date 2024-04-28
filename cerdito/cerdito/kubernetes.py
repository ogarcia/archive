# vim:fenc=utf-8
#
# Copyright © 2024 Óscar García Amor <ogarcia@connectical.com>
#
# Distributed under terms of the GNU GPLv3 license.

from .config import config

from kubernetes import client, config as kube_config
from kubernetes.client.rest import ApiException

import logging
import os

logger = logging.getLogger(__name__)

def _pause(pause, project):
    pre_action = 'Scaling up' if not pause else 'Scaling down'
    post_action = 'scaled up' if not pause else 'scaled down'
    replicas = 0 if pause else 1
    kube_config.load_kube_config(config_file=config.kubernetes_kubeconfig, context=project['context'])
    v1 = client.AppsV1Api()
    for deployment in project['deployments']:
        logger.debug(f'{pre_action} deployment {deployment}')
        try:
            v1.patch_namespaced_deployment_scale(deployment, project['namespace'], {'spec': {'replicas': replicas}})
            logger.info(f'Deployment {deployment} {post_action}')
        except ApiException as e:
            logger.error(f'{pre_action} exception: {e}')

def pause(pause):
    if not os.access(config.kubernetes_kubeconfig, os.R_OK):
        logger.info(f'Cannot read kubeconfig file \'{config.kubernetes_kubeconfig}\', skipping Kubernetes action')
    elif config.kubernetes_projects is None:
        logger.info('No Kubernetes projects configured, skipping Kubernetes action')
    else:
        pre_action = 'Starting' if not pause else 'Stopping'
        post_action = 'started' if not pause else 'stopped'
        logger.debug(f'{pre_action} all configured projects')
        for project in config.kubernetes_projects:
            context = project.get('context')
            namespace = project.get('namespace')
            deployments = project.get('deployments')
            if context is None:
                logger.warn('Project has no context, skipping')
            elif namespace is None:
                logger.warn('Project has no namespace, skipping')
            elif deployments is None:
                logger.warn('Project has no deployments, skipping')
            else:
                logger.info(f'{pre_action} Kubernetes project \'{namespace}\'')
                _pause(pause, project)
                logger.debug(f'Kubernetes project \'{namespace}\' {post_action}')
        logger.debug(f'All projects {post_action}')
