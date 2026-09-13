const WeeklyCardV3 = (weekly) => {

    const total = weekly.total || 6;
    const completed = weekly.completed || 0;

    let dots = "";

    for(let i=0;i<total;i++){

        dots += `
            <div class="mr-week-dot ${i < completed ? "active" : ""}">
            </div>
        `;

    }

    return `

<div class="mr-v3-card mr-weekly-card">

    <div class="mr-card-header">

      <div class="mr-v3-card-icon mr-target-icon">
    <img src="assets/images/dashboard/target-neon.png" alt="">
</div>

        <div class="mr-v3-card-title">

            <small>OBJETIVO DA SEMANA</small>

        </div>

    </div>

    <div class="mr-card-body">

        <div class="mr-week-score">

            ${completed}/${total}

        </div>

        <div class="mr-week-dots">

            ${dots}

        </div>

    </div>

    <div class="mr-card-footer">

        <div class="mr-progress">

            <div
                class="mr-progress-fill"
                style="width:${(completed/total)*100}%">
            </div>

        </div>

        <div class="mr-week-percent">

    ${Math.round((completed/total)*100)}%

</div>

<div class="mr-week-label">

    CONCLUÍDO

</div>

    </div>

</div>

`;

};