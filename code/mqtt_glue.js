const MQTT_HOST = "127.0.0.1";
const MQTT_WS_PORT = 15675;
const MQTT_TOPIC_NAMESPACE = 'ix';
const XHR_TIMEOUT = 1000;

function add_mqtt_listener(topic, message_callback) {
    const lp = '[add_mqtt_listener] ';
    let cliid = "OVM_" + parseInt(Math.random() * 100, 10) + "_plus";

    if (typeof topic === 'undefined') {
        console.warn(lp + "topic undefined!");
        topic = MQTT_TOPIC_NAMESPACE + '/*';
    }
    let url = new URI(window.location);
    let ws_scheme = url.scheme() == 'https' ? 'wss' : 'ws';
    let ws_host = url.host();

    if (get_url_parameter("ws") !== "relative") {
        if ((url.hostname() == 'localhost') || (url.hostname() == '127.0.0.1')) {
            ws_host = '10.11.12.1';
        }
    }

    let ws_url = new URI(ws_scheme + '://' + ws_host + '/ws');
    console.info("Determining WebSocket URL: " + url.toString() + " -> " + ws_url.toString());
    var client = new Paho.Client(ws_url.toString(), cliid);

    // add_toaster("WebSocket", ws_url.toString());

    if (typeof message_callback === 'undefined') {
        client.onMessageArrived = function (message) {
            let toast_parameters = {
                "body": message.payloadString,
                "title": "WebSocket Message"
            };

            try {
                let data = JSON.parse(message.payloadString);
                toast_parameters.body = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
                toast_parameters.title = message.topic;

                console.info(message.topic + ":");
                console.info(JSON.stringify(data, null, 2));

                if ((typeof data.class !== 'undefined') && (data.class !== null)) {
                    // console.log("class=" + data.class);

                    let css_classes = [data.class, "device"];

                    toast_parameters.body = data.label;
                    if (message.topic == MQTT_TOPIC_NAMESPACE + "/device-vanished") {
                        toast_parameters.title = "Offline";
                        css_classes.push("offline");
                    }
                    else {
                        toast_parameters.title = "Online";
                        css_classes.push("online");
                    }

                    toast_parameters.class = css_classes.join(" ");
                    if (message.topic == 'ix/device-appeared-dhcp') {
                        set_status_badge_level(data.class, 2);
                    }
                    else if (message.topic == MQTT_TOPIC_NAMESPACE + "/device-appeared") {
                        increase_status_badge_level(data.class);
                    }
                    else if (message.topic == MQTT_TOPIC_NAMESPACE + "/device-vanished") {
                        decrease_status_badge_level(data.class);
                    }
                }
                else {
                    console.log("onMessageArrived:" + message.payloadString + "[" + message.topic + "]");
                }
            }
            catch (e) {
                // ignored
            }

            add_toaster(toast_parameters);
        };
    }
    else {
        console.debug(lp + "Using custom message callback");
        client.onMessageArrived = message_callback;
    }

    let connect_options = {
        "onSuccess": onConnect,
        "keepAliveInterval": 15
    };

    client.onConnectionLost = function (responseObject) {
        if (responseObject.errorCode !== 0) {
            // console.log("onConnectionLost:" + responseObject.errorMessage);
            console.debug("Reconnect WebSocket");
            client.connect(connect_options);
        }
    };

    client.connect(connect_options);

    // called when the client connects
    function onConnect() {
        // Once a connection has been made, make a subscription and send a message.
        console.debug("Connected (" + cliid + "), subscribing to '" + topic + "'");
        client.subscribe(topic);
        // message = new Paho.Message("Hello - " + cliid);
        // message.destinationName = "World";
        // client.send(message);
    }
}

function on_status_dog_loaded() {

    add_mqtt_listener();

    // add_mqtt_listener(MQTT_TOPIC_NAMESPACE + "/x");
}
