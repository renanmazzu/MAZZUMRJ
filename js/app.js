const App = {

    refreshIcons() {
    if (window.lucide) {
        lucide.createIcons();
    }
},

   init() {
    SeedService.initialize();

    this.renderHeader();

    Router.navigate("dashboard");

    // Inicializa os ícones Lucide
    setTimeout(() => {
        lucide.createIcons();
    }, 0);
},

    renderHeader() {

    document.getElementById("header").innerHTML =
        Header.render();

    lucide.createIcons();

},

startWorkout(id) {

    WorkoutService.startWorkout(id);

    Router.navigate("treino");

},

finishWorkout() {

    WorkoutService.finishActiveWorkout();

    Router.navigate("dashboard");

}

};

document.addEventListener("DOMContentLoaded", () => {

    App.init();


}


);


window.App = App;
