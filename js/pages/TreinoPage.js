const TreinoPage = {

    render() {

        const workout = WorkoutService.getActiveWorkout();

        if (!workout) {

            return `

            <section class="page">

                <h2>🏃 Treino</h2>

                <p>Nenhum treino iniciado.</p>

            </section>

            `;

        }
        

        return `

        <section class="page">

            <h2>🏃 ${workout.title}</h2>

            <br>

            <div class="mr-card">

                <p><strong>📅 Data</strong></p>
                <p>${DateHelper.format(workout.date)}</p>

                <br>

                <p><strong>📏 Distância prevista</strong></p>
                <p>${workout.plannedDistance} km</p>

                <br>

                <p><strong>🎯 Pace alvo</strong></p>
                <p>${workout.plannedPace}/km</p>

                <br>

                <p><strong>⏱ Tempo previsto</strong></p>
                <p>${workout.plannedDuration} min</p>

            </div>

            <br>

            <button
                class="mr-workout-button"
                onclick="App.finishWorkout()"
            >
<div class="mr-card">

    <h3>⏱ Cronômetro</h3>

    <h1 id="mr-timer">

        00:00:00

    </h1>

</div>

<br>
                ✅ FINALIZAR TREINO

            </button>

        </section>

        `;

    },

    startTimer() {
        

    const workout = WorkoutService.getActiveWorkout();

    if (!workout || !workout.startedAt) {

        return;

    }

    const timer = document.getElementById("mr-timer");

    if (!timer) {

        return;

    }

    clearInterval(this.interval);

    this.interval = setInterval(() => {

        const elapsed = Date.now() - workout.startedAt;

        const totalSeconds = Math.floor(elapsed / 1000);

        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");

        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");

        const seconds = String(totalSeconds % 60).padStart(2, "0");

        timer.textContent = `${hours}:${minutes}:${seconds}`;

    }, 1000);

},
afterRender() {

    this.startTimer();

}

};