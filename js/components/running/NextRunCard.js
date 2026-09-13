const NextRunCard = (run) => {

    if (!run) {

        return "";

    }

    return `

<section class="mr-next-run-card">

    <div class="mr-next-run-header">

        <span>📅</span>

        <div>

            <small>PRÓXIMA CORRIDA</small>

            <h2>${run.title}</h2>

        </div>

    </div>

    <div class="mr-next-run-grid">

        <div>

            <span>DATA</span>

            ${DateHelper.format(run.date)}

        </div>

        <div>

            <span>PACE</span>

            <strong>${run.plannedPace}</strong>

        </div>

        <div>

            <span>DISTÂNCIA</span>

            <strong>${run.plannedDistance} km</strong>

        </div>

    </div>

</section>

`;

};