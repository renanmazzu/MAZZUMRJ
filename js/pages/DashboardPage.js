const DashboardPage = {

    render() {

        const vm = DashboardViewModel.build();

        return `

<section class="mr-dashboard">

    ${HeroCardV3(vm.hero)}

    <section class="mr-dashboard-grid">

        ${WorkoutCardV3(vm.workout)}

        ${WeeklyCardV3(vm.weeklyGoal)}

        ${LastWorkoutCardV3(vm.lastWorkout)}

        ${TodayTrainingCard(vm.todayNonRunWorkout)}

    </section>

</section>

`;

    }

};