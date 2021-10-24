<script setup>
import { ref, defineProps } from 'vue';

const key = ref('');
const value = ref('');

const props = defineProps({
    type: String,
    ekey: String,
    evalue: String,
});

if (props.ekey != '') key.value = props.ekey;
if (props.evalue != '') value.value = props.evalue;
</script>

<template>
    <teleport to="body">
        <div class="popup">
            <input v-model="key" :placeholder="type" type="text" />
            <input v-model="value" placeholder="value" type="text" />
            <button @click="$emit('save', { key, value })">Done</button>
        </div>
    </teleport>
</template>

<style scoped lang="scss">
@import "../assets/main.scss";
.popup {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 20;
    background: $accent;
    width: 80%;
    max-width: 500px;
    height: 200px;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
}
input {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: none;
    background: $light;
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    padding: 5px 20px;
    font-family: "Heebo", sans-serif;
    font-weight: 400;
    &:focus {
        outline: 1px solid white;
    }
}
button {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: none;
    background: rgb(5, 224, 53);
    font-family: "Heebo", sans-serif;
    font-weight: 400;
    font-size: 20px;
    cursor: pointer;
}
</style>