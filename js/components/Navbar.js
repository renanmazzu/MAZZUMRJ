const Navbar = {

    render(active = "dashboard") {

        return `

<div class="bottom-nav">

<button class="${active=="dashboard"?"active":""}"
onclick="Router.navigate('dashboard')">

🏠
<span>Home</span>

</button>

<button class="${active=="corrida"?"active":""}"
onclick="Router.navigate('corrida')">

🏃
<span>Corridas</span>

</button>

<button class="${active=="musculacao"?"active":""}"
onclick="Router.navigate('musculacao')">

💪
<span>Musculação</span>

</button>

<button class="${active=="planejamento"?"active":""}"
onclick="Router.navigate('planejamento')">

📅
<span>Plano</span>

</button>

<button class="${active=="evolucao"?"active":""}"
onclick="Router.navigate('evolucao')">

📈
<span>Evolução</span>

</button>

</div>

`;

    }

};
