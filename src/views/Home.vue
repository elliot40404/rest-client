<script setup>
import { ref, computed } from 'vue';
import { VAceEditor } from 'vue3-ace-editor';
import 'ace-builds/src-noconflict/mode-json5';
import 'ace-builds/src-noconflict/theme-one_dark';
import axios from 'axios';
// -- bools

const showHeaders = ref(true);
const showParams = ref(true);

// -- strings

const url = ref('https://example.com/v1/api/route/:page?');
const method = ref('GET');
const body = ref('false');
const content = ref('');

//-- compute final request url

const finalUrl = computed(() => {
    let uri = url.value;
    if (uri.endsWith('?')) {
        uri = uri.substring(0, uri.length - 1);
    }
    if (params.value.length > 0) {
        // -- replace url params
        params.value.forEach(param => {
            uri = uri.replace(`${param.key}`, param.value);
        });
        // -- replace query params
        const query = params.value.filter(param => param.key[0] !== ':');
        if (query.length > 0) {
            if (uri.search(/\?/g) !== -1) {
                query.forEach(param => {
                    if (!uri.endsWith('&')) uri += '&';
                    uri += `${param.key}=${param.value}&`;
                });
                uri = uri.slice(0, -1);
            } else {
                uri += '?';
                query.forEach(param => {
                    uri += `${param.key}=${param.value}&`;
                });
                uri = uri.slice(0, -1);
            }
        }
    }
    return uri;
});

// -- arrays

const headers = ref([
    {
        key: 'Accept',
        value: 'application/json',
    },
    {
        key: 'Content-Type',
        value: 'application/json',
    },
]);
const params = ref([
    {
        key: ':page',
        value: '1',
    },
    {
        key: 'per_page',
        value: '10',
    },
]);

// -- selector functions

const changeMethod = (e) => {
    method.value = e.target.value;
}

const changeBody = (e) => {
    body.value = e.target.value;
}

// -- event functions

const addHeader = (e) => {
    // open a pop to add a header and append to an existing array
    // show popup with one select and one input
    // on submit, add the header to the array
}

const editHeader = (e) => {
    // open a pop to edit a header and append to an existing array
    // show popup with one select and one input
    // on submit, edit the header to the array
}

const removeHeader = (e) => {
    // remove a header from the array
}

const addParam = (e) => {
    // open a pop to add a param and append to an existing array
    // figure out url or query param based on ':'
    // show popup with two inputs
    // on submit, add the param to the array
}

const editParam = (e) => {
    // open a pop to edit a param and append to an existing array
    // figure out url or query param based on ':'
    // show popup with two inputs
    // on submit, edit the param to the array
}

const removeParam = (e) => {
    // remove a param from the array
}

const send = () => {
    // send the request
    // on success, show response = on error, show error
}

</script>

<template>
    <div class="container">
        <h1 class="heading">REST CLIENT</h1>
        <div class="urlbar">
            <h2>URL</h2>
            <div class="input">
                <input type="text" v-model="url" placeholder="https://example.com/v1/api/route/:id" />
                <button>
                    <ion-icon name="send"></ion-icon>
                </button>
            </div>
        </div>
        <div class="method">
            <h2>METHOD</h2>
            <select @change="changeMethod" class="http" name="method" id="method">
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="PATCH">PATCH</option>
                <option value="DELETE">DELETE</option>
            </select>
        </div>
        <div class="collapse">
            <h2 @click="addHeader">
                ADD HEADERS
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
                        <div v-for="(header, index) in headers" :key="index" class="header">
                            <h3>{{ header.key }}</h3>
                            <h3>{{ header.value }}</h3>
                        </div>
                    </transition-group>
                </div>
            </transition>
        </div>
        <div class="collapse">
            <h2 @click="addParam">
                ADD PARAMS
                <ion-icon
                    v-if="showParams"
                    @click.stop="showParams = false"
                    name="caret-down-outline"
                ></ion-icon>
                <ion-icon v-else @click.stop="showParams = true" name="caret-up-outline"></ion-icon>
            </h2>
            <transition name="slide-down" appear>
                <div v-if="showParams" class="params">
                    <transition-group name="slide-down">
                        <div v-for="(param, index) in params" :key="index" class="param">
                            <h3>{{ param.key }}</h3>
                            <h3>{{ param.value }}</h3>
                        </div>
                    </transition-group>
                    <h3 v-if="url && params.length" class="preview">{{ finalUrl }}</h3>
                </div>
            </transition>
        </div>
        <div class="data">
            <div class="method">
                <h2>BODY</h2>
                <select @change="changeBody" class="http" name="data" id="data">
                    <option value="false">NO BODY</option>
                    <option value="true">JSON</option>
                </select>
            </div>
            <div v-if="body == 'true'" class="json">
                <!-- <textarea></textarea> -->
                <v-ace-editor
                    v-model:value="content"
                    @init="editorInit"
                    lang="json5"
                    theme="one_dark"
                    class="editor"
                />
            </div>
        </div>
        <button @click="send" class="send">SEND REQUEST</button>
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
.urlbar {
    h2 {
        margin-bottom: 10px;
    }
    ion-icon {
        font-size: 24px;
    }
    .input {
        display: flex;
        gap: 21px;
        input {
            width: 90%;
            height: 50px;
            padding: 10px 10px;
            font-family: "Heebo", sans-serif;
            font-size: 1.6em;
            font-weight: 500;
            color: #fff;
            background-color: $light;
            border: none;
            border-radius: 5px;
            &:focus {
                outline: 2px solid #ffffff;
            }
        }
        button {
            background: $primary;
            border: none;
            border-radius: 5px;
            width: 15%;
        }
    }
}
.method {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .http {
        border: none;
        font-size: 2em;
        color: $primary;
        background: $dark;
        text-align: right;
    }
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
        h3 {
            flex: 1;
            color: #fff;
            font-family: "Heebo", sans-serif;
            font-weight: normal;
            font-size: 1.6em;
            padding: 0 0 0 8px;
            max-height: 40px;
            overflow: scroll;
        }
        &::before {
            content: "";
            position: absolute;
            height: 90%;
            width: 1px;
            background: #5a5a5a;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
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
        overflow: scroll;
    }
}
.json {
    margin-top: 10px;
    textarea {
        width: 100%;
        min-height: 50px;
        padding: 10px;
        resize: vertical;
        font-family: "Heebo", sans-serif;
        background: $accent;
        border: none;
        border-radius: 10px;
        margin-top: 10px;
        color: #fff;
        &:focus {
            outline: 2px solid #ffffff;
        }
    }
    .editor {
        border-radius: 5px;
        height: 200px;
        font-size: 14px;
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
</style>