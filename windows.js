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

            me.style.top = (me.offsetTop - dy) + "px";
            me.style.left = (me.offsetLeft - dx) + "px";
        }

        function stopDragging() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
}

window.onload = function () {
    drag(document.getElementsByClassName("draggable"));
};