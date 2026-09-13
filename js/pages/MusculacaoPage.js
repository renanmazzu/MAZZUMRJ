const MusculacaoPage = {

    render(params = {}) {

        const workout = params.day !== undefined
            ? StrengthService.getWorkoutByDay(params.day)
            : StrengthService.getTodayWorkout();


        if (!workout) {
            return `
                <section class="page">
                    <div class="mr-strength-page">
                        <div class="mr-strength-header">
                            <small>MUSCULAÇÃO</small>
                            <h1>Descanso</h1>
                            <p>Hoje não há treino de musculação programado.</p>
                        </div>
                    </div>
                </section>`;
        }

        return `
            <section class="page">
                <div class="mr-strength-page">
                    <div class="mr-strength-header">
                        <small>TREINO DE HOJE</small>
                        <h1>${workout.title}</h1>
                        <p>${workout.subtitle}</p>
                    </div>
                    <div class="mr-strength-list">
                        ${workout.exercises.map((exercise, index) => `
                            <article class="mr-strength-exercise">
                                <div class="mr-strength-number">${String(index + 1).padStart(2, "0")}</div>
                                <div class="mr-strength-exercise-info">
                                    <strong>${exercise[0]}</strong>
                                    <span>${exercise[1]} séries · ${exercise[2]} repetições</span>
                                </div>
                            </article>
                        `).join("")}
                    </div>
                    <div class="mr-strength-note">💡 Apenas consulte o treino. Não é necessário registrar cargas ou séries no app.</div>
                </div>
            </section>`;
    }
};

window.MusculacaoPage = MusculacaoPage;
