const DashboardViewModel = {

    build() {

        const weeklyGoal = MissionService.getWeeklyGoal();

        const todayWorkout = WorkoutService.getTodayWorkout();

        const lastWorkout = WorkoutService.getLastCompletedWorkout();

        const todayStrengthWorkout = StrengthService.getTodayWorkout();

        const today = new Date().toISOString().split("T")[0];

        const runningTypes = new Set([
            "easy",
            "interval",
            "tempo",
            "long",
            "recovery",
            "race",
            "run",
            "running"
        ]);

        const scheduledNonRunWorkout = WorkoutService
            .getAll()
            .find(item =>
                item.date === today &&
                item.type &&
                !runningTypes.has(String(item.type).toLowerCase())
            );

        const todayNonRunWorkout = scheduledNonRunWorkout || todayStrengthWorkout;

        return {

            hero: {

                missionName: MissionService.getRaceName(),

                targetTime: MissionService.getTargetTime(),

                progress: MissionProgressService.getMission().progress,

                currentWeek: MissionProgressService.getMission().currentWeek,

                remainingDays: MissionProgressService.getMission().remainingDays,

                message: `Semana ${
                    MissionProgressService.getMission().currentWeek
                } de ${
                    MissionProgressService.getMission().totalWeeks
                }`

            },

            workout: {

                id: todayWorkout ? todayWorkout.id : null,

                workout: todayWorkout ? todayWorkout.title : "Descanso",

                day: todayWorkout
                    ? DateHelper.format(todayWorkout.date)
                    : "",

                time: "--:--",

                pace: todayWorkout
                    ? todayWorkout.plannedPace
                    : "-",

                duration: todayWorkout
                    ? `${todayWorkout.plannedDuration} min`
                    : "-",

                completed: todayWorkout
                    ? todayWorkout.completed
                    : false

            },

            todayNonRunWorkout: {

                type: scheduledNonRunWorkout
                    ? (scheduledNonRunWorkout.modality || scheduledNonRunWorkout.category || "TREINO")
                    : (todayStrengthWorkout ? "MUSCULAÇÃO" : "DESCANSO"),

                title: todayNonRunWorkout
                    ? todayNonRunWorkout.title
                    : "Descanso"

            },

            lastWorkout: {

    title: lastWorkout
        ? lastWorkout.title
        : "-",

    date: lastWorkout
        ? "Hoje"
        : "-",

    distance: lastWorkout
        ? `${lastWorkout.actualDistance || lastWorkout.plannedDistance} km`
        : "-",

    pace: lastWorkout
        ? (lastWorkout.actualPace || lastWorkout.plannedPace)
        : "-",

    duration: lastWorkout
        ? `${lastWorkout.actualDuration || lastWorkout.plannedDuration} min`
        : "-",

    rating:4,

    status:"Muito bom"

},

            weeklyGoal

        };

    }

};