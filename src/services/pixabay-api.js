import axios from 'axios';
import Notiflix from 'notiflix';

const KEY = '27495256-af825ffcf26d4c7b8b5ea146c';
const URL = 'https://pixabay.com/api/';

export const params = {
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
  page: 1,
  safesearch: 'true',
};

const customAxios = axios.create({
  baseURL: URL,
  params: {
    key: KEY,
  },
});

export const getData = async params => {
  try {
    const response = await customAxios.get('', {
      params,
    });

    const data = await response.data
    return data
    //return response.data;
  } catch (error) {
    Notiflix.Notify.failure(`Smth went wrong ${error}`);
    throw new Error(`Smth went wrong ${error}`);
  }
};

