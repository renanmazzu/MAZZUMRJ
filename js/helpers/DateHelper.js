const DateHelper = {

    months: [
        "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
        "Jul", "Ago", "Set", "Out", "Nov", "Dez"
    ],

    weekdays: [
        "Dom",
        "Seg",
        "Ter",
        "Qua",
        "Qui",
        "Sex",
        "Sáb"
    ],

    format(dateString) {

        const date = new Date(dateString + "T00:00:00");

        const day = String(date.getDate()).padStart(2, "0");

        const month = this.months[date.getMonth()];

        const weekDay = this.weekdays[date.getDay()];

        return `${weekDay} • ${day} ${month}`;

    }

};