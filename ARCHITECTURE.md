# MAZZUPRO

Arquitetura Oficial do Projeto

Versão 1.0

---

# Objetivo

O MAZZUPRO é um aplicativo PWA desenvolvido para gerenciamento pessoal de treinos de corrida, musculação, evolução física e preparação para objetivos esportivos.

O projeto utiliza apenas:

- HTML
- CSS
- JavaScript Vanilla
- LocalStorage
- PWA

Não existem frameworks.

Não existe backend.

Não existe banco online.

Todo o estado do aplicativo é armazenado localmente.

---

# Filosofia

Existem apenas três regras principais.

## Regra 1

A Interface nunca faz cálculos.

Cards e telas apenas exibem informações.

Toda lógica fica nos Services.

---

## Regra 2

O banco de dados nunca armazena informações calculáveis.

Exemplo:

NÃO salvar:

- dias restantes
- progresso
- percentual
- peso restante

Salvar apenas fatos.

---

## Regra 3

Cada arquivo possui apenas uma responsabilidade.

Nunca misturar Interface com Regra de Negócio.

---

# Estrutura

js/

database/

services/

pages/

cards/

components/

---

# Camadas

Interface

↓

Pages

↓

Cards

↓

Services

↓

Database

↓

LocalStorage

---

# Entidades

Athlete

Workout

Race

WeightEntry

Achievement

Statistics

Settings

---

# Database

O AppDatabase representa a única fonte de verdade do aplicativo.

Nenhum componente utiliza localStorage diretamente.

---

# Services

WorkoutService

Responsável por:

- iniciar treino
- finalizar treino
- buscar treino de hoje
- buscar treino da semana
- calcular objetivo semanal

---

MissionService

Responsável por:

- missão atual
- dias restantes
- progresso da missão
- prova principal

---

WeightService

Responsável por:

- histórico
- peso atual
- evolução

---

StatisticsService

Responsável por:

- recordes
- quilômetros
- pace médio
- tempo total

---

# Pages

As páginas apenas montam componentes.

Nenhuma regra de negócio.

---

# Cards

Os cards apenas recebem dados.

Nunca calculam nada.

Exemplo:

ERRADO

WorkoutCard calcula progresso.

CERTO

WorkoutService calcula.

WorkoutCard apenas exibe.

---

# Banco

Guardar apenas fatos.

Exemplo

Workout

date

completed

pace

duration

distance

notes

Nunca guardar:

- progresso semanal
- objetivo semanal
- percentual da missão

Tudo isso será calculado.

---

# Objetivo

O projeto deve permanecer simples.

Todo código novo deve seguir este documento.