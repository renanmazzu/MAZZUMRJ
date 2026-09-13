const EvolucaoPage = {

    parsePace(value) {
        if (!value) return null;
        const match = String(value).match(/(\d+)\s*:\s*(\d+)/);
        if (!match) return null;
        return Number(match[1]) * 60 + Number(match[2]);
    },

    formatPace(seconds) {
        if (!Number.isFinite(seconds)) return "—";
        const min = Math.floor(seconds / 60);
        const sec = Math.round(seconds % 60).toString().padStart(2, "0");
        return `${min}:${sec}/km`;
    },

    getMissionWeek(dateString) {
        if (!dateString || typeof MissionProgressService === "undefined") return null;
        const start = new Date(`${MissionProgressService.START_DATE}T00:00:00`);
        const date = new Date(`${dateString}T00:00:00`);
        const diff = Math.floor((date - start) / 86400000);
        if (diff < 0) return 0;
        return Math.floor(diff / 7) + 1;
    },

    getCompletedWorkouts() {
        return WorkoutService.getAll().filter(workout => workout.completed)
            .sort((a, b) => new Date(a.date) - new Date(b.date));
    },

    getWeeklyVolume(workouts) {
        const map = new Map();
        workouts.forEach(workout => {
            const week = this.getMissionWeek(workout.date);
            const distance = Number(workout.actualDistance);
            if (!week || week < 1 || !Number.isFinite(distance)) return;
            map.set(week, (map.get(week) || 0) + distance);
        });
        return Array.from(map.entries()).sort((a, b) => a[0] - b[0]).slice(-8);
    },

    getAveragePace(workouts) {
        const paces = workouts.map(workout => this.parsePace(workout.actualPace)).filter(Number.isFinite);
        if (!paces.length) return null;
        return paces.reduce((sum, value) => sum + value, 0) / paces.length;
    },

    render() {
        const mission = MissionProgressService.getMission();
        const allWorkouts = WorkoutService.getAll();
        const completed = this.getCompletedWorkouts();
        const weeklyVolume = this.getWeeklyVolume(completed);
        const scheduled = allWorkouts.filter(workout => this.getMissionWeek(workout.date) > 0);
        const adherence = scheduled.length ? Math.round((completed.length / scheduled.length) * 100) : 0;
        const totalDistance = completed.reduce((sum, workout) => sum + (Number(workout.actualDistance) || 0), 0);
        const averagePace = this.getAveragePace(completed);
        const longRuns = completed.filter(workout => workout.type === "long")
            .sort((a, b) => (Number(b.actualDistance) || 0) - (Number(a.actualDistance) || 0));
        const longestRun = completed.reduce((best, workout) => {
            const distance = Number(workout.actualDistance) || 0;
            return distance > (Number(best?.actualDistance) || 0) ? workout : best;
        }, null);
        const fastestRun = completed.reduce((best, workout) => {
            const pace = this.parsePace(workout.actualPace);
            const bestPace = this.parsePace(best?.actualPace);
            if (!Number.isFinite(pace)) return best;
            if (!Number.isFinite(bestPace) || pace < bestPace) return workout;
            return best;
        }, null);
        const database = AppDatabase.load();
        const weightHistory = Array.isArray(database.weightHistory) ? database.weightHistory : [];
        const latestWeight = weightHistory.length ? weightHistory[weightHistory.length - 1] : null;
        const maxVolume = weeklyVolume.reduce((max, item) => Math.max(max, item[1]), 0);

        return `
            <section class="mr-page mr-evolution-page">
                <div class="mr-page-title">
                    <span class="mr-label blue">📈 EVOLUÇÃO</span>
                    <h1>Seu treinamento em números</h1>
                    <p>Um retrato do que já foi realizado na Missão Rio.</p>
                </div>

                <section class="mr-evo-hero">
                    <div><small>STATUS DA PREPARAÇÃO</small><h2>Semana ${mission.currentWeek} de ${mission.totalWeeks}</h2></div>
                    <strong>${adherence}%<span> aderência</span></strong>
                    <div class="mr-evo-progress"><div style="width:${Math.min(100, adherence)}%"></div></div>
                </section>

                <section class="mr-evo-grid">
                    <article class="mr-evo-stat"><small>TREINOS CONCLUÍDOS</small><strong>${completed.length}</strong><span>registros reais</span></article>
                    <article class="mr-evo-stat"><small>DISTÂNCIA ACUMULADA</small><strong>${totalDistance.toFixed(1)} km</strong><span>corridas registradas</span></article>
                    <article class="mr-evo-stat"><small>PACE MÉDIO</small><strong>${this.formatPace(averagePace)}</strong><span>treinos com pace registrado</span></article>
                    <article class="mr-evo-stat"><small>SEMANAS RESTANTES</small><strong>${mission.remainingWeeks}</strong><span>até a maratona</span></article>
                </section>

                <section class="mr-section">
                    <div class="mr-section-heading"><div><small>VOLUME DE CORRIDA</small><h2>Km por semana</h2></div></div>
                    <div class="mr-evo-card">
                        ${weeklyVolume.length
                            ? weeklyVolume.map(([week, distance]) => `
                                <div class="mr-evo-bar-row">
                                    <div class="mr-evo-bar-label"><span>Semana ${week}</span><strong>${distance.toFixed(1)} km</strong></div>
                                    <div class="mr-evo-bar"><div style="width:${maxVolume ? (distance / maxVolume) * 100 : 0}%"></div></div>
                                </div>`).join("")
                            : `<div class="mr-evo-empty"><span>📊</span><strong>Ainda não há volume real registrado.</strong><p>Depois que você salvar as corridas realizadas, a evolução semanal aparecerá aqui.</p></div>`}
                    </div>
                </section>

                <section class="mr-section">
                    <div class="mr-section-heading"><div><small>PACE</small><h2>Evolução dos treinos</h2></div></div>
                    <div class="mr-evo-card">
                        ${completed.length
                            ? completed.slice(-8).reverse().map(workout => `
                                <div class="mr-evo-row">
                                    <div><strong>${workout.title || "Treino"}</strong><span>${new Date(`${workout.date}T00:00:00`).toLocaleDateString("pt-BR")}</span></div>
                                    <strong>${workout.actualPace ? `${workout.actualPace}/km` : "Sem pace"}</strong>
                                </div>`).join("")
                            : `<div class="mr-evo-empty"><span>🏃</span><strong>O histórico de pace aparecerá aqui.</strong><p>O aplicativo usa o pace que você informar no Registro do Treino.</p></div>`}
                    </div>
                </section>

                <section class="mr-section">
                    <div class="mr-section-heading"><div><small>LONGÕES</small><h2>Construção de resistência</h2></div></div>
                    <div class="mr-evo-card">
                        ${longRuns.length
                            ? longRuns.slice(0, 6).map(workout => `
                                <div class="mr-evo-row">
                                    <div><strong>${workout.actualDistance ?? "—"} km</strong><span>${new Date(`${workout.date}T00:00:00`).toLocaleDateString("pt-BR")}</span></div>
                                    <strong>${workout.actualPace ? `${workout.actualPace}/km` : "—"}</strong>
                                </div>`).join("")
                            : `<div class="mr-evo-empty compact"><span>🏃‍♂️</span><strong>Nenhum longão realizado foi registrado ainda.</strong></div>`}
                    </div>
                </section>

                <section class="mr-section">
                    <div class="mr-section-heading"><div><small>PESO</small><h2>Histórico corporal</h2></div></div>
                    <div class="mr-evo-card mr-evo-weight">
                        ${latestWeight
                            ? `<strong>${latestWeight.weight ?? latestWeight.value ?? "—"} kg</strong><span>último registro</span>`
                            : `<strong>—</strong><span>Nenhum peso registrado ainda.</span>`}
                    </div>
                </section>

                <section class="mr-section">
                    <div class="mr-section-heading"><div><small>PERFORMANCE</small><h2>Recordes registrados</h2></div></div>
                    <div class="mr-evo-records">
                        <article><small>MAIOR DISTÂNCIA</small><strong>${longestRun ? `${Number(longestRun.actualDistance).toFixed(1)} km` : "—"}</strong></article>
                        <article><small>MELHOR PACE</small><strong>${fastestRun ? `${fastestRun.actualPace}/km` : "—"}</strong></article>
                        <article><small>DISTÂNCIA TOTAL</small><strong>${totalDistance.toFixed(1)} km</strong></article>
                    </div>
                </section>
                ${ExportDataCard()}
            </section>
        `;
    }
};
