export default{
   get(key) {
        var v = window.sessionStorage.getItem(key);
        if (v && typeof(v) !== "undefined" && v !== "undefined") {
            return JSON.parse(v);
        }
    },
    set(key, data) {
        window.sessionStorage.setItem(key, JSON.stringify(data));
    },
    removeItem(key) {
        window.sessionStorage.removeItem(key);
    },
    clearAll() {
        window.sessionStorage.clear();
    }
}