const WeeklyRunningCard = (workouts) => {

    if (!Array.isArray(workouts) || workouts.length === 0) {
        return `
            <section class="mr-section mr-running-week-section">

                <div class="mr-section-heading">
                    <div>
                        <small>TREINOS DA SEMANA</small>
                        <h2>Semana atual</h2>
                    </div>
                </div>

                <div class="mr-plan-empty compact">
                    <span>🏃</span>
                    <strong>Nenhum treino de corrida cadastrado.</strong>
                </div>

            </section>
        `;
    }

    const typeClass = {
        easy: "green",
        interval: "orange",
        fartlek: "orange",
        tempo: "blue",
        long: "purple",
        recovery: "green",
        race: "orange",
        run: "green",
        running: "green"
    };

    const typeLabel = {
        easy: "EZ RUN",
        interval: "INTERVAL",
        fartlek: "Fartlek",
        tempo: "TEMPO RUN",
        long: "LONG RUN",
        recovery: "RECOVERY RUN",
        race: "RACE",
        run: "RUN",
        running: "RUN"
    };

    const formatDate = (dateString) => {

        if (!dateString) return "—";

        return new Date(`${dateString}T00:00:00`)
            .toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit"
            });

    };

    return `

        <section class="mr-section mr-running-week-section">

            <div class="mr-section-heading">

                <div>
                    <small>TREINOS DA SEMANA</small>
                    <h2>Semana atual</h2>
                </div>

                <span class="mr-label green">
                    SEG → SÁB
                </span>

            </div>

            <div class="mr-plan-week">

                ${workouts.map(workout => {

                    const className =
                        typeClass[workout.type] || "green";

                    const label =
                        typeLabel[workout.type] ||
                        workout.type ||
                        "Corrida";

                    return `

                        <article class="mr-plan-workout">

                            <div class="mr-plan-workout-top">

                                <div>

                                    <span class="mr-label ${className}">
                                        ${label}
                                    </span>

                                    <h3>
                                        ${workout.title || "Treino de corrida"}
                                    </h3>

                                </div>

                                <strong>
                                    ${formatDate(workout.date)}
                                </strong>

                            </div>


                            <div class="mr-plan-metrics">

                                <div>
                                    <small>DISTÂNCIA</small>
                                    <strong>
                                        ${workout.plannedDistance ?? "—"} km
                                    </strong>
                                </div>

                                <div>
                                    <small>PACE</small>
                                    <strong>
                                        ${
                                            workout.plannedPace
                                                ? `${workout.plannedPace}/km`
                                                : "—"
                                        }
                                    </strong>
                                </div>

                                <div>
                                    <small>TEMPO</small>
                                    <strong>
                                        ${
                                            workout.plannedDuration != null
                                                ? `${workout.plannedDuration} min`
                                                : "—"
                                        }
                                    </strong>
                                </div>

                            </div>

                        </article>

                    `;

                }).join("")}

            </div>

        </section>

    `;

};

window.WeeklyRunningCard = WeeklyRunningCard;