const MissionProgressService = {

    START_DATE: "2026-09-21",

    RACE_DATE: "2027-05-30",

    TOTAL_WEEKS: 36,

    getMission() {

        const today = new Date();

        const start = new Date(this.START_DATE);

        const race = new Date(this.RACE_DATE);

        const elapsedDays = Math.max(
            0,
            Math.floor((today - start) / 86400000)
        );

        const remainingDays = Math.max(
            0,
            Math.ceil((race - today) / 86400000)
        );

        const currentWeek = Math.min(
            this.TOTAL_WEEKS,
            Math.max(1, Math.floor(elapsedDays / 7) + 1)
        );

        const completedWeeks = Math.max(0, currentWeek - 1);

        const remainingWeeks =
            this.TOTAL_WEEKS - completedWeeks;

        const progress =
            Math.round(
                (completedWeeks / this.TOTAL_WEEKS) * 100
            );

        return {

            currentWeek,

            completedWeeks,

            remainingWeeks,

            progress,

            remainingDays,

            totalWeeks: this.TOTAL_WEEKS

        };

    }

};