const CorridaPage = {

        getCurrentWeekRunningWorkouts() {

        const today = new Date();

        const day = today.getDay();

        const mondayOffset =
            day === 0 ? -6 : 1 - day;

        const monday = new Date(today);

        monday.setDate(
            today.getDate() + mondayOffset
        );

        monday.setHours(0, 0, 0, 0);

        const saturday = new Date(monday);

        saturday.setDate(
            monday.getDate() + 5
        );

        saturday.setHours(23, 59, 59, 999);

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

        return WorkoutService
            .getAll()
            .filter(workout => {

                if (!workout || !workout.date) {
                    return false;
                }

                const date =
                    new Date(`${workout.date}T00:00:00`);

                const type =
                    String(workout.type || "")
                        .toLowerCase();

                return (
                    date >= monday &&
                    date <= saturday &&
                    runningTypes.has(type)
                );

            })
            .sort(
                (a, b) =>
                    new Date(a.date) -
                    new Date(b.date)
            );

    },

    render() {

        const vm = RunningViewModel.build();

        return `

<section class="page">

    <div class="mr-running-page">

        ${TodayRunCard(vm.todayRun)}

        ${RunLogCard(vm.todayRun)}

        ${WeeklyRunningCard(
    this.getCurrentWeekRunningWorkouts()
)}

    </div>

</section>

`;

    },

    saveRunResult(event, id) {

        event.preventDefault();

        const form = event.target;
        const data = new FormData(form);

       WorkoutService.saveRunResult(id, {

    actualPace:
        String(data.get("actualPace") || "").trim(),

    actualIntervalPace:
        String(data.get("actualIntervalPace") || "").trim(),

    actualDistance:
        data.get("actualDistance") === ""
            ? null
            : Number(data.get("actualDistance")),

    actualDuration:
        data.get("actualDuration") === ""
            ? null
            : Number(data.get("actualDuration")),

    rpe:
        data.get("rpe") === ""
            ? null
            : Number(data.get("rpe")),

    startTime:
        String(data.get("startTime") || "").trim(),

    endTime:
        String(data.get("endTime") || "").trim(),

    notes:
        String(data.get("notes") || "").trim()

});

        const status = document.getElementById("mr-run-log-status");

        if (status) {
            status.textContent = "Treino salvo com sucesso.";
            status.classList.add("visible");
        }

        return false;

    }

};
