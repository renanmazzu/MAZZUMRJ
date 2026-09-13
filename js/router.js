const Router = {

    currentPage: "dashboard",

    getPage(page) {
        switch (page) {
            case "corrida":
                return typeof CorridaPage !== "undefined" ? CorridaPage : null;
            case "treino":
                return typeof TreinoPage !== "undefined" ? TreinoPage : null;
            case "musculacao":
                return typeof MusculacaoPage !== "undefined" ? MusculacaoPage : null;
            case "planejamento":
                return typeof PlanejamentoPage !== "undefined" ? PlanejamentoPage : null;
            case "evolucao":
                return typeof EvolucaoPage !== "undefined" ? EvolucaoPage : null;
            case "dashboard":
            default:
                return typeof DashboardPage !== "undefined" ? DashboardPage : null;
        }
    },

    navigate(page, params = {}) {

        const allowedPages = [
            "dashboard",
            "corrida",
            "treino",
            "musculacao",
            "planejamento",
            "evolucao"
        ];

        if (!allowedPages.includes(page)) {
            page = "dashboard";
        }

        const currentPage = this.getPage(page);

        if (!currentPage || typeof currentPage.render !== "function") {
            console.error(
                `Página "${page}" não foi carregada. Verifique o <script> correspondente no index.html.`
            );
            return;
        }

        this.currentPage = page;

        document.getElementById("header").innerHTML =
            Header.render({
                title: "MISSÃO RIO 2:59",
                subtitle: "Preparação Maratona",
                right: "🏅"
            });

        try {
            document.getElementById("page").innerHTML = currentPage.render(params);
        } catch (error) {
            console.error(`Erro ao abrir a página "${page}":`, error);
            document.getElementById("page").innerHTML = `
                <section class="page">
                    <div class="mr-card">
                        <h2>Não foi possível abrir esta página.</h2>
                        <p>Abra o Console para ver o erro.</p>
                    </div>
                </section>`;
            return;
        }

        document.getElementById("navbar").innerHTML = Navbar.render(page);

        if (typeof currentPage.afterRender === "function") {
            currentPage.afterRender();
        }
    }

};


window.Router = Router;
