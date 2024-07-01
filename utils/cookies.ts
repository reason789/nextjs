import Cookies from 'js-cookie';

export const setCookie = (key, value, options = {}) => {
  Cookies.set(key, JSON.stringify(value), { ...options });
};

export const getCookie = (key) => {
  const value = Cookies.get(key);
  return value ? JSON.parse(value) : null;
};

export const eraseCookie = (key) => {
  Cookies.remove(key);
};
