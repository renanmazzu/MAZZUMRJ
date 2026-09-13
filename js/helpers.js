/* ==========================================================
   MISSÃO RIO 2:59
   HELPERS
   ========================================================== */

const Helpers = {

    formatDate(date = new Date()) {

        return new Intl.DateTimeFormat("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }).format(date);

    },

    formatNumber(value, decimals = 0) {

        return Number(value).toLocaleString("pt-BR", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });

    },

    capitalize(text = "") {

        return text.charAt(0).toUpperCase() + text.slice(1);

    },

    today() {

        return new Date();

    },

    daysBetween(start, end) {

        const oneDay = 1000 * 60 * 60 * 24;

        const difference = end.getTime() - start.getTime();

        return Math.ceil(difference / oneDay);

    },

    randomId() {

        return Math.random().toString(36).substring(2, 10);

    }

};
