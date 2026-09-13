const WeeklyRunningPlanner = {

    selectedWeek: 1,

    getWeekStart(week) {

        const start = new Date(
            `${MissionProgressService.START_DATE}T00:00:00`
        );

        start.setDate(
            start.getDate() + ((week - 1) * 7)
        );

        return start;

    },

    formatDate(date) {

        return date.toISOString().split("T")[0];

    },

    formatDisplayDate(dateString) {

        return new Date(`${dateString}T00:00:00`)
            .toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit"
            });

    },

    getWeekDates(week) {

        const start = this.getWeekStart(week);

        const days = [];

        for (let i = 0; i < 6; i++) {

            const date = new Date(start);

            date.setDate(
                start.getDate() + i
            );

            days.push(date);

        }

        return days;

    },

    getWeekWorkouts(week) {

        return this.getWeekDates(week).map(date => {

            const dateString =
                this.formatDate(date);

            return {

                date: dateString,

                workout:
                    WorkoutService
                        .getRunningWorkoutsByDate(
                            dateString
                        )[0] || null

            };

        });

    },

    getDayName(index) {

        return [
            "SEG",
            "TER",
            "QUA",
            "QUI",
            "SEX",
            "SÁB"
        ][index];

    },

    getTypeLabel(type) {

        const labels = {

            easy: "Rodagem leve",
            interval: "Intervalado",
            tempo: "Tempo Run",
            long: "Longão",
            recovery: "Recuperação",
            race: "Prova",
            run: "Corrida",
            running: "Corrida"

        };

        return labels[type] || "Corrida";

    },

    renderWorkoutCard(item, index) {

        const workout = item.workout;

        if (!workout) {

            return `

                <article class="mr-planner-day-card empty">

                    <div class="mr-planner-day">

                        <strong>
                            ${this.getDayName(index)}
                        </strong>

                        <small>
                            ${this.formatDisplayDate(item.date)}
                        </small>

                    </div>

                    <div class="mr-planner-day-content">

                        <strong>
                            Nenhum treino cadastrado
                        </strong>

                        <span>
                            Clique em cadastrar para adicionar a corrida.
                        </span>

                    </div>

                    <button
                        class="mr-planner-edit-button"
                        type="button"
                        data-planner-edit="${item.date}"
                    >
                        + CADASTRAR
                    </button>

                </article>

            `;

        }

        return `

            <article class="mr-planner-day-card">

                <div class="mr-planner-day">

                    <strong>
                        ${this.getDayName(index)}
                    </strong>

                    <small>
                        ${this.formatDisplayDate(item.date)}
                    </small>

                </div>

                <div class="mr-planner-day-content">

                    <span class="mr-label green">
                        ${this.getTypeLabel(workout.type)}
                    </span>

                    <strong>
                        ${workout.title || "Treino de corrida"}
                    </strong>

                    <span>

                        ${workout.plannedDistance ?? "—"} km

                        •

                        ${
                            workout.plannedDuration != null
                                ? `${workout.plannedDuration} min`
                                : "—"
                        }

                        •

                        ${
                            workout.plannedPace
                                ? `${workout.plannedPace}/km`
                                : "—"
                        }

                    </span>

                </div>

                <button
                    class="mr-planner-edit-button"
                    type="button"
                    data-planner-edit="${item.date}"
                >
                    EDITAR
                </button>

            </article>

        `;

    },

    openEditor(dateString) {

        const workout =
            WorkoutService
                .getRunningWorkoutsByDate(
                    dateString
                )[0] || null;

        const dayIndex =
            this.getWeekDates(
                this.selectedWeek
            ).findIndex(
                date =>
                    this.formatDate(date) === dateString
            );

        const container =
            document.getElementById(
                "mr-planner-editor"
            );

        if (!container) {
            return;
        }

        container.innerHTML = `

            <div class="mr-planner-editor-box">

                <div class="mr-planner-editor-header">

                    <div>

                        <small>
                            ${this.getDayName(dayIndex)}
                            •
                            ${this.formatDisplayDate(dateString)}
                        </small>

                        <h3>
                            ${workout
                                ? "Editar treino"
                                : "Cadastrar treino"}
                        </h3>

                    </div>

                    <button
                        type="button"
                        class="mr-planner-close"
                        data-planner-close
                    >
                        ×
                    </button>

                </div>

                <form
                    class="mr-planner-form"
                    id="mr-planner-form"
                    data-planner-date="${dateString}"
                >

                    <label>

                        <span>TIPO</span>

                        <select name="type">

                            <option value="easy"
                                ${workout?.type === "easy" ? "selected" : ""}>
                                Rodagem leve
                            </option>

                            <option value="interval"
                                ${workout?.type === "interval" ? "selected" : ""}>
                                Intervalado
                            </option>

                            <option value="fartlek"
    ${workout?.type === "fartlek" ? "selected" : ""}>
    Fartlek
</option>

                            <option value="tempo"
                                ${workout?.type === "tempo" ? "selected" : ""}>
                                Tempo Run
                            </option>

                            <option value="long"
                                ${workout?.type === "long" ? "selected" : ""}>
                                Longão
                            </option>

                            <option value="recovery"
                                ${workout?.type === "recovery" ? "selected" : ""}>
                                Recuperação
                            </option>

                            <option value="race"
                                ${workout?.type === "race" ? "selected" : ""}>
                                Prova
                            </option>

                        </select>

                    </label>


                    <label>

                        <span>NOME DO TREINO</span>

                        <input
                            name="title"
                            type="text"
                            placeholder="Ex.: Rodagem Leve"
                            value="${workout?.title || ""}"
                            required
                        >

                    </label>


                    <div class="mr-planner-form-grid">

                        <label>

                            <span>DISTÂNCIA (KM)</span>

                            <input
                                name="plannedDistance"
                                type="number"
                                min="0"
                                step="0.1"
                                placeholder="8"
                                value="${workout?.plannedDistance ?? ""}"
                            >

                        </label>


                        <label>

                            <span>DURAÇÃO (MIN)</span>

                            <input
                                name="plannedDuration"
                                type="number"
                                min="0"
                                step="0.1"
                                placeholder="45"
                                value="${workout?.plannedDuration ?? ""}"
                            >

                        </label>


                    </div>


                    <label>

                        <span>PACE</span>

                        <input
                            name="plannedPace"
                            type="text"
                            placeholder="5:35"
                            value="${workout?.plannedPace || ""}"
                        >

                    </label>


                    <label>

                        <span>INTERVALOS (OPCIONAL)</span>

                        <textarea
                            name="intervals"
                            rows="4"
                            placeholder="Ex.: 6x800m @4:10/km, rec 2' trote"
                        >${
                            Array.isArray(workout?.intervals)
                                ? workout.intervals.join("\n")
                                : ""
                        }</textarea>

                    </label>


                    <button
                        type="submit"
                        class="mr-planner-save"
                    >
                        ✓ SALVAR TREINO
                    </button>

                </form>

            </div>

        `;

        container.classList.add("visible");

    },

    closeEditor() {

        const container =
            document.getElementById(
                "mr-planner-editor"
            );

        if (!container) {
            return;
        }

        container.classList.remove("visible");

        container.innerHTML = "";

    },

    saveEditor(form) {

        const data =
            new FormData(form);

        const intervalsText =
            String(
                data.get("intervals") || ""
            ).trim();

        const intervals =
            intervalsText
                ? intervalsText
                    .split("\n")
                    .map(item => item.trim())
                    .filter(Boolean)
                : [];

        WorkoutService
            .savePlannedRunningWorkout({

                date:
                    form.dataset.plannerDate,

                type:
                    String(
                        data.get("type") || "easy"
                    ),

                title:
                    String(
                        data.get("title") || ""
                    ).trim(),

                plannedDistance:
                    String(
                        data.get("plannedDistance") || ""
                    ),

                plannedDuration:
                    String(
                        data.get("plannedDuration") || ""
                    ),

                plannedPace:
                    String(
                        data.get("plannedPace") || ""
                    ).trim(),

                intervals

            });

        this.closeEditor();

        PlanejamentoPage.renderIntoDOM();

    },

    render() {

        const weekWorkouts =
            this.getWeekWorkouts(
                this.selectedWeek
            );

        const start =
            this.getWeekStart(
                this.selectedWeek
            );

        const end =
            new Date(start);

        end.setDate(
            start.getDate() + 6
        );

        return `

            <section class="mr-section mr-planner-section">

                <div class="mr-section-heading">

                    <div>

                        <small>
                            EDITAR TREINOS
                        </small>

                        <h2>
                            Planejamento semanal
                        </h2>

                    </div>

                    <select
                        class="mr-planner-week-select"
                        id="mr-planner-week-select"
                    >

                        ${Array.from(
                            { length: 36 },
                            (_, index) => {

                                const week =
                                    index + 1;

                                return `
                                    <option
                                        value="${week}"
                                        ${
                                            week === this.selectedWeek
                                                ? "selected"
                                                : ""
                                        }
                                    >
                                        Semana ${week}
                                    </option>
                                `;

                            }
                        ).join("")}

                    </select>

                </div>


                <div class="mr-planner-period">

                    ${start.toLocaleDateString(
                        "pt-BR",
                        {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric"
                        }
                    )}

                    →

                    ${end.toLocaleDateString(
                        "pt-BR",
                        {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric"
                        }
                    )}

                </div>


                <div class="mr-planner-list">

                    ${weekWorkouts
                        .map(
                            (item, index) =>
                                this.renderWorkoutCard(
                                    item,
                                    index
                                )
                        )
                        .join("")}

                </div>


                <div
                    id="mr-planner-editor"
                    class="mr-planner-editor"
                ></div>

            </section>

        `;

    },

    afterRender() {

        const weekSelect =
            document.getElementById(
                "mr-planner-week-select"
            );

        if (weekSelect) {

            weekSelect.addEventListener(
                "change",
                event => {

                    this.selectedWeek =
                        Number(event.target.value);

                    PlanejamentoPage
                        .renderIntoDOM();

                }
            );

        }

        document
            .querySelectorAll(
                "[data-planner-edit]"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        this.openEditor(
                            button.dataset.plannerEdit
                        );

                    }
                );

            });

        document.addEventListener(
            "click",
            event => {

                if (
                    event.target.matches(
                        "[data-planner-close]"
                    )
                ) {

                    this.closeEditor();

                }

            }
        );

        const editor =
            document.getElementById(
                "mr-planner-editor"
            );

        if (editor) {

            editor.addEventListener(
                "submit",
                event => {

                    if (
                        event.target.id !==
                        "mr-planner-form"
                    ) {
                        return;
                    }

                    event.preventDefault();

                    this.saveEditor(
                        event.target
                    );

                }
            );

        }

    }

};

window.WeeklyRunningPlanner =
    WeeklyRunningPlanner;