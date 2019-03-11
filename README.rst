ix rabbit
=========

Minimal publish/subscribe demonstration using `RabbitMQ <https://www.rabbitmq.com/>`_ as MQTT broker with WebSocket
plugin.

Modus Operandi
--------------

RabbitMQ is acting as a `MQTT <https://en.wikipedia.org/wiki/MQTT>`_ Broker (`localhost:1883`) also allowing access via
WebSocket (`localhost:15675`) for web clients.
The `Eclipse paho <https://www.eclipse.org/paho/>`_ provides open-source client implementations of MQTT
messaging protocol.

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

* Point your browser to `http://localhost/index.html <http://localhost/index.html>`_
* Run `code/fake_devices.py`
* PROFIT (device IDs and messages should be appearing in the browser window).
