const PlanejamentoPage = {

    getMissionWeek(dateString) {
        if (!dateString || typeof MissionProgressService === "undefined") return null;
        const start = new Date(`${MissionProgressService.START_DATE}T00:00:00`);
        const date = new Date(`${dateString}T00:00:00`);
        const diff = Math.floor((date - start) / 86400000);
        if (diff < 0) return 0;
        return Math.floor(diff / 7) + 1;
    },

    getPhase(week) {
        if (week <= 8) return { name: "BASE", className: "green" };
        if (week <= 20) return { name: "DESENVOLVIMENTO", className: "blue" };
        if (week <= 30) return { name: "ESPECÍFICO", className: "orange" };
        if (week <= 34) return { name: "PICO", className: "purple" };
        return { name: "TAPER", className: "cyan" };
    },

    formatDate(dateString) {
        if (!dateString) return "—";
        return new Date(`${dateString}T00:00:00`).toLocaleDateString("pt-BR", {
            day: "2-digit", month: "2-digit", year: "numeric"
        });
    },

    getTypeLabel(type) {
        const labels = {
            easy: "Rodagem leve", interval: "Intervalado", tempo: "Tempo Run",
            long: "Longão", recovery: "Recuperação", rest: "Descanso"
        };
        return labels[type] || type || "Treino";
    },

    renderWorkout(workout) {
        const typeClass = {
            easy: "green", interval: "orange", tempo: "blue", long: "purple"
        }[workout.type] || "green";
        const intervals = Array.isArray(workout.intervals) ? workout.intervals : [];

        return `
            <article class="mr-plan-workout">
                <div class="mr-plan-workout-top">
                    <div>
                        <span class="mr-label ${typeClass}">${this.getTypeLabel(workout.type)}</span>
                        <h3>${workout.title || "Treino"}</h3>
                    </div>
                    <strong>${this.formatDate(workout.date)}</strong>
                </div>
                <div class="mr-plan-metrics">
                    <div><small>DISTÂNCIA</small><strong>${workout.plannedDistance ?? "—"} km</strong></div>
                    <div><small>PACE</small><strong>${workout.plannedPace ? `${workout.plannedPace}/km` : "—"}</strong></div>
                    <div><small>TEMPO</small><strong>${workout.plannedDuration ?? "—"} min</strong></div>
                </div>
                ${intervals.length ? `
                    <div class="mr-plan-intervals">
                        <small>INTERVALOS</small>
                        ${intervals.map((item, index) => `
                            <div><span>${index + 1}.</span><strong>${item}</strong></div>
                        `).join("")}
                    </div>` : ""}
            </article>
        `;
    },
    getStrengthWeek() {

    return [
        {
            day: "SEG",
            fullDay: "SEGUNDA",
            title: "UPPER STRENGTH",
            subtitle: "Força + Bike",
            bike: true
        },
        {
            day: "TER",
            fullDay: "TERÇA",
            title: "LOWER STRENGTH",
            subtitle: "Força de membros inferiores",
            bike: false
        },
        {
            day: "QUA",
            fullDay: "QUARTA",
            title: "UPPER HIPERTROFIA",
            subtitle: "Hipertrofia + Bike",
            bike: true
        },
        {
            day: "QUI",
            fullDay: "QUINTA",
            title: "LOWER-PLYO-QUALIDADE",
            subtitle: "Força + Pliometria + Bike",
            bike: true
        },
        {
            day: "SEX",
            fullDay: "SEXTA",
            title: "FULL BODY",
            subtitle: "Treino completo",
            bike: false
        },
        {
            day: "SÁB",
            fullDay: "SÁBADO",
            title: "DESCANSO",
            subtitle: "Recuperação",
            bike: false,
            rest: true
        },
        {
            day: "DOM",
            fullDay: "DOMINGO",
            title: "POSTERIOR",
            subtitle: "Treino de posterior",
            bike: false
        }
    ];

},

renderStrengthWeek() {

    const today = new Date().getDay();

    return this.getStrengthWeek().map((item, index) => {

        // Converte posição da semana:
        // SEG=1, TER=2, QUA=3, QUI=4, SEX=5, SÁB=6, DOM=0
        const jsDay = index === 6 ? 0 : index + 1;

        const isToday = jsDay === today;

        return `
            <article
    class="mr-strength-day ${isToday ? "today" : ""} ${item.rest ? "rest" : ""}"
    data-strength-day="${jsDay}"
>

                <div class="mr-strength-day-top">

                    <div class="mr-strength-day-label">
                        <span>${item.day}</span>
                    </div>

                    <div class="mr-strength-day-info">
                        <strong>${item.title}</strong>
                        <small>${item.subtitle}</small>
                    </div>

                    ${item.bike
                        ? `<span class="mr-strength-bike">BIKE</span>`
                        : ""
                    }

                </div>

                ${item.rest
                    ? `
                        <div class="mr-strength-rest">
                            <span>RECUPERAÇÃO</span>
                        </div>
                    `
                    : `
                        <div class="mr-strength-action">
                            <span>${isToday ? "TREINO DE HOJE" : "PROGRAMADO"}</span>
                        </div>
                    `
                }

            </article>
        `;

    }).join("");

},
setupStrengthWeekEvents() {

    document
        .querySelectorAll(".mr-strength-day")
        .forEach(card => {

            card.addEventListener("click", () => {

                const day = Number(
                    card.dataset.strengthDay
                );

                // Sábado = descanso
                if (day === 6) {
                    return;
                }

                Router.navigate("musculacao", {
                    day
                });

            });

        });

},

    render() {
        const mission = MissionProgressService.getMission();
        const workouts = WorkoutService.getAll().slice().sort((a, b) => new Date(a.date) - new Date(b.date));
        const currentWeekWorkouts = workouts.filter(workout => this.getMissionWeek(workout.date) === mission.currentWeek);
        const upcoming = workouts.filter(workout => new Date(`${workout.date}T23:59:59`) >= new Date()).slice(0, 5);
        const phase = this.getPhase(mission.currentWeek);
        const progress = Math.min(100, Math.max(0, mission.progress));
        const strengthWeek = this.renderStrengthWeek();

        return `
            <section class="mr-page mr-planning-page">
                <div class="mr-page-title">
                    <span class="mr-label green">📅 PLANEJAMENTO</span>
                    <h1>O mapa da Missão Rio</h1>
                    <p>Veja onde você está na preparação e o que está programado.</p>
                </div>

                <section class="mr-plan-hero">
                    <div class="mr-plan-hero-top">
                        <div>
                            <small>MISSÃO RIO 2:59</small>
                            <h2>Maratona do Rio</h2>
                        </div>
                        <strong>${mission.currentWeek}<span>/36</span></strong>
                    </div>
                    <div class="mr-plan-progress"><div style="width:${progress}%"></div></div>
                    <div class="mr-plan-hero-footer">
                        <span>Semana ${mission.currentWeek} de ${mission.totalWeeks}</span>
                        <span>${mission.remainingWeeks} semanas restantes</span>
                    </div>
                </section>

                <section class="mr-plan-grid">
                    <article class="mr-plan-stat-card"><small>INÍCIO</small><strong>21/09/2026</strong><span>Começo da preparação</span></article>
                    <article class="mr-plan-stat-card"><small>PROVA</small><strong>30/05/2027</strong><span>Maratona do Rio</span></article>
                    <article class="mr-plan-stat-card"><small>BLOCO ATUAL</small><strong>${phase.name}</strong><span>Semana ${mission.currentWeek}</span></article>
                </section>

                <section class="mr-section">
                    <div class="mr-section-heading">
                        <div><small>SEMANA ATUAL</small><h2>Semana ${mission.currentWeek}</h2></div>
                        <span class="mr-label ${phase.className}">${phase.name}</span>
                    </div>
                    <div class="mr-plan-week">
                        ${currentWeekWorkouts.length
                            ? currentWeekWorkouts.map(workout => this.renderWorkout(workout)).join("")
                            : `<div class="mr-plan-empty"><span>📋</span><strong>Nenhum treino cadastrado nesta semana.</strong><p>Quando o planejamento desta semana estiver no banco do aplicativo, ele aparecerá aqui automaticamente.</p></div>`}
                    </div>
                </section>
                <section class="mr-section">

    <div class="mr-section-heading">
        <div>
            <small>MUSCULAÇÃO</small>
            <h2>Semana de força</h2>
        </div>

        <span class="mr-label green">SEG → DOM</span>
    </div>

    <div class="mr-strength-week">
        ${strengthWeek}
    </div>

</section>
${WeeklyRunningPlanner.render()}

                <section class="mr-section">
                    <div class="mr-section-heading"><div><small>PRÓXIMOS TREINOS</small><h2>Agenda</h2></div></div>
                    <div class="mr-plan-agenda">
                        ${upcoming.length
                            ? upcoming.map(workout => `
                                <div class="mr-plan-agenda-row">
                                    <div><strong>${this.formatDate(workout.date)}</strong><span>${workout.title || "Treino"}</span></div>
                                    <div><strong>${workout.plannedDistance ?? "—"} km</strong><span>${workout.plannedPace ? `${workout.plannedPace}/km` : "—"}</span></div>
                                </div>`).join("")
                            : `<div class="mr-plan-empty compact"><span>🗓️</span><strong>Nenhum próximo treino cadastrado.</strong></div>`}
                    </div>
                </section>

                <section class="mr-section">
                    <div class="mr-section-heading"><div><small>PERIODIZAÇÃO</small><h2>Blocos da missão</h2></div></div>
                    <div class="mr-plan-blocks">
                        ${[
                            ["1–8", "BASE", "Construção da base"],
                            ["9–20", "DESENVOLVIMENTO", "Aumento progressivo da capacidade"],
                            ["21–30", "ESPECÍFICO", "Foco específico para a maratona"],
                            ["31–34", "PICO", "Maior estímulo da preparação"],
                            ["35–36", "TAPER", "Redução de carga antes da prova"]
                        ].map(block => `
                            <div class="mr-plan-block ${phase.name === block[1] ? "active" : ""}">
                                <span>SEM. ${block[0]}</span><strong>${block[1]}</strong><small>${block[2]}</small>
                            </div>`).join("")}
                    </div>
                </section>
            </section>
        `;
       },

    afterRender() {
        this.setupStrengthWeekEvents();
    }

        ,

    renderIntoDOM() {

        const container =
            document.getElementById("page");

        if (!container) {
            return;
        }

        container.innerHTML =
            this.render();

        if (
            typeof WeeklyRunningPlanner !==
            "undefined"
        ) {

            WeeklyRunningPlanner.afterRender();

        }

    }
        ,

    afterRender() {

        if (
            typeof WeeklyRunningPlanner !==
            "undefined"
        ) {

            WeeklyRunningPlanner.afterRender();

        }

    }
};
