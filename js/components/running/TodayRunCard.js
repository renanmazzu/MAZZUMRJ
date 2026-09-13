const TodayRunCard = (run) => {

    if (!run) {

        return `

<section class="mr-run-card">

    <div class="mr-run-badge">

        🏃 CORRIDA DE HOJE

    </div>

    <h2>Descanso</h2>

    <p class="mr-run-empty">

        Hoje não existe treino programado.

    </p>

</section>

`;

    }

    const isInterval = run.type === "interval" || run.intervals;

    let intervalsHtml = "";

    if (isInterval && run.intervals) {

        if (Array.isArray(run.intervals)) {

            intervalsHtml = run.intervals.map((interval, index) => {

                if (typeof interval === "string") {

                    return `<div class="mr-run-interval-item"><strong>${index + 1}.</strong><span>${interval}</span></div>`;

                }

                const reps = interval.reps || interval.repetitions || "";
                const distance = interval.distance || interval.workDistance || "";
                const pace = interval.pace || interval.targetPace || "";
                const recovery = interval.recovery || "";

                return `

<div class="mr-run-interval-item">

    <strong>${reps ? `${reps}x` : `${index + 1}.`}</strong>

    <span>
        ${distance ? `${distance}` : "Intervalo"}
        ${pace ? ` · ${pace}/km` : ""}
        ${recovery ? ` · rec. ${recovery}` : ""}
    </span>

</div>

`;

            }).join("");

        } else if (typeof run.intervals === "string") {

            intervalsHtml = `<div class="mr-run-interval-text">${run.intervals}</div>`;

        }

    }

    return `

<section class="mr-run-card">

    <div class="mr-run-badge">

        🏃 CORRIDA DE HOJE

    </div>

    <div class="mr-run-type">
        ${run.type === "interval" ? "INTERVALADO" : (run.type || "TREINO").toUpperCase()}
    </div>

    <h1>${run.title}</h1>

    <div class="mr-run-date">
        ${DateHelper.format(run.date)}
    </div>

    ${intervalsHtml ? `

    <div class="mr-run-intervals">

        <div class="mr-run-section-label">INTERVALOS</div>

        ${intervalsHtml}

    </div>

    ` : ""}

    <div class="mr-run-stats">

        <div>
            <span>DISTÂNCIA</span>
            <strong>${run.plannedDistance} km</strong>
        </div>

        <div>
            <span>PACE</span>
            <strong>${run.plannedPace}/km</strong>
        </div>

        <div>
            <span>TEMPO</span>
            <strong>${run.plannedDuration} min</strong>
        </div>

    </div>

</section>

`;

};
