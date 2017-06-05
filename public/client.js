"use strict";

let client_socket = io.connect();
let canvases = document.getElementsByTagName("canvas");

function toggleFullScreen() {
  if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen(); 
    }
  }
}

function setColor(index, color) {
    let ctx = canvases[index].getContext("2d");
	ctx.fillStyle = color;
	ctx.fillRect(0, 0, canvases[index].width, canvases[index].height);
}

function createDisplay(number_of_leds) {
    if (document.getElementsByTagName("table")[0]) {
        return 1;
    } else {
        let table = document.createElement("table");
        let width = number_of_leds; // TODO Add proper row/col calculation
        let height = 1; // TODO Add proper row/col calculation

        // TODO Add proper row/col calculation
        if (number_of_leds == 4) {
            width = 2;
            height = 2;
        } else if (number_of_leds == 6) {
            width = 3;
            height = 2;
        }


        for (let row = 0; row < height; ++row) {
            let tr = document.createElement("tr");
            table.appendChild(tr);

            for (let col = 0; col < width; ++col) {
                let td = document.createElement("td");
                let canvas = document.createElement("canvas");
                td.appendChild(canvas);
                tr.appendChild(td);
            }
        }
        document.body.appendChild(table);
        canvases = document.getElementsByTagName("canvas");
    }
}

client_socket.on('message', function (msg, info) {
    createDisplay(msg.red.length);

    for (let i = 0; i < canvases.length; ++i) {
        setColor(i, "rgb(" + msg.red[i] + "," + msg.green[i] + "," + msg.blue[i] + ")");
    }
});

document.body.addEventListener('click', function(event) {
	toggleFullScreen();
}, false);