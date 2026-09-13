const HeroCardV3 = (hero) => {

    let blocks = "";

    for (let i = 1; i <= 36; i++) {

        blocks += `
            <div class="mr-week-block ${i <= hero.currentWeek ? "active" : ""}"></div>
        `;

    }

    return `

<section class="mr-v3-hero mz-hero mz-fade">

    <div class="mr-v3-overlay"></div>

    <div class="mr-v3-content mz-hero-content">

    <div class="mr-v3-tag mz-hero-tag">

       <span class="mr-v3-badge">
    <i data-lucide="timer"></i>
    TIME ATTACK
</span>

        <h1 class="mz-hero-title">

            ${hero.targetTime}

        </h1>

        <h2 class="mz-hero-subtitle">

    ${hero.missionName.replace(" 2:59","")}

</h2>

        <p class="mz-hero-description">

            Maratona do Rio • 30 Maio 2027

        </p>

    </div>

    <div class="mr-v3-footer">

        <div class="mr-v3-top">

    <div class="mr-v3-week">

        <span>SEMANA</span>

        <strong>

            ${hero.currentWeek} / 36

        </strong>

    </div>

    <div class="mr-v3-mission-status">

        EM PREPARAÇÃO

    </div>

</div>

        <div class="mr-week-grid">

            ${blocks}

        </div>

        <div class="mr-v3-days">

            ⏳ ${hero.remainingDays} dias restantes

        </div>

    </div>

</section>

`;

};