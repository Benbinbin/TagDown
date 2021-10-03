import Dexie from 'dexie';
import { createApp } from 'vue';
import App from './App.vue';
import '@/styles/tailwind.css';

const app = createApp(App);

const db = new Dexie('tagdown');
db.version(1).stores({
  bookmarkIcon: 'id',
  bookmark: 'id, *tags, *groups',
  share: 'id',
  star: 'id',
});
db.open().then((database) => {
  app.provide('db', database);
  app.mount('#app');
}).catch((err) => {
  // Error occurred
  console.log(err);
});
