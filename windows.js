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

const getRandom = (min, max) => Math.floor(Math.random()*(max-min+1)+min);

const randpos = (elements) => {

    let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

    for (let i = 0; i < elements.length; i++) {
        const me = elements[i]
        me.style.left = getRandom(0, vw - me.offsetWidth) + "px";
        me.style.top = getRandom(0, vh - me.offsetHeight) + "px";
    }
}

window.onload = function () {
    drag(document.getElementsByClassName("draggable"));
    randpos(document.getElementsByClassName("randompos"))
};