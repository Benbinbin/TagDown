import Dexie from 'dexie';
import { createApp } from 'vue';
import App from './App.vue';
import '@/styles/tailwind.css';

const app = createApp(App);

const db = new Dexie('tagdown');
db.version(1).stores({
  bookmark: 'id, *tags, *groups',
  share: 'id, share',
  star: 'id, star',
});
db.open().then((database) => {
  app.provide('db', database);
  app.mount('#app');
}).catch((err) => {
  // Error occurred
  console.log(err);
});
