import axios from 'axios';
import Config from '@/configs/Config';

const client = axios.create({
  baseURL: Config.getServerUrl,
  headers: {
    'Content-Type': 'application/json',
  }
})

export default client;