#!/usr/bin/env python
# -*- coding: utf-8 -*-
import uuid
import time
import random

import mqtt_glue

# see https://www.rabbitmq.com/mqtt.html
MQTT_AUTH = {
    'username': "mqtt-test",
    'password': "mqtt-test"
}

MESSAGES = [
    "There may be honor among thieves, but there's none in politicians.",
    "I cannot fiddle but I can make a great state of a small city.",
    "The best of them won't come for money; they'll come for me.",
    "The truth is: I'm an ordinary man. You might've told me that, Dryden.",
    "What I owe you is beyond evaluation.",
    "Thine mother mated with a scorpion.",
    "Damn it, Lawrence! Who do you take your orders from?"
]


def register_device(device_id):
    payload = dict(
        device_id=device_id
    )
    sub_topic = "register"
    mqtt_glue.pub(payload, sub_topic, auth=MQTT_AUTH)


def pusher(device_id):
    random.shuffle(MESSAGES)
    payload = dict(
        device_id=device_id,
        data=MESSAGES[0]
    )
    sub_topic = "message"
    print("{!r} pushing {!r}".format(device_id, payload['data']))
    mqtt_glue.pub(payload, sub_topic, auth=MQTT_AUTH)


if __name__ == '__main__':
    DEVICES = []

    for x in range(5):
        device_id = uuid.uuid4().hex
        DEVICES.append(device_id)
        print("Registering {!r}".format(device_id))
        register_device(device_id)
        time.sleep(0.1)

    while True:
        for device_id in DEVICES:
            pusher(device_id)
            time.sleep(0.5)
