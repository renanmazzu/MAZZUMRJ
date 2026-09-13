const ExportDataCard = () => {

    return `

        <section class="mr-export-card">

            <div class="mr-export-header">

                <div class="mr-export-icon">
                    📥
                </div>

                <div>

                    <small>
                        DADOS DA MISSÃO
                    </small>

                    <h2>
                        Exportar treinos
                    </h2>

                </div>

            </div>


            <p class="mr-export-description">

                Baixe seu histórico de corridas
                para analisar no Excel ou guardar
                um backup dos seus dados.

            </p>


            <div class="mr-export-actions">

                <button
                    type="button"
                    class="mr-export-button"
                    onclick="ExportService.downloadRunningCSV()"
                >

                    📊
                    <span>

                        <strong>
                            BAIXAR EXCEL
                        </strong>

                        <small>
                            Histórico de corridas
                        </small>

                    </span>

                </button>


                <button
                    type="button"
                    class="mr-export-button secondary"
                    onclick="ExportService.downloadRunningJSON()"
                >

                    🗂️
                    <span>

                        <strong>
                            BAIXAR JSON
                        </strong>

                        <small>
                            Dados das corridas
                        </small>

                    </span>

                </button>


                <button
                    type="button"
                    class="mr-export-button backup"
                    onclick="ExportService.downloadFullBackup()"
                >

                    💾
                    <span>

                        <strong>
                            BACKUP COMPLETO
                        </strong>

                        <small>
                            Todo o MAZZUPRO
                        </small>

                    </span>

                </button>

            </div>

        </section>

    `;

};

window.ExportDataCard =
    ExportDataCard;