import {createStore} from 'vuex';

import categories from '../data/categories';
import words from '../data/words';

export const store = createStore({
    state() {
        return {
            totalRounds: 0,
            round: 0,
            turn: 0,
            teams: [],
            words: [],
            autoTime: true,
            time: 0,
            gameTypes: [],
            gameType: '',
            categories: [],
            pts: [2, 4, 6],
            playedWords: [],
            currentCat: {},
            currentWord: {}
        }
    },
    getters: {
        getWordsPlayed(state) {
            return state.playedWords;
        },
        getCategoryName(state) {
            return state.currentCat.name;
        },
        getCategoryId(state) {
            return state.currentCat.id;
        },
        getCategoryPoint(state) {
            return state.currentCat.point;
        },
        getTeamsPoints(state) {
            let points, secs, arrRound = [];
            for (let i = 0; i < state.teams.length; i++) {
                points = 0;
                secs = 0;
                for (let j = 0; j < state.teams[i].log.length; j++) {
                    points += state.teams[i].log[j].round.point;
                    secs += state.teams[i].log[j].round.sec;
                }
                arrRound.push({point: points, sec: secs});
            }
            return arrRound;
        },
        getIsLastTurn(state) {
            if (state.round === state.totalRounds && state.turn === state.teams.length - 1)
                return true;
        },
        getCurrentCat(state) {
            return state.currentCat;
        },
        getRandomWord(state) {
            let cat = state.currentCat;
            let validWord = state.words[cat.id].filter(word => (word.cat.catId === cat.id && word.cat.point === cat.point));
            return validWord[Math.floor(Math.random() * validWord.length)].id;
        },
    },
    mutations: {
        initTeams(state) {
            state.teams = [
                {id: 0, name: 'تیم ۱', eliminated: false, log: []},
                {id: 1, name: 'تیم ۲', eliminated: false, log: []}
            ];
        },
        initGame(state) {
            state.totalRounds = 5;
            state.round = 1;
            state.turn = 0;
            state.autoTime = true;
            state.time = 45;
            state.gameTypes = ['عادی'];
            state.gameType = 'عادی';
            state.words = words;
            state.categories = categories;
        },
        setCurrentCat(state, cat) {
            if (state.autoTime)
                state.time = cat.point * 15 + 30;
            state.currentCat = cat;
        },
        addWordToPlayedWords(state, wordId) {
            state.playedWords.push(wordId);
        },
        setNumberOfRounds(state, step) {
            state.totalRounds += step;
        },
        addTeam(state) {
            state.teams.push({id: state.teams.length, name: '', eliminated: false, log: []})
        },
        removeTeam(state) {
            state.teams.splice(state.teams.length - 1, 1)
        },
        setAutoTime(state, value) {
            state.autoTime = value
        },
        setTime(state, step) {
            state.time += step;
        },
        setGameType(state, gameType) {
            state.gameType = gameType;
        },
        nextTurn(state) {
            let teamsLen = state.teams.length - 1;
            while (state.teams[(state.turn + 1) % state.teams.length].eliminated === true) {
                if (state.turn + 1 > teamsLen) {
                    state.turn = -1;
                    state.round++;
                }
                state.turn++;
            }
            if (state.turn + 1 > teamsLen) {
                state.turn = -1;
                state.round++;
            }
            state.turn++;
        },
        addPoint(state, point) {
            state.teams[state.turn].log[state.teams[state.turn].log.length - 1].round.point = point.point;
            state.teams[state.turn].log[state.teams[state.turn].log.length - 1].round.sec = point.time;
        },
        changeLastWordPlayed(state, newWordId) {
            let team = state.teams[state.turn]
            team.log[team.log.length - 1].wordId = newWordId;
            team.log[team.log.length - 1].catId = state.currentCat.id;
        },
        setCurrentWord(state, word) {
            state.currentWord = {
                id: word.id,
                name: word.name
            }
        }
    },
    actions: {
        initGame({commit}) {
            commit("initGame")
            commit("initTeams")
        },
        setNumberOfRounds({commit}, step) {
            commit("setNumberOfRounds", step)
        },
        addTeam({commit}) {
            commit("addTeam")
        },
        removeTeam({commit}) {
            commit("removeTeam")
        },
        setAutoTime({commit}, value) {
            commit("setAutoTime", value)
        },
        setTime({commit}, step) {
            commit("setTime", step)
        },
        setGameType({commit}, gameType) {
            commit("setGameType", gameType)
        },
        setCurrentCat({commit}, cat) {
            commit("setCurrentCat", cat)
        },
        findWord({state, commit, getters}) {
            let wordId;
            let flag = true;
            while (flag) {
                wordId = getters.getRandomWord;
                if (state.playedWords.includes(wordId)) {
                    state.playedWords.pop();
                    continue;
                }
                flag = false;
            }
            state.teams[state.turn].log.push(
                {
                    wordId: wordId,
                    catId: state.currentCat.id,
                    round: {sec: 0, point: 0}
                }
            );

            commit("setCurrentWord", {
                id: wordId,
                name: state.words[state.currentCat.id].filter(word => word.id === wordId)[0].name
            })
            state.playedWords.push(wordId);
        },
        addPoint({commit}, point) {
            commit("addPoint", point)
        },
        changeWord({state, commit, getters}) {
            let wordId;
            let flag = true;
            while (flag) {
                wordId = getters.getRandomWord;
                if (state.playedWords.includes(wordId)) {
                    continue;
                }
                flag = false;
            }
            state.playedWords.push(wordId);
            commit("changeLastWordPlayed", wordId);
            state.currentWord.id = wordId;
            state.currentWord.name = state.words[state.currentCat.id].filter(word => word.id === wordId)[0].name;
        },
    }
})

