const RunLogCard = (run) => {

    if (!run) {
        return "";
    }

    const value = (field) => run[field] ?? "";

    const rpeOptions = Array.from({ length: 10 }, (_, index) => {
        const score = index + 1;
        const selected = Number(run.rpe) === score ? "selected" : "";
        return `<option value="${score}" ${selected}>${score}</option>`;
    }).join("");

    return `

<section class="mr-run-log-card">

    <div class="mr-run-log-header">

        <div class="mr-run-log-icon">📝</div>

        <div>
            <small>REGISTRO DO TREINO</small>
            <h2>Como foi a corrida?</h2>
        </div>

    </div>

    <p class="mr-run-log-intro">
        Preencha manualmente os dados que você registrou no relógio ou na corrida.
    </p>

    <form class="mr-run-log-form" onsubmit="return CorridaPage.saveRunResult(event, '${run.id}')">

        <div class="mr-run-log-grid">

            <label>
                <span>PACE MÉDIO</span>
                <input
                    name="actualPace"
                    type="text"
                    inputmode="decimal"
                    placeholder="Ex.: 5:12"
                    value="${value("actualPace")}"
                >
            </label>

            ${run.type === "interval" ? `
            <label>
                <span>PACE DOS INTERVALOS</span>
                <input
                    name="actualIntervalPace"
                    type="text"
                    inputmode="decimal"
                    placeholder="Ex.: 4:05"
                    value="${value("actualIntervalPace")}"
                >
            </label>
            ` : ""}

            <label>
                <span>DISTÂNCIA TOTAL FINAL (KM)</span>
                <input
                    name="actualDistance"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Ex.: 10,24"
                    value="${value("actualDistance")}"
                    required
                >
            </label>

            <label>
                <span>TEMPO TOTAL (MIN)</span>
                <input
                    name="actualDuration"
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder="Ex.: 52,5"
                    value="${value("actualDuration")}"
                >
            </label>

            <label>
    <span>HORÁRIO DE INÍCIO</span>
    <input
        name="startTime"
        type="time"
        value="${value("startTime")}"
    >
</label>

<label>
    <span>HORÁRIO DE TÉRMINO</span>
    <input
        name="endTime"
        type="time"
        value="${value("endTime")}"
    >
</label>

            <label>
                <span>PERCEPÇÃO DE ESFORÇO (RPE)</span>
                <select name="rpe">
                    <option value="">Selecione</option>
                    ${rpeOptions}
                </select>
            </label>

        </div>

        <label class="mr-run-log-notes">
            <span>OBSERVAÇÕES</span>
            <textarea
                name="notes"
                rows="4"
                placeholder="Como você se sentiu? Alguma observação importante sobre a corrida?"
            >${value("notes")}</textarea>
        </label>

        <button class="mr-run-log-button" type="submit">
            ${run.completed ? "✓ ATUALIZAR REGISTRO" : "✓ SALVAR TREINO"}
        </button>

        <div class="mr-run-log-status" id="mr-run-log-status" aria-live="polite"></div>

    </form>

</section>

`;

};
