const RunningViewModel = {

    build() {

        const workouts = WorkoutService.getAll();

        const todayRun = WorkoutService.getTodayWorkout();

        const nextRun = workouts.find(

            item => item.date > todayRun.date

        ) || null;

        return {

            todayRun,

            nextRun,

            weeklyGoal: {

                target: 52,

                completed: 38,

                remaining: 14,

                percent: 73

            }

        };

    }

};