const LastWorkoutCardV3 = ({
    title,
    date,
    distance,
    pace,
    duration,
    rating,
    status
}) => {

return `

<div class="mr-v3-card mr-last-card">

    <div class="mr-card-top">

        <div class="mr-card-header">

          <div class="mr-card-icon mr-check-icon">
    <img src="assets/images/dashboard/check-neon.png" alt="">
</div>

            <div class="mr-card-heading">

                <small>ÚLTIMO TREINO</small>

                <h3>${title}</h3>

            </div>

        </div>

        <div class="mr-card-date">

            ${date}

        </div>

        <div class="mr-card-divider"></div>

        <div class="mr-card-metrics">

            <div>

                <span>DISTÂNCIA</span>

                <strong>${distance}</strong>

            </div>

            <div>

                <span>PACE</span>

                <strong>${pace}</strong>

            </div>

            <div>

                <span>DURAÇÃO</span>

                <strong>${duration}</strong>

            </div>

            <div>

                <span>STATUS</span>

                <strong>${status}</strong>

            </div>

        </div>

    </div>

</div>

`;

};