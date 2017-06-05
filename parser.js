module.exports = function () {
    let module = {};
    let parsed_lights = {
        red: [],
        green: [],
        blue: []
    };

    module.queue_of_lights = [];

    function resetLights() {
        parsed_lights = {
            red: [],
            green: [],
            blue: []
        };
    }

    module.parseRawLights = function(data) {
        resetLights();

        for (let i = 0; i < data.length - 2; i = i + 3) {
            parsed_lights.red.unshift(data[i]);
            parsed_lights.green.unshift(data[i + 1]);
            parsed_lights.blue.unshift(data[i + 2]);
        }

        return parsed_lights;
    };

    return module;
};