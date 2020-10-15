import teams from '../../data/teams';

const state = {
    teams: teams
};

const mutations = {
    initTeams(state) {
        state.teams = teams;
    }
}

export default {
    state,
    mutations
};