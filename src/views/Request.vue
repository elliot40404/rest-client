<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { VAceEditor } from 'vue3-ace-editor';
import 'ace-builds/src-noconflict/mode-json5';
import 'ace-builds/src-noconflict/theme-one_dark';
import AddPopup from '../components/AddPopup.vue';

const router = useRouter();

// -- bools

const showHeaders = ref(true);
const showParams = ref(true);
const showAddHeaders = ref(false);
const showAddParams = ref(false);

// -- strings

const url = ref('');
const method = ref('GET');
const body = ref('false');
const content = ref('');

//-- compute final request url

const finalUrl = computed(() => {
    let uri = url.value;
    if (uri.endsWith('?') || uri.endsWith('/')) {
        uri = uri.substring(0, uri.length - 1);
    }
    if (params.value.length > 0) {
        // -- replace path variables
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

// -- watchers

// >> popup management

watch(showAddHeaders, (newVal, oldVal) => {
    if (newVal) {
        showAddParams.value = false;
    }
});

watch(showAddParams, (newVal, oldVal) => {
    if (newVal) {
        showAddHeaders.value = false;
    }
});

// >> add path variables

watch(url, () => {
    paramCheck();
});

const paramCheck = () => {
    const uri = url.value;
    if (!uri.startsWith('http')) return params.value = [];
    if (!uri.split("/").some(x => x.startsWith(":"))) return params.value = [];
    // if variable start with : and ends with /
    const updated = [];
    uri.split('/').filter(e => e.startsWith(':'))
        .forEach(e => {
            if (!uri.endsWith('/')) return
            updated.push({
                key: e,
                value: 'value',
            });
            params.value = updated;
        });
}

// -- arrays

const headers = ref([]);

const params = ref([]);

// -- selector functions

const changeMethod = (e) => {
    method.value = e.target.value;
}

const changeBody = (e) => {
    body.value = e.target.value;
}

// -- event functions

const addHeader = (e) => {
    hide();
    headers.value.push({
        key: e.key,
        value: e.value,
    });
}

const removeHeader = (key, index) => {
    // remove a header from the array
    headers.value = headers.value.filter(header => header.key !== key);
}

const addParam = (e) => {
    hide();
    params.value.push({
        key: e.key,
        value: e.value,
    });
}

const removeParam = (key, index) => {
    // remove a param from the array
    params.value = params.value.filter(param => param.key !== key);
}

const send = async () => {
    const reqHeaders = {};
    headers.value.forEach(header => {
        reqHeaders[header.key] = header.value;
    });
    let req
    if (method.value == 'GET') {
        req = await fetch(finalUrl.value, {
            method: method.value,
            headers: reqHeaders,
        });
    } else {
        req = await fetch(finalUrl.value, {
            method: method.value,
            headers: reqHeaders,
            body: content.value,
        });
    }
    const res = await req.json();
    router.push({ name: 'Response', params: { response: JSON.stringify(res, null, 2) } });
}

const hide = () => {
    showAddHeaders.value = false;
    showAddParams.value = false;
}

</script>

<template>
    <div @click="hide" class="container">
        <h1 class="heading">REST CLIENT</h1>
        <div class="urlbar">
            <h2>URL</h2>
            <div class="input">
                <input
                    type="text"
                    v-model="url"
                    @keydown="paramCheck"
                    placeholder="https://example.com/v1/api/route/:id"
                />
                <button @click="send">
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
            <h2 @click.stop="showAddHeaders = true">
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
        <div class="collapse">
            <h2 @click.stop="showAddParams = true">
                ADD PARAMS
                <ion-icon
                    v-if="showParams"
                    @click.stop="showParams = false"
                    name="caret-down-outline"
                ></ion-icon>
                <ion-icon v-else @click.stop="showParams = true" name="caret-up-outline"></ion-icon>
            </h2>
            <transition name="slide-down" appear>
                <div v-if="showParams && url" class="params">
                    <transition-group name="slide-down">
                        <div
                            v-for="(param, index) in params"
                            :key="param"
                            class="param"
                            @click="editParam(param.key, index)"
                        >
                            <h3>{{ param.key }}</h3>
                            <h3>{{ param.value }}</h3>
                            <ion-icon
                                @click.stop="removeParam(param.key, index)"
                                name="close-circle-outline"
                            ></ion-icon>
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
                <v-ace-editor
                    v-model:value="content"
                    @init="editorInit"
                    lang="json5"
                    theme="one_dark"
                    class="editor"
                />
            </div>
        </div>
        <button v-if="url" @click="send" class="send">SEND REQUEST</button>
        <AddPopup @save="addHeader" type="header" v-if="showAddHeaders" />
        <AddPopup @save="addParam" type="query" v-if="showAddParams" />
        <!-- <nav>
            <h2 @click="$emit('req')">REQUEST</h2>
            <h2 @click="$emit('res')">RESPONSE</h2>
        </nav>-->
    </div>
</template>

<style scoped lang="scss">
@import "../assets/main.scss";
.container {
    padding: 30px 21px;
    min-height: calc(100vh - 50px);
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
            cursor: pointer;
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

// nav {
//     position: fixed;
//     bottom: 0;
//     left: 0;
//     width: 100%;
//     height: 50px;
//     background: $primary;
//     border-radius: 10px 10px 0 0;
//     display: flex;
//     justify-content: space-around;
//     align-items: center;
//     padding: 5px 21px;
//     h2 {
//         color: #000;
//         cursor: pointer;
//         &:hover {
//             color: rgb(255, 255, 255);
//         }
//     }
// }

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