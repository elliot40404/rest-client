<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { VAceEditor } from 'vue3-ace-editor';
import 'ace-builds/src-noconflict/mode-json5';
import 'ace-builds/src-noconflict/theme-one_dark';

const router = useRouter();
const route = useRoute()

onMounted(() => {
    content.value = route.params.response;
})

// -- bools

const showHeaders = ref(true);

// -- strings

const content = ref('');

// -- arrays

const headers = ref([]);


</script>

<template>
    <div class="container">
        <h1 class="heading">REST CLIENT</h1>
        <div class="method">
            <h2>STATUS</h2>
            <h2>200 OK</h2>
            <h2>69.9ms</h2>
        </div>
        <div class="collapse">
            <h2 @click="addHeader">
                HEADERS
                <ion-icon
                    v-if="showHeaders"
                    @click.stop="showHeaders = false"
                    name="caret-down-outline"
                ></ion-icon>
                <ion-icon v-else @click.stop="showHeaders = true" name="caret-up-outline"></ion-icon>
            </h2>
            <transition name="slide-down" appear>
                <div v-if="showHeaders" class="headers">
                    <transition-group name="slide-down">
                        <div
                            v-for="(header, index) in headers"
                            :key="index"
                            class="header"
                            @click="editHeader(header.key, index)"
                        >
                            <h3>{{ header.key }}</h3>
                            <h3>{{ header.value }}</h3>
                            <ion-icon
                                @click.stop="removeHeader(header.key, index)"
                                name="close-circle-outline"
                            ></ion-icon>
                        </div>
                    </transition-group>
                </div>
            </transition>
        </div>
        <div class="data">
            <div class="method">
                <h2>BODY</h2>
            </div>
            <div class="json">
                <v-ace-editor
                    v-model:value="content"
                    @init="editorInit"
                    lang="json5"
                    theme="one_dark"
                    class="editor"
                />
            </div>
        </div>
        <button @click="send" class="send">RESEND REQUEST</button>
    </div>
</template>

<style scoped lang="scss">
@import "../assets/main.scss";
.container {
    padding: 30px 21px;
    min-height: 100vh;
    width: 100vw;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 21px;
}
h1.heading {
    color: $primary;
    font-size: 3em;
}
h2 {
    color: $primary;
}
.method {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.collapse {
    h2 {
        background: $accent;
        padding: 10px;
        border-radius: 5px;
        font-size: 1.8em;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        cursor: pointer;
    }
    ion-icon {
        font-size: 20px;
        padding: 5px;
        cursor: pointer;
    }
    .header,
    .param {
        background: $light;
        display: flex;
        align-items: center;
        padding: 10px;
        border-radius: 5px;
        position: relative;
        margin-top: 10px;
        cursor: pointer;
        h3 {
            flex: 1;
            color: #fff;
            font-family: "Heebo", sans-serif;
            font-weight: normal;
            font-size: 1.6em;
            padding: 0 0 0 8px;
            max-height: 40px;
            overflow: auto;
        }
        h3:nth-child(2) {
            border-left: 1px solid $primary;
            z-index: 1;
        }
        ion-icon {
            color: rgb(255, 145, 0);
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            z-index: 2;
            background: $light;
        }
        // &::before {
        //     content: "";
        //     position: absolute;
        //     height: 80%;
        //     width: 1px;
        //     background: #5a5a5a;
        //     top: 50%;
        //     left: 50%;
        //     transform: translate(-50%, -50%);
        // }
    }
    h3.preview {
        margin-top: 10px;
        padding: 10px;
        font-family: "Heebo", sans-serif;
        color: #fff;
        font-size: 1.4em;
        font-weight: normal;
        background: $accent;
        border-radius: 5px;
        max-height: 100px;
        overflow: auto;
    }
}
.json {
    margin-top: 10px;
    .editor {
        border-radius: 5px;
        height: 60vh;
        font-size: 16px;
        font-family: monospace !important;
    }
}
.send {
    background: $primary;
    border: none;
    border-radius: 5px;
    width: 100%;
    height: 50px;
    font-size: 1.8em;
    cursor: pointer;
    font-family: "Audiowide", sans-serif;
}

.slide-down-enter-active,
.slide-down-leave-active {
    transition: all 0.2s ease-in;
}
.slide-down-enter-from,
.slide-down-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

@media only screen and (min-width: 768px) {
    .container {
        max-width: 800px;
        margin: 0 auto;
    }
}
</style>