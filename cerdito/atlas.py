# vim:fenc=utf-8
#
# Copyright © 2024 Óscar García Amor <ogarcia@connectical.com>
#
# Distributed under terms of the GNU GPLv3 license.

from .config import config

from requests.auth import HTTPDigestAuth
from requests.compat import urljoin
from requests import request

import logging

ATLAS_URL='https://cloud.mongodb.com'
ATLAS_API_VERSION='v2'
ATLAS_HEADERS={'accept': 'application/vnd.atlas.2023-02-01+json'}

logger = logging.getLogger(__name__)

def _pause(pause, cluster):
    group_id = cluster['group_id']
    name = cluster['name']
    url = urljoin(ATLAS_URL, f'/api/atlas/{ATLAS_API_VERSION}/groups/{group_id}/clusters/{name}')
    auth = HTTPDigestAuth(config.atlas_public_key, config.atlas_private_key)
    json = {'paused': pause}
    logger.debug(f'Sending \'{json}\' to cluster {name}')
    response = request('PATCH', url, headers=ATLAS_HEADERS, auth=auth, json=json)
    logger.debug(f'Response \'{response.text}\'')
    if response.status_code == 200:
        logger.info(f'OK response from cluster {name}')
    elif response.status_code == 409 and 'CLUSTER_ALREADY_PAUSED' in response.text:
        logger.info(f'Cluster {name} is already paused')
    else:
        logger.error(f'Bad response from cluster {name} with status code {response.status_code}')

def pause(pause):
    if config.atlas_public_key is None or config.atlas_private_key is None:
        logger.info('No Atlas credentials configured, skipping Atlas action')
    elif config.atlas_clusters is None:
        logger.info('No Atlas clusters configured, skipping Atlas action')
    else:
        pre_action = 'Starting' if not pause else 'Stopping'
        post_action = 'started' if not pause else 'stopped'
        logger.debug(f'{pre_action} all configured clusters')
        for cluster in config.atlas_clusters:
            name = cluster.get('name')
            if name is None:
                logger.warn('Cluster has no name, skipping')
            elif cluster.get('group_id') is None:
                logger.warn(f'Cluster {name} has no group id, skipping')
            else:
                logger.info(f'{pre_action} Atlas cluster \'{name}\'')
                _pause(pause, cluster)
                logger.debug(f'Atlas cluster \'{name}\' {post_action}')
        logger.debug(f'All clusters {post_action}')
