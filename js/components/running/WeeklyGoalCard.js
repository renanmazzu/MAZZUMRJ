const WeeklyGoalCard = (goal) => {

    return `

<section class="mr-run-week-card">

    <div class="mr-run-week-header">

        <div class="mr-run-week-icon">

            🎯

        </div>

        <div>

            <small>META DA SEMANA</small>

            <h2>${goal.target} km</h2>

        </div>

    </div>

    <div class="mr-run-week-progress">

        <div
            class="mr-run-week-progress-fill"
            style="width:${goal.percent}%">
        </div>

    </div>

    <div class="mr-run-week-footer">

        <span>

            ${goal.completed} km concluídos

        </span>

        <strong>

            ${goal.percent}%

        </strong>

    </div>

    <div class="mr-run-week-left">

        Faltam <strong>${goal.remaining} km</strong>

    </div>

</section>

`;

};