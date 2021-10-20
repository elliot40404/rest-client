<template>
    <div class="cont">
        <div class="con">
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="main">
                <h1>404</h1>
                <p>It looks like you're lost...<br />That's a trouble?</p>
                <button @click="back" type="button">Go back</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: '404',
    methods: {
        back() {
            location.href = '/';
        },
    },
};
</script>

<style lang="scss" scoped>
$c-1: #62a1ff;
$c-2: lighten($c-1, 3%);

.con {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-family: 'Varela Round', Sans-serif;
    text-shadow: 0 30px 10px rgba(#000, 0.15);
    background: linear-gradient($c-1, $c-2);
    height: 100vh;
    &:before {
        height: 60vmax;
        width: 60vmax;
        z-index: -2;
    }
    &:after {
        height: 40vmax;
        width: 40vmax;
        z-index: -1;
    }
}

.main {
    text-align: center;
    z-index: 5;
}

p {
    font-size: 18px;
    margin-top: 0;
}

h1 {
    font-size: 95px;
    margin: 0;
}

button {
    background: linear-gradient(#ec5dc1, #d61a6f);
    padding: 0 12px;
    border: none;
    border-radius: 20px;
    box-shadow: 0 30px 15px rgba(#000, 0.15);
    outline: none;
    color: #fff;
    font: 400 16px/2.5 Nunito, 'Varela Round', Sans-serif;
    text-transform: uppercase;
    cursor: pointer;
    margin: 50px;
}

.bubble {
    background: linear-gradient(#ec5dc1, #d61a6f);
    border-radius: 50%;
    box-shadow: 0 30px 15px rgba(#000, 0.15);
    position: absolute;
    &:before,
    &:after {
        content: '';
        background: linear-gradient(#ec5dc1, #d61a6f);
        border-radius: 50%;
        box-shadow: 0 30px 15px rgba(#000, 0.15);
        position: absolute;
    }
    &:nth-child(1) {
        top: 15vh;
        left: 15vw;
        height: 22vmin;
        width: 22vmin;
        &:before {
            width: 13vmin;
            height: 13vmin;
            bottom: -25vh;
            right: -10vmin;
        }
    }
    &:nth-child(2) {
        top: 20vh;
        left: 38vw;
        height: 10vmin;
        width: 10vmin;
        &:before {
            width: 5vmin;
            height: 5vmin;
            bottom: -10vh;
            left: -8vmin;
        }
    }
    &:nth-child(3) {
        top: 12vh;
        right: 30vw;
        height: 13vmin;
        width: 13vmin;
        &:before {
            width: 3vmin;
            height: 3vmin;
            bottom: -15vh;
            left: -18vmin;
            z-index: 6;
        }
    }
    &:nth-child(4) {
        top: 25vh;
        right: 18vw;
        height: 18vmin;
        width: 18vmin;
        &:before {
            width: 7vmin;
            height: 7vmin;
            bottom: -10vmin;
            left: -15vmin;
        }
    }
    &:nth-child(5) {
        top: 60vh;
        right: 18vw;
        height: 28vmin;
        width: 28vmin;
        &:before {
            width: 10vmin;
            height: 10vmin;
            bottom: 5vmin;
            left: -25vmin;
        }
    }
}
</style>