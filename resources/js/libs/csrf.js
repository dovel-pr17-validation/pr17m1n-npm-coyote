import axios from "axios";
import {SOCKET_ID} from './realtime.ts';

const csrfToken = document
  .querySelector('meta[name="csrf-token"]')
  .getAttribute('content');
setToken(csrfToken);

export default function setToken(token) {
  axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
  axios.defaults.headers.common['X-Socket-ID'] = SOCKET_ID;
}
