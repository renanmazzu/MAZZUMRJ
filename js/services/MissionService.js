const MissionService = {

    getMission() {

        const database = AppDatabase.load();

        return database.mission;

    },

    getRaceDate() {

        return this.getMission().raceDate;

    },

    getRaceName() {

        return this.getMission().raceName;

    },

    getTargetTime() {

        return this.getMission().targetTime;

    },

    getRemainingDays() {

        const today = new Date();

        const race = new Date(this.getRaceDate());

        const difference = race.getTime() - today.getTime();

        return Math.max(
            0,
            Math.ceil(
                difference / (1000 * 60 * 60 * 24)
            )
        );

    },

    getMissionProgress() {

        const database = AppDatabase.load();

        const createdAt = new Date(database.metadata.createdAt);

        const raceDate = new Date(this.getRaceDate());

        const today = new Date();

        const total =
            raceDate.getTime() - createdAt.getTime();

        const elapsed =
            today.getTime() - createdAt.getTime();

        const progress =
            (elapsed / total) * 100;

        return Math.max(
            0,
            Math.min(
                100,
                Math.round(progress)
            )
        );

    },

getWeeklyGoal() {

    const workouts = WorkoutService.getAll();

    const today = new Date();

    // =====================================================
    // SEMANA: SEGUNDA → DOMINGO
    // =====================================================

    const currentDay = today.getDay();

    // JavaScript:
    // Domingo = 0
    // Segunda = 1
    // ...
    // Sábado = 6

    const daysSinceMonday =
        currentDay === 0
            ? 6
            : currentDay - 1;

    const monday = new Date(today);
    monday.setHours(0, 0, 0, 0);
    monday.setDate(
        today.getDate() - daysSinceMonday
    );

    const sunday = new Date(monday);
    sunday.setDate(
        monday.getDate() + 6
    );
    sunday.setHours(23, 59, 59, 999);

    // =====================================================
    // TREINOS DE CORRIDA DA SEMANA ATUAL
    // =====================================================

    const weeklyWorkouts = workouts.filter(workout => {

        if (!workout.date) {
            return false;
        }

        const workoutDate =
            new Date(`${workout.date}T00:00:00`);

        return (
            workoutDate >= monday &&
            workoutDate <= sunday
        );

    });

    // =====================================================
    // OBJETIVO SEMANAL
    // =====================================================

    const total = 6;

    const completed =
        weeklyWorkouts.filter(
            workout => workout.completed
        ).length;

    const nextWorkout =
        weeklyWorkouts.find(
            workout => !workout.completed
        ) || null;

    return {

        completed: Math.min(completed, total),

        total,

        nextWorkout

    };

}

};