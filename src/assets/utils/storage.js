const storage = {
  set(data, name = "default") {
    const transferData = JSON.stringify(data);
    sessionStorage.setItem(name, transferData);
  },
  get(name = "default") {
    if (sessionStorage.getItem(name)) {
      return JSON.parse(sessionStorage.getItem(name));
    } else {
      return false;
    }
  },
  remove(name = "default") {
    sessionStorage.removeItem(name);
  },
  clear() {
    sessionStorage.clear();
  }
};

export default storage;
