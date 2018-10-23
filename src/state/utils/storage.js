const KEY = 'state';
const set = val => window.localStorage.setItem(KEY, JSON.stringify(val));
const get = () => JSON.parse(window.localStorage.getItem(KEY) || {});

export default {get, set};
