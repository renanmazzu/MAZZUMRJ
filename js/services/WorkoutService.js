const WorkoutService = {

    getAll() {

        const database = AppDatabase.load();

        return database.workouts;

    },

    saveAll(workouts) {

        const database = AppDatabase.load();

        database.workouts = workouts;

        AppDatabase.save(database);

    },

    getTodayWorkout() {

    const today = new Date().toISOString().split("T")[0];

    const workouts = this.getAll();

    // treino exatamente hoje
    let workout = workouts.find(item => item.date === today);

    if (workout) {

        return workout;

    }

    // próximo treino futuro
    workout = workouts.find(item => item.date > today);

    if (workout) {

        return workout;

    }

    // último treino não concluído
    workout = workouts.find(item => !item.completed);

    if (workout) {

        return workout;

    }

    // último treino da lista
    return workouts[workouts.length - 1];

},

    getWorkoutByDate(date) {

        return this.getAll().find(workout => workout.date === date) || null;

    },

    addWorkout(workout) {

        const workouts = this.getAll();

        workouts.push(workout);

        this.saveAll(workouts);

    },

    saveRunResult(id, result) {

        const database = AppDatabase.load();

        const workout = database.workouts.find(item => item.id === id);

        if (!workout) {
            return false;
        }

       workout.actualPace = result.actualPace || null;

workout.actualIntervalPace =
    result.actualIntervalPace || null;

workout.actualDistance =
    result.actualDistance ?? null;

workout.actualDuration =
    result.actualDuration ?? null;

workout.startTime =
    result.startTime || null;

workout.endTime =
    result.endTime || null;

workout.rpe =
    result.rpe ?? null;

workout.notes =
    result.notes || "";

workout.completed = true;

workout.completedAt = Date.now();

        AppDatabase.save(database);

        return true;

    },

    completeWorkout(id) {

        const workouts = this.getAll();

        const workout = workouts.find(item => item.id === id);

        if (!workout) return;

        workout.completed = true;

        workout.completedAt = Date.now();

        this.saveAll(workouts);

    },

    getCurrentWeek() {

        const workouts = this.getAll();

        return workouts.filter(workout => !workout.completed);

    },

    getWeeklyProgress() {

        const workouts = this.getCurrentWeek();

        const completed = workouts.filter(w => w.completed).length;

        return {

            completed,

            total: workouts.length

        };

    },
    
startWorkout(id) {

    const workouts = this.getAll();

    const workout = workouts.find(item => item.id === id);

    if (!workout) {

        return;

    }

    if (!workout.startedAt) {

        workout.startedAt = Date.now();

    }
    const database = AppDatabase.load();
    if (!database.app) {

    database.app = {

        activeWorkoutId: null

    };

}
console.log("ID recebido:", id);
database.app.activeWorkoutId = id;

AppDatabase.save(database);

    database.workouts = workouts;

AppDatabase.save(database);

},
getActiveWorkout() {

    const database = AppDatabase.load();

    console.log("Banco:", database);

    console.log("ID ativo:", database.app.activeWorkoutId);

    console.log("Treinos:", database.workouts);

    const workout = database.workouts.find(

        item => item.id === database.app.activeWorkoutId

    );

    console.log("Treino encontrado:", workout);

    return workout || null;

},
finishActiveWorkout() {

    const database = AppDatabase.load();

    const workout = database.workouts.find(

        item => item.id === database.app.activeWorkoutId

    );

    if (!workout) {

        return;

    }

    workout.completed = true;

    workout.finishedAt = Date.now();

    database.app.activeWorkoutId = null;

    AppDatabase.save(database);

},

getLastCompletedWorkout() {

    const workouts = this.getAll();

    const completed = workouts.filter(w => w.completed);

    if (completed.length === 0) {

        return null;

    }

    completed.sort((a, b) =>

        new Date(b.date) - new Date(a.date)

    );

    return completed[0];

},

    toggleSet(element){

        element.classList.toggle("done");

    },

        getRunningTypes() {

        return new Set([
            "easy",
            "interval",
            "tempo",
            "long",
            "recovery",
            "race",
            "run",
            "running"
        ]);

    },

    getRunningWorkoutsByDate(dateString) {

        const types = this.getRunningTypes();

        return this.getAll()
            .filter(workout => {

                if (!workout || workout.date !== dateString) {
                    return false;
                }

                return types.has(
                    String(workout.type || "").toLowerCase()
                );

            });

    },

    savePlannedRunningWorkout(data) {

        const database = AppDatabase.load();

        if (!database.workouts) {
            database.workouts = [];
        }

        const existingIndex =
            database.workouts.findIndex(
                workout => workout.date === data.date
            );

        const workout = {

            id:
                existingIndex >= 0
                    ? database.workouts[existingIndex].id
                    : `run-${Date.now()}-${Math.random()
                        .toString(36)
                        .substring(2, 8)}`,

            date: data.date,

            type: data.type || "easy",

            title: data.title || "Treino de corrida",

            plannedDistance:
                data.plannedDistance === ""
                    ? null
                    : Number(data.plannedDistance),

            plannedDuration:
                data.plannedDuration === ""
                    ? null
                    : Number(data.plannedDuration),

            plannedPace:
                data.plannedPace || null,

            intervals:
                Array.isArray(data.intervals)
                    ? data.intervals
                    : [],

            completed:
                existingIndex >= 0
                    ? Boolean(database.workouts[existingIndex].completed)
                    : false,

            startedAt:
                existingIndex >= 0
                    ? database.workouts[existingIndex].startedAt || null
                    : null,

            finishedAt:
                existingIndex >= 0
                    ? database.workouts[existingIndex].finishedAt || null
                    : null,

            actualDistance:
                existingIndex >= 0
                    ? database.workouts[existingIndex].actualDistance ?? null
                    : null,

            actualDuration:
                existingIndex >= 0
                    ? database.workouts[existingIndex].actualDuration ?? null
                    : null,

            actualPace:
                existingIndex >= 0
                    ? database.workouts[existingIndex].actualPace || null
                    : null,

            startTime:
                existingIndex >= 0
                    ? database.workouts[existingIndex].startTime || null
                    : null,

            endTime:
                existingIndex >= 0
                    ? database.workouts[existingIndex].endTime || null
                    : null,

            notes:
                existingIndex >= 0
                    ? database.workouts[existingIndex].notes || ""
                    : "",

            rpe:
                existingIndex >= 0
                    ? database.workouts[existingIndex].rpe ?? null
                    : null

        };

        if (existingIndex >= 0) {

            database.workouts[existingIndex] = workout;

        } else {

            database.workouts.push(workout);

        }

        database.workouts.sort(
            (a, b) =>
                new Date(a.date) - new Date(b.date)
        );

        AppDatabase.save(database);

        return workout;

    },
};