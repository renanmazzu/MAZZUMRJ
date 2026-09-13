const AppDatabase = {

    STORAGE_KEY: "mazzupro",

    getDefaultData() {

        return {
            app: {

    activeWorkoutId: null

},

            athlete: {

                name: "",

                birthDate: "",

                height: null

            },

            mission: {

                raceName: "Missão Rio 2:59",

                targetTime: "02:59:59",

                raceDate: "2027-04-12"

            },

            workouts: [],

            weightHistory: [],

            achievements: [],

            settings: {

                theme: "dark"

            },

            metadata: {

                createdAt: Date.now(),

                updatedAt: Date.now(),

                version: 1

            }

        };

    },

    load() {

        const data = localStorage.getItem(this.STORAGE_KEY);

        if (!data) {

            const defaultData = this.getDefaultData();

            this.save(defaultData);

            return defaultData;

        }

        return JSON.parse(data);

    },

    save(data) {

        data.metadata.updatedAt = Date.now();

        localStorage.setItem(
            this.STORAGE_KEY,
            JSON.stringify(data)
        );

    },

    reset() {

        const data = this.getDefaultData();

        this.save(data);

        return data;

    }

};