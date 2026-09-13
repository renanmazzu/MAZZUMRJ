const CountdownCardV3 = ({

days,

startDate,

raceDate

}) => {

return `

<div class="mr-v3-card">

    <div class="mr-v3-card-header">

       <div class="mr-v3-card-icon">
    <i data-lucide="hourglass"></i>
</div>

        <div class="mr-v3-card-title">

            <small>CONTAGEM</small>

            <strong>REGRESSIVA</strong>

        </div>

    </div>

    <div class="mr-v3-count-number">

        ${days}

    </div>

    <div class="mr-v3-count-label">

        DIAS

    </div>

    <div class="mr-v3-divider"></div>

    <div class="mr-v3-count-dates">

        <div>${startDate}</div>

        <div class="mr-v3-arrow">↓</div>

        <div>${raceDate}</div>

    </div>

</div>

`;

};