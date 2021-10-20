import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// import firebase from 'firebase/app';
// import 'firebase/auth';

// const firebaseConfig = {
//     apiKey: 'AIzaSyCxLDWIExQi3bGlRsm1W8mQOkknUxnjDpQ',
//     authDomain: 'localmerch-in.firebaseapp.com',
//     projectId: 'localmerch-in',
//     storageBucket: 'localmerch-in.appspot.com',
//     messagingSenderId: '270205420368',
//     appId: '1:270205420368:web:02fddb4f25b7d8807f6255',
// };

// firebase.initializeApp(firebaseConfig);

// let app;
// firebase.auth().onAuthStateChanged(() => {
//     if (!app) {
//         app = createApp(App).use(store).use(router).mount('#app');
//     }
// });

createApp(App).use(store).use(router).mount('#app');