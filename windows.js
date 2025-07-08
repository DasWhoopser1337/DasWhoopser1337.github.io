function drag(draggables) {
    for (let i = 0; i < draggables.length; i++) {
        const me = draggables[i];
        const topBar = me.getElementsByClassName("top-bar")[0];

        let dx = 0, dy = 0;
        let mx = 0, my = 0;

        topBar.onmousedown = function (ev) {
            ev.preventDefault();
            mx = ev.clientX;
            my = ev.clientY;

            document.onmouseup = stopDragging;
            document.onmousemove = doDragging;

        };

        function doDragging(ev) {
            ev.preventDefault();
            dx = mx - ev.clientX;
            dy = my - ev.clientY;
            mx = ev.clientX;
            my = ev.clientY;

            if ((me.offsetTop - dy) > 0) {
                me.style.top = (me.offsetTop - dy) + "px";
            }

            if ((me.offsetLeft - dx) > 0) {
                me.style.left = (me.offsetLeft - dx) + "px";
            }
        }

        function stopDragging() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
}

function init_windows(windows) {

    for (let i = 0; i < windows.length; i++) {
        const me = windows[i];
        me.dataset.state = "-1";
        me.dataset.delay = String(Math.max(i * 30 + getRandom(- i * 30, 30), 0));
        console.log(me.dataset.delay);
    }

}


function animate_windows(windows) {

    for (let i = 0; i < windows.length; i++) {
        const me = windows[i];

        let fdelay = parseFloat(me.dataset.delay);

        if (fdelay <= 0) {

            switch (me.dataset.state) {

                case "-1" :
                    randpos(me);
                    me.dataset.state = "0"
                    me.style.visibility = "visible";
                    me.style.opacity = 0.5;
                    me.style.transform = "scale(0.05)";
                    me.style.filter = "grayscale(100%) brightness(1.2)";

                    me.dataset.prog = "0";
                break;

                case "0" :
                    let fprog = parseFloat(me.dataset.prog);
                    fprog += 0.1;
                    me.dataset.prog = String(fprog);
                    me.style.transform = "scale(" + (fprog) + ")";
                    me.style.opacity = 0.5 + fprog;

                    if (fprog >= 1.0) {
                        me.dataset.state = "1";
                    }
                break;

                case "1" :
                    me.style.filter = "none";

            }
        }
        else {
            fdelay -= 1;
            me.dataset.delay = String(fdelay);
        }
    }

}

function window_tick() {
    
    animate_windows(document.getElementsByClassName("window animated"));
    requestAnimationFrame(window_tick);
};

const getRandom = (min, max) => Math.floor(Math.random()*(max-min+1)+min);

const randpos = (me) => {

    let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

    me.style.left = getRandom(0, vw - me.offsetWidth) + "px";
    me.style.top = getRandom(0, vh - me.offsetHeight) + "px";
}

window.onload = function () {

    drag(document.getElementsByClassName("draggable"));
    init_windows(document.getElementsByClassName("window animated"));
    requestAnimationFrame(window_tick);
};