const WorkoutCardV3 = ({
    workout,
    day,
    pace,
    duration,
    completed,
    id
}) => {

return `

<div class="mr-v3-card mr-workout-card">

    <div class="mr-card-header">

       <div class="mr-v3-card-icon mr-running-icon">
    <img src="assets/images/dashboard/running-neon.png" alt="">
</div>

        <div class="mr-v3-card-title">

            <small>CORRIDA DE HOJE</small>

            <strong>${workout}</strong>
        </div>

    </div>

    <div class="mr-card-body">

        <div class="mr-v3-date">

            ${day}

        </div>

        <div class="mr-v3-divider"></div>

        <div class="mr-v3-metrics">

            <div>

                <span>PACE</span>

                <strong>${pace}</strong>

            </div>

            <div>

                <span>DURAÇÃO</span>

                <strong>${duration}</strong>

            </div>

        </div>

    </div>
      

    

</div>

</div>

`;

};