#!/usr/bin/env python
# -*- coding: utf-8 -*-
import uuid
import time

import mqtt_glue
from mqtt_glue import MQTT_AUTH


class SWADevice(object):
    def __init__(self, device_id, device_kind=None):
        self.device_id = device_id
        if device_kind is None:
            device_kind = "SWAD"
        self.device_kind = device_kind
        self.message_id = 0

    @property
    def device_topic(self):
        return '/'.join((self.device_kind, self.device_id))

    @property
    def kind_topic(self):
        return '/'.join((self.device_kind,))

    def emit(self):
        payload = dict(
            device_id=self.device_id,
            device_kind=self.device_kind,
            data="Message #{:04d}".format(self.message_id)
        )
        for topic in (self.device_topic, self.kind_topic):
            print("{!r}: +{!r}".format(self.device_id, topic))
            mqtt_glue.pub(payload, topic, auth=MQTT_AUTH)

        self.message_id += 1


if __name__ == '__main__':
    DEVICES = [
        SWADevice('ix40', 'humidity')
    ]
    KINDS = ('temperature', 'humidity',)

    for x in range(2):
        for kind in KINDS:
            device_id = uuid.uuid4().hex
            swad_obj = SWADevice(device_id, kind)
            DEVICES.append(swad_obj)

    while True:
        for device in DEVICES:
            device.emit()
            time.sleep(0.5)
