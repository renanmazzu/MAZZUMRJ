const FitnessScoreCardV3 = ({
    score,
    level,
    progress,
    training,
    weeklyGoal,
    weight,
    consistency,
    message
}) => {

return `

<div class="mr-v3-card mr-fitness-card">

    <div class="mr-card-top">

        <div class="mr-card-header">

            <div class="mr-card-icon">
                🟢
            </div>

            <div class="mr-card-heading">
                <small>FITNESS</small>
                <h3>SCORE</h3>
            </div>

        </div>

        <div class="mr-fitness-score">
            ${score}
        </div>

        <div class="mr-fitness-level">
            ${level}
        </div>

        <div class="mr-fitness-bar">

            <div
                class="mr-fitness-fill"
                style="width:${progress}%">
            </div>

        </div>

        <div class="mr-fitness-message">
            ${message}
        </div>

    </div>

    <div class="mr-fitness-status">

        <div class="mr-status-item ${training ? "active" : ""}">
            ✓ Treino
        </div>

        <div class="mr-status-item ${weeklyGoal ? "active" : ""}">
            ✓ Meta
        </div>

        <div class="mr-status-item ${weight ? "active" : ""}">
            ✓ Peso
        </div>

        <div class="mr-status-item ${consistency ? "active" : ""}">
            ✓ Constância
        </div>

    </div>

</div>

`;

};