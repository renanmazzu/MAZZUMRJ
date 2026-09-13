const TodayMissionPanel = ({
    workout,
    day,
    pace,
    duration,
    completed,
    id
}) => {

return `

<section class="mz-panel mz-today-panel">

    <div class="mz-panel-header">

        <div class="mz-panel-icon">

            🏃

        </div>

        <div class="mz-panel-heading">

            <small>TREINO DE HOJE</small>

            <h3>${workout}</h3>

        </div>

    </div>

    <div class="mz-panel-body">

        <div class="mz-day">

            ${day}

        </div>

        <div class="mz-divider"></div>

        <div class="mz-metrics">

            <div class="mz-metric">

                <div class="mz-metric-label">

                    Pace

                </div>

                <div class="mz-metric-value">

                    ${pace}

                </div>

            </div>

            <div class="mz-metric">

                <div class="mz-metric-label">

                    Duração

                </div>

                <div class="mz-metric-value">

                    ${duration}

                </div>

            </div>

        </div>

    </div>

    <div class="mz-panel-footer">

        ${
            completed
            ?

            `<button class="mz-button" disabled>

                ✓ TREINO CONCLUÍDO

            </button>`

            :

            `<button
                class="mz-button"
                onclick="App.startWorkout('${id}')">

                ▶ INICIAR TREINO

            </button>`

        }

    </div>

</section>

`;

};