#!/usr/bin/env python
# -*- coding: utf-8 -*-
from paho.mqtt import publish

import json

#: MQTT broker hostname
MQTT_HOST = "127.0.0.1"

#: MQTT broker port
MQTT_PORT = 1883

#: overmind specific main topic
MQTT_TOPIC_NAMESPACE = 'ix'

MQTT_SUB_TOPIC = 'ix'


def pub(payload, sub_topic=None):
    if sub_topic is None:
        sub_topic = MQTT_SUB_TOPIC

    topic = '/'.join((MQTT_TOPIC_NAMESPACE, sub_topic))

    if not isinstance(payload, basestring):
        payload = json.dumps(payload)

    publish.single(topic, payload=payload,
                   hostname=MQTT_HOST, port=MQTT_PORT)
    return dict(topic=topic, payload=payload)
