import {createStore} from 'vuex';

import categories from '../data/categories';
import words from '../data/words';

export const store = createStore({
    state() {
        return {
            gameName: 'Pantomim Game',
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
            playedWords: []
        }
    },
    getters: {
        fetchWord(state) {
            let indLog = state.teams[state.turn].log.length - 1;
            let wordId = state.teams[state.turn].log[indLog].wordId;
            let word = state.words.filter(word => word.id === wordId)[0];
            let catId = word.cat.catId;
            let point = word.cat.point;
            let name = word.name;
            let id = word.id;

            return {
                id: id,
                name: name,
                catId: catId,
                point: point
            };
        },
        getWordsPlayed(state) {
            for (let i = 0; i < state.teams.length; i++)
                for (let j = 0; j < state.teams[i].log.length; j++)
                    if (state.playedWords.indexOf(state.teams[i].log[j].wordId) === -1)
                        state.playedWords.push(state.teams[i].log[j].wordId);

            return state.playedWords;
        },
        getCategoryName(state, getters) {
            let lastWord = getters['fetchWord'];
            let category = state.categories.filter(function (cat) {
                if (cat.id === lastWord.catId)
                    return true;
            })
            return category[0].name;
        },
        getCategoryId(state, getters) {
            let lastWord = getters['fetchWord'];
            let category = state.categories.filter(function (cat) {
                if (cat.id === lastWord.catId)
                    return true;
            })
            return category[0].id;
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
        }
    },
    mutations: {
        initTeams(state) {
            state.teams = [
                {id: 0, name: 'تیم ۱', eliminated: false, log: []},
                {id: 1, name: 'تیم ۲', eliminated: false, log: []}
            ];
        },
        initGame(state) {
            state.totalRounds = 3;
            state.round = 1;
            state.turn = 0;
            state.autoTime = true;
            state.time = 45;
            state.gameTypes = ['عادی'];
            state.gameType = 'عادی';
            state.words = words;
            state.categories = categories;
        },
        setNumberOfRounds(state, step) {
            state.totalRounds += step;
        },
        addTeam(state) {
            let newId = state.teams.length;
            state.teams.push({id: newId, name: '', eliminated: false, log: []})
        },
        removeTeam(state) {
            let lastId = state.teams.length;
            state.teams.splice(lastId - 1, 1)
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
        findWord(state, cat) {
            let validWord = state.words[cat.catId].filter(word => (word.cat.catId === cat.catId && word.cat.point === cat.point));
            let randomValidWordId = validWord[Math.floor(Math.random() * validWord.length)].id;
            state.teams[state.turn].log.push(
                {
                    wordId: randomValidWordId,
                    round: {sec: 0, point: 0}
                }
            );
        },
        getRandomWord(state, cat) {
            let wordInCategory = state.words.filter(function (word) {
                if (word.cat.catId === cat.catId && word.cat.point === cat.point) {
                    return true
                }
            });
            let randomValidWordId = wordInCategory[Math.floor(Math.random() * wordInCategory.length)].id;
            cat.rndId = {
                id: randomValidWordId
            };
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
        },
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
        removeCategoryOption({commit}, cat) {
            commit("removeCategoryOption", cat)
        },
        findWord({commit}, cat) {
            commit("findWord", cat)
        },
        addPoint({commit}, point) {
            commit("addPoint", point)
        },
        getRandomWord({commit}, cat) {
            commit("getRandomWord", cat)
        },
        fetchNewWord({state, commit, getters}) {
            let oldWord = getters.fetchWord;
            let cat = {
                catId: oldWord.catId,
                point: oldWord.point
            }

            let playedWords = getters.getWordsPlayed;

            let flag = true;
            while (flag) {
                commit("getRandomWord", cat);
                if (playedWords.includes(cat.rndId.id)) {
                    continue;
                }
                flag = false;
            }
            let catId = getters.getCategoryId();
            let wordId = state.words[catId].filter(word => cat.rndId.id === word.id);
            commit("changeLastWordPlayed", wordId[0].id);
            return wordId[0].name;
        },
    }
})

