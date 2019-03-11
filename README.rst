ix rabbit
=========

Minimal pub/sub demonstration using https://www.rabbitmq.com/ as MQTT broker with WebSocket plugin.

Prerequisites
-------------

Checkout repository *including* submodules:

    git clone --recursive -j4 --depth 1 https://github.com/wolf-index/ix-rabbit

RabbitMQ
++++++++

Set up RabbitMQ server according to

* https://www.rabbitmq.com/mqtt.html
* https://www.rabbitmq.com/web-mqtt.html

nginx
+++++

Copy/link `nginx/ws_wrapper.conf` and `nginx/snippets/*`. Adapt paths to your environment.

python environment
++++++++++++++++++

    virtualenv venv
    . venv/bin/activate
    pip install -r requirements.txt

Running
-------

    # Point your browser to `http://localhost/index.html <http://localhost/index.html>`_
    # Run `code/fake_devices.py`
    # PROFIT.
