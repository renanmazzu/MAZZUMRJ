/* ==========================================================
   MISSÃO RIO 2:59
   STORAGE
   ========================================================== */

const Storage = {

    get(key, defaultValue = null) {

        try {

            const value = localStorage.getItem(key);

            return value ? JSON.parse(value) : defaultValue;

        } catch (error) {

            console.error("Erro ao ler LocalStorage:", error);

            return defaultValue;

        }

    },

    set(key, value) {

        try {

            localStorage.setItem(key, JSON.stringify(value));

        } catch (error) {

            console.error("Erro ao salvar LocalStorage:", error);

        }

    },

    remove(key) {

        localStorage.removeItem(key);

    },

    clear() {

        localStorage.clear();

    }
};
