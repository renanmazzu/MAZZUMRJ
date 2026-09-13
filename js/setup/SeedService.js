function generateId() {

    if (
        typeof crypto !== "undefined" &&
        typeof crypto.randomUUID === "function"
    ) {
        return crypto.randomUUID();
    }

    return (
        "mz-" +
        Date.now().toString(36) +
        "-" +
        Math.random().toString(36).substring(2, 10)
    );
}

const SeedService = {

    initialize() {

        const database = AppDatabase.load();

if (
    database.workouts.length > 0 &&
    database.workouts[0].plannedDistance !== undefined
) {
    return;
}

        database.workouts = [

            {
    id: generateId(),

    date: "2026-08-03",

    type: "easy",

    title: "Rodagem Leve",

    plannedDistance: 8,

    plannedDuration: 45,

    plannedPace: "5:35",

    completed: false,

    startedAt: null,

    finishedAt: null,

    actualDistance: null,

    actualDuration: null,

    actualPace: null,

    notes: "",

    rpe: null
},

            {
    id: generateId(),

    date: "2026-08-04",

    type: "interval",

    title: "Intervalado",

    plannedDistance: 10,

    plannedDuration: 55,

    plannedPace: "4:10",

    completed: false,

    startedAt: null,

    finishedAt: null,

    actualDistance: null,

    actualDuration: null,

    actualPace: null,

    notes: "",

    rpe: null
},

           {
    id: generateId(),

    date: "2026-08-06",

    type: "tempo",

    title: "Tempo Run",

    plannedDistance: 12,

    plannedDuration: 60,

    plannedPace: "4:30",

    completed: false,

    startedAt: null,

    finishedAt: null,

    actualDistance: null,

    actualDuration: null,

    actualPace: null,

    notes: "",

    rpe: null
},

            {
    id: generateId(),

    date: "2026-08-08",

    type: "long",

    title: "Longão",

    plannedDistance: 24,

    plannedDuration: 150,

    plannedPace: "5:10",

    completed: false,

    startedAt: null,

    finishedAt: null,

    actualDistance: null,

    actualDuration: null,

    actualPace: null,

    notes: "",

    rpe: null
},

        ];

        AppDatabase.save(database);

    }

};