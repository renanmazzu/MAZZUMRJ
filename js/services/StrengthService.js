const StrengthService = {

    getTodayWorkout() {

        const day = new Date().getDay();

        const workouts = {

            // =====================================================
            // DOMINGO — POSTERIOR
            // JavaScript: 0 = Domingo
            // =====================================================
            0: {
                title: "POSTERIOR",
                subtitle: "Treino de posterior",
                bike: false,
                exercises: [

                    ["Levantamento Terra Romeno (Barra)", "4", "8 a 12"],
                    ["Elevação Pélvica (Barra)", "4", "8 a 12"],
                    ["Agachamento na Caixa (Barra)", "4", "8 a 12"],
                    ["Afundo Reverso (Halteres)", "4", "8 a 12"],
                    ["Cadeira Flexora", "4", "8 a 12"],
                    ["Coice (Cabo)", "4", "8 a 12"],
                    ["Panturrilha em Pé", "4", "8 a 12"],
                    ["Panturrilha Sentado", "4", "8 a 12"],
                    ["Elevação de Pernas na Barra Fixa ABD", "4", "8 a 12"]

                ]
            },

            // =====================================================
            // SEGUNDA — UPPER STRENGTH + BIKE
            // JavaScript: 1 = Segunda
            // =====================================================
            1: {
                title: "UPPER STRENGTH",
                subtitle: "Força + Bike",
                bike: true,
                exercises: [

                    ["Supino (Barra)", "4", "8 a 12"],
                    ["Supino Inclinado (Halter)", "4", "8 a 12"],
                    ["Remada Curvada (Barra)", "4", "8 a 12"],
                    ["Puxada Alta na Polia", "4", "8 a 12"],
                    ["Remada Sentada Pegada em V", "4", "8 a 12"],
                    ["Desenvolvimento no Smith", "4", "8 a 12"],
                    ["Elevação Lateral", "4", "8 a 12"],
                    ["Tríceps Polia Reta", "4", "8 a 12"],
                    ["Extensão de Tríceps Unilateral (Halter)", "4", "8 a 12"],
                    ["Rosca Bíceps (Barra W)", "4", "8 a 12"],
                    ["Rosca Inclinada (Halter)", "4", "8 a 12"]

                ]
            },

            // =====================================================
            // TERÇA — LOWER STRENGTH
            // JavaScript: 2 = Terça
            // =====================================================
            2: {
                title: "LOWER STRENGTH",
                subtitle: "Força de membros inferiores",
                bike: false,
                exercises: [

                    ["Agachamento no Smith", "4", "8 a 12"],
                    ["Leg Press Unilateral", "4", "8 a 12"],
                    ["Agachamento Búlgaro", "4", "8 a 12"],
                    ["Cadeira Extensora", "4", "8 a 12"],
                    ["Cadeira Flexora", "4", "8 a 12"],
                    ["Panturrilha em Pé (Halter)", "4", "8 a 12"]

                ]
            },

            // =====================================================
            // QUARTA — UPPER HIPERTROFIA + BIKE
            // JavaScript: 3 = Quarta
            // =====================================================
            3: {
                title: "UPPER HIPERTROFIA",
                subtitle: "Hipertrofia + Bike",
                bike: true,
                exercises: [

                    ["Supino Inclinado (Barra)", "4", "8 a 12"],
                    ["Crucifixo na Polia", "4", "8 a 12"],
                    ["Puxada Alta na Polia", "4", "8 a 12"],
                    ["Remada Sentada (Barra)", "4", "8 a 12"],
                    ["Puxada Braços Esticados", "4", "8 a 12"],
                    ["Desenvolvimento (Halter)", "4", "8 a 12"],
                    ["Elevação Lateral", "4", "8 a 12"],
                    ["Extensão Tríceps acima da cabeça (corda)", "4", "8 a 12"],
                    ["Tríceps na Polia (corda)", "4", "8 a 12"],
                    ["Rosca Martelo (Halter)", "4", "8 a 12"],
                    ["Rosca Concentrada (Halter)", "4", "8 a 12"]

                ]
            },

            // =====================================================
            // QUINTA — LOWER-PLYO-QUALIDADE + BIKE
            // JavaScript: 4 = Quinta
            // =====================================================
            4: {
                title: "LOWER-PLYO-QUALIDADE",
                subtitle: "Força + Pliometria + Bike",
                bike: true,
                exercises: [

                    ["Agachamento Búlgaro (Halter)", "4", "8 a 12"],
                    ["Subida no Banco", "4", "8 a 12"],
                    ["Levantamento Terra Romeno (Halteres)", "4", "8 a 12"],
                    ["Elevação Pélvica (Barra)", "4", "8 a 12"],
                    ["Panturrilha Sentado", "4", "8 a 12"],
                    ["Tibial Anterior", "4", "8 a 12"],
                    ["Pogo Jumps", "4", "8 a 12"],
                    ["Salto Vertical", "4", "8 a 12"],
                    ["Salto Lateral", "4", "8 a 12"]

                ]
            },

            // =====================================================
            // SEXTA — FULL BODY
            // JavaScript: 5 = Sexta
            // =====================================================
            5: {
                title: "FULL BODY",
                subtitle: "Treino completo",
                bike: false,
                exercises: [

                    ["Levantamento Terra (Barra)", "4", "8 a 12"],
                    ["Supino Barra", "4", "8 a 12"],
                    ["Remada Unilateral (Halter)", "4", "8 a 12"],
                    ["Desenvolvimento Arnold (Halteres)", "4", "8 a 12"],
                    ["Agachamento Goblet", "4", "8 a 12"],
                    ["Subida ao Banco (Halteres)", "4", "8 a 12"],
                    ["Panturrilha em Pé (Halter)", "4", "8 a 12"],
                    ["Abdominal (corda)", "4", "8 a 12"],
                    ["Prancha Abdominal", "4", "8 a 12"]

                ]
            },

            // =====================================================
            // SÁBADO — DESCANSO
            // JavaScript: 6 = Sábado
            // =====================================================
            6: null

        };

       return workouts[day] || null;
},

getWorkoutByDay(day) {

    const dayNumber = Number(day);

    const workouts = {

        0: {
            title: "POSTERIOR",
            subtitle: "Treino de posterior",
            bike: false,
            exercises: [
                ["Levantamento Terra Romeno (Barra)", "4", "8 a 12"],
                ["Elevação Pélvica (Barra)", "4", "8 a 12"],
                ["Agachamento na Caixa (Barra)", "4", "8 a 12"],
                ["Afundo Reverso (Halteres)", "4", "8 a 12"],
                ["Cadeira Flexora", "4", "8 a 12"],
                ["Coice (Cabo)", "4", "8 a 12"],
                ["Panturrilha em Pé", "4", "8 a 12"],
                ["Panturrilha Sentado", "4", "8 a 12"],
                ["Elevação de Pernas na Barra Fixa ABD", "4", "8 a 12"]
            ]
        },

        1: {
            title: "UPPER STRENGTH",
            subtitle: "Força + Bike",
            bike: true,
            exercises: [
                ["Supino (Barra)", "4", "8 a 12"],
                ["Supino Inclinado (Halter)", "4", "8 a 12"],
                ["Remada Curvada (Barra)", "4", "8 a 12"],
                ["Puxada Alta na Polia", "4", "8 a 12"],
                ["Remada Sentada Pegada em V", "4", "8 a 12"],
                ["Desenvolvimento no Smith", "4", "8 a 12"],
                ["Elevação Lateral", "4", "8 a 12"],
                ["Tríceps Polia Reta", "4", "8 a 12"],
                ["Extensão de Tríceps Unilateral (Halter)", "4", "8 a 12"],
                ["Rosca Bíceps (Barra W)", "4", "8 a 12"],
                ["Rosca Inclinada (Halter)", "4", "8 a 12"]
            ]
        },

        2: {
            title: "LOWER STRENGTH",
            subtitle: "Força de membros inferiores",
            bike: false,
            exercises: [
                ["Agachamento no Smith", "4", "8 a 12"],
                ["Leg Press Unilateral", "4", "8 a 12"],
                ["Agachamento Búlgaro", "4", "8 a 12"],
                ["Cadeira Extensora", "4", "8 a 12"],
                ["Cadeira Flexora", "4", "8 a 12"],
                ["Panturrilha em Pé (Halter)", "4", "8 a 12"]
            ]
        },

        3: {
            title: "UPPER HIPERTROFIA",
            subtitle: "Hipertrofia + Bike",
            bike: true,
            exercises: [
                ["Supino Inclinado (Barra)", "4", "8 a 12"],
                ["Crucifixo na Polia", "4", "8 a 12"],
                ["Puxada Alta na Polia", "4", "8 a 12"],
                ["Remada Sentada (Barra)", "4", "8 a 12"],
                ["Puxada Braços Esticados", "4", "8 a 12"],
                ["Desenvolvimento (Halter)", "4", "8 a 12"],
                ["Elevação Lateral", "4", "8 a 12"],
                ["Extensão Tríceps acima da cabeça (corda)", "4", "8 a 12"],
                ["Tríceps na Polia (corda)", "4", "8 a 12"],
                ["Rosca Martelo (Halter)", "4", "8 a 12"],
                ["Rosca Concentrada (Halter)", "4", "8 a 12"]
            ]
        },

        4: {
            title: "LOWER-PLYO-QUALIDADE",
            subtitle: "Força + Pliometria + Bike",
            bike: true,
            exercises: [
                ["Agachamento Búlgaro (Halter)", "4", "8 a 12"],
                ["Subida no Banco", "4", "8 a 12"],
                ["Levantamento Terra Romeno (Halteres)", "4", "8 a 12"],
                ["Elevação Pélvica (Barra)", "4", "8 a 12"],
                ["Panturrilha Sentado", "4", "8 a 12"],
                ["Tibial Anterior", "4", "8 a 12"],
                ["Pogo Jumps", "4", "8 a 12"],
                ["Salto Vertical", "4", "8 a 12"],
                ["Salto Lateral", "4", "8 a 12"]
            ]
        },

        5: {
            title: "FULL BODY",
            subtitle: "Treino completo",
            bike: false,
            exercises: [
                ["Levantamento Terra (Barra)", "4", "8 a 12"],
                ["Supino Barra", "4", "8 a 12"],
                ["Remada Unilateral (Halter)", "4", "8 a 12"],
                ["Desenvolvimento Arnold (Halteres)", "4", "8 a 12"],
                ["Agachamento Goblet", "4", "8 a 12"],
                ["Subida ao Banco (Halteres)", "4", "8 a 12"],
                ["Panturrilha em Pé (Halter)", "4", "8 a 12"],
                ["Abdominal (corda)", "4", "8 a 12"],
                ["Prancha Abdominal", "4", "8 a 12"]
            ]
        },

        6: null

    };

    return workouts[dayNumber] || null;
}

};