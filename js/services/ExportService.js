const ExportService = {

    getRunningTypes() {

        return new Set([
            "easy",
            "interval",
            "fartlek",
            "tempo",
            "long",
            "recovery",
            "race",
            "run",
            "running"
        ]);

    },

    getRunningWorkouts() {

        const database =
            AppDatabase.load();

        const workouts =
            Array.isArray(database.workouts)
                ? database.workouts
                : [];

        const runningTypes =
            this.getRunningTypes();

        return workouts
            .filter(workout => {

                const type =
                    String(
                        workout.type || ""
                    ).toLowerCase();

                return runningTypes.has(type);

            })
            .sort(
                (a, b) =>
                    new Date(a.date) -
                    new Date(b.date)
            );

    },

    escapeCsv(value) {

        if (
            value === null ||
            value === undefined
        ) {
            return "";
        }

        const text =
            String(value)
                .replace(/\r?\n|\r/g, " ");

        return `"${text.replace(/"/g, '""')}"`;

    },

    downloadFile(
        content,
        filename,
        mimeType
    ) {

        const blob =
            new Blob(
                [content],
                {
                    type: mimeType
                }
            );

        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;
        link.download = filename;

        document.body.appendChild(link);

        link.click();

        link.remove();

        URL.revokeObjectURL(url);

    },

    downloadRunningCSV() {

        const workouts =
            this.getRunningWorkouts();

        const headers = [

            "ID",
            "DATA",
            "TIPO",
            "TREINO",

            "DISTANCIA_PLANEJADA_KM",
            "DISTANCIA_REAL_KM",

            "PACE_PLANEJADO",
            "PACE_REAL",

            "DURACAO_PLANEJADA_MIN",
            "DURACAO_REAL_MIN",

            "HORARIO_INICIO",
            "HORARIO_TERMINO",

            "RPE",

            "CONCLUIDO",

            "DATA_CONCLUSAO",

            "INTERVALOS",

            "OBSERVACOES"

        ];

        const rows =
            workouts.map(workout => [

                workout.id,

                workout.date,

                workout.type,

                workout.title,

                workout.plannedDistance,

                workout.actualDistance,

                workout.plannedPace,

                workout.actualPace,

                workout.plannedDuration,

                workout.actualDuration,

                workout.startTime,

                workout.endTime,

                workout.rpe,

                workout.completed
                    ? "SIM"
                    : "NAO",

                workout.completedAt
                    ? new Date(
                        workout.completedAt
                    ).toLocaleString(
                        "pt-BR"
                    )
                    : "",

                Array.isArray(
                    workout.intervals
                )
                    ? workout.intervals.join(" | ")
                    : "",

                workout.notes

            ]);

        const csv = [

            headers
                .map(
                    value =>
                        this.escapeCsv(value)
                )
                .join(";"),

            ...rows.map(
                row =>
                    row
                        .map(
                            value =>
                                this.escapeCsv(value)
                        )
                        .join(";")
            )

        ].join("\r\n");

        // BOM UTF-8 para melhor compatibilidade com Excel
        const content =
            "\uFEFF" + csv;

        const date =
            new Date()
                .toISOString()
                .split("T")[0];

        this.downloadFile(

            content,

            `mazzupro-corridas-${date}.csv`,

            "text/csv;charset=utf-8;"

        );

    },

    downloadRunningJSON() {

        const workouts =
            this.getRunningWorkouts();

        const exportData = {

            app: "MAZZUPRO",

            exportType:
                "HISTORICO_CORRIDAS",

            exportedAt:
                new Date().toISOString(),

            totalWorkouts:
                workouts.length,

            workouts

        };

        const content =
            JSON.stringify(
                exportData,
                null,
                2
            );

        const date =
            new Date()
                .toISOString()
                .split("T")[0];

        this.downloadFile(

            content,

            `mazzupro-corridas-${date}.json`,

            "application/json;charset=utf-8;"

        );

    },

    downloadFullBackup() {

        const database =
            AppDatabase.load();

        const content =
            JSON.stringify(
                database,
                null,
                2
            );

        const date =
            new Date()
                .toISOString()
                .split("T")[0];

        this.downloadFile(

            content,

            `mazzupro-backup-${date}.json`,

            "application/json;charset=utf-8;"

        );

    }

};

window.ExportService =
    ExportService;