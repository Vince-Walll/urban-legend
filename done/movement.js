joyStick.addEventListener("pointerdown", e => {
    player.setPointerCapture(e.pointerId);
    touchX = e.clientX;
    touchY = e.clientY;
    playerX = player.offsetLeft;
    playerY = player.offsetTop;

    const drag = e => {
        const x = playerX + (e.clientX - touchX);
        const y = playerY + (e.clientY - touchY);
        player.style.left = Math.max(0, Math.min(x, box.clientWidth - player.offsetWidth)) + "px";
        player.style.top = Math.max(0, Math.min(y, box.clientHeight - player.offsetHeight)) + "px";
    };

    const up = e => {
        player.removeEventListener("pointermove", drag);
        player.removeEventListener("pointerup", up);
        player.removeEventListener("pointercancel", up);
    };

    player.addEventListener("pointermove", drag);
    player.addEventListener("pointerup", up);
    player.addEventListener("pointercancel", up);

});