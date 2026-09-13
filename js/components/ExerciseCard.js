const ExerciseCard = ({
    name,
    gif,
    weight,
    reps,
    sets,
    rest
}) => {

    return `

<div class="mr-exercise-card">

    <div class="mr-exercise-title">

        ${name}

    </div>

    <img
        class="mr-exercise-gif"
        src="${gif}"
        alt="${name}">

    <div class="mr-weight-row">

        <span>Carga</span>

        <div class="mr-weight-box">

            <button>-</button>

            <strong>${weight} kg</strong>

            <button>+</button>

        </div>

    </div>

    <div class="mr-sets-row">

        <span>Séries</span>

        <div class="mr-set-dots">

           ${Array.from({ length: sets }, (_, index) => `

<div
    class="mr-set-dot"
    data-set="${index}"
    onclick="WorkoutService.toggleSet(this)">

</div>

`).join("")}

        </div>

    </div>

    <div class="mr-reps-row">

        <span>Repetições</span>

        <strong>${reps}</strong>

    </div>

    <div class="mr-rest-row">

        <span>Descanso</span>

        <button>

            ${rest}s

        </button>

    </div>

</div>

`;

};