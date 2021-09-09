import Invoke from './Invoke';
import { BASE_URL } from '../env';

export default class InvokeHelper {
  constructor(token) {
    this.api = new Invoke();
    this.token = token;
  }

  getContacts = () => this.api.get(`${BASE_URL}contact`);

  getContactById = id => this.api.get(`${BASE_URL}contact/${id}`);

  deleteContact = id => this.api.delete(`${BASE_URL}contact/${id}`);

  upsertContact = (data) => {
    if (data.id) {
      const newData = Object.assign({}, data);
      delete newData.id;
      return this.api.put(`${BASE_URL}contact/${data.id}`, newData);
    }
    return this.api.post(`${BASE_URL}contact`, data);
  }
}
