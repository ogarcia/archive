# WARNING
This repo is **DEPRECATED**. It is here for historical purposes only.
See [cerdito](https://github.com/Telefonica/cerdito) for the active project.
- - -

# cerdito

![Piggy Bank](piggy.svg)

Save a few cents on your cloud infrastructure.

## What does _cerdito_ do?

_cerdito_ is configured through a _toml_ file in which you can indicate the
Atlas clusters you want to pause and the Kubernetes deployments you want to
be scaled to zero.

To connect to Atlas you will need a public key and a private API access key
and for Kubernetes you will need the _cubeconfig_ file.

## Installation

### From source

```sh
git clone https://github.com/Telefonica/cerdito.git
virtualenv3 ./cerdito-venv
source ./cerdito-venv/bin/activate
cd cerdito
pip install .
```

## Run

First take a look to `cerdito.toml` file to configure _cerdito_. Is self
explanatory.

You can place `cerdito.toml` in `/etc`, in user home as
`~/.config/cerdito/cerdito.conf` or in same directory where you run
_cerdito_.

Once you have configured _cerdito_ you can run `cerdito start` to resume your
cloud infraestructure or `cerdito stop` to pause it. _cerdito_ has some
command line options to tell it where to read the configuration.

```
$ cerdito --help
usage: __main__.py [-h] [-c value] [-k value] [-v] {start,stop,version} ...

positional arguments:
  {start,stop,version}
    start               start all configured elements
    stop                stop all configured elements
    version             show version

options:
  -h, --help            show this help message and exit
  -c value, --config value
                        custom configuration file path
  -k value, --kube-config value
                        custom kube config file path
  -v, --verbose         be verbose (add more v to increase verbosity)
```

By default _cerdito_ does not show anything when it is running, if you want
to see what it is doing you can launch it with `CERDITO_LOGLEVEL=INFO`
environment variable.

_cerdito_ supports the following environment variables.


| Variable | Description |
| --- | --- |
| `CERDITO_CONFIG` | Config file location |
| `CERDITO_LOGLEVEL` | Log level, effective values are `WARNING`, `INFO` and `DEBUG` |
| `MONGODB_ATLAS_PUBLIC_KEY` | Atlas public key, to avoid having to write it in the configuration file |
| `MONGODB_ATLAS_PRIVATE_KEY` | Atlas private key |
| `KUBECONFIG` | Location of kubeconfig file, by default `~/.kube/config` is used |
