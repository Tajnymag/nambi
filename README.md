# Nambi

** This project was made mainly out of a pure curiosness **

Have you ever wanted to try one of those cool ambilight systems but were too lazy/poor to actually create or buy one. Now's your chance. To run this Lighting system, you need only a Unix-based system and any device with a recent version of a web browser.

## Requirements
* [Hyperion](https://github.com/hyperion-project/hyperion)
* Nambi
* NodeJs 6+
* Web Browser supporting ES6

## Installation
1. Install Hyperion and NodeJs
2. Install Nambi by issuing
	```shell
	sudo npm install -g tajnymag/nambi
	```
3. Create new Hyperion config
	* output device
		* type: UDP (can be new imp)
		* protocol: 0
		* output: "IP_OF_DEVICE_WITH_NAMBI:ANY_PORT"
		* colorOrder: "rgb"
	* LEDs
		* best to use as low amount of leds as possible as Nambi currently displays all LEDs on the same display
4. Start Hyperion
	```shell
	hyperiond hyperion-config.json
	```
5. Start Nambi
	```shell
	# when run without any arguments, Nambi will use port 19446
	nambi --hyperion THE_PORT_NUMBER_YOU_SET_IN_HYPERION
	```
6. Navigate your device's browser to your Nambi's IP address and port 3000
	```shell
	# for example
	firefox localhost:3000
	```