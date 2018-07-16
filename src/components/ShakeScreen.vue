<template>
    <div></div>
</template>
<script>
    export default {
        name: "shake-screen",
        data() {
            return {
                hasDeviceMotion: 'ondevicemotion' in window,
                options: {
                    threshold: 10, //default velocity threshold for shake to register
                    timeout: 1000 //default interval between events
                },
                lastTime: new Date(),
                lastX: null,
                lastY: null,
                lastZ: null,
            }
        },
        mounted() {
            setTimeout(() => {
                this.start()
            })
        },
        methods: {
            reset() {
                this.lastTime = new Date();
                this.lastX = null;
                this.lastY = null;
                this.lastZ = null;
            },
            start() {
                this.reset();
                if (this.hasDeviceMotion) {
                    window.addEventListener('devicemotion', this.calculateMotion, false);
                }
            },
            stop() {
                if (this.hasDeviceMotion) {
                    window.removeEventListener('devicemotion', this.calculateMotion, false);
                }
                this.reset();
            },
            calculateMotion(event) {
                var current = event.accelerationIncludingGravity;
                var currentTime;
                var timeDifference;
                var deltaX = 0;
                var deltaY = 0;
                var deltaZ = 0;

                if ((this.lastX === null) && (this.lastY === null) && (this.lastZ === null)) {
                    this.lastX = current.x;
                    this.lastY = current.y;
                    this.lastZ = current.z;
                    return;
                }

                deltaX = Math.abs(this.lastX - current.x);
                deltaY = Math.abs(this.lastY - current.y);
                deltaZ = Math.abs(this.lastZ - current.z);

                if (
                    ((deltaX > this.options.threshold) && (deltaY > this.options.threshold)) ||
                    ((deltaX > this.options.threshold) && (deltaZ > this.options.threshold)) ||
                    ((deltaY > this.options.threshold) && (deltaZ > this.options.threshold))) {
                    //calculate time in milliseconds since last shake registered
                    currentTime = new Date();
                    timeDifference = currentTime.getTime() - this.lastTime.getTime();

                    if (timeDifference > this.options.timeout) {
                        this.$emit('shake') //it's time to emit new event...
                        this.lastTime = new Date();
                    }
                }

                this.lastX = current.x;
                this.lastY = current.y;
                this.lastZ = current.z;
            }
        },

    }
</script>

<style>

</style>

