const TodayTrainingCard = ({ type, title }) => {

    return `

<div class="mr-v3-card mr-today-training-card">

    <div class="mr-card-header">

        <div class="mr-v3-card-icon mr-strength-icon">
    <img src="assets/images/dashboard/strength-neon.png" alt="">
</div>

        <div class="mr-v3-card-title">

            <small>TREINO DE HOJE</small>

            <strong>${title}</strong>

        </div>

    </div>

    <div class="mr-card-body mr-today-training-body">

        <span class="mr-today-training-type">${type}</span>

    </div>

</div>

`;

};
