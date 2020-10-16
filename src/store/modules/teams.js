import teams from '@/data/teams';

const state = {
    teams: []
};

const mutations = {
    'INIT_TEAMS'(state) {
        state.teams = teams;
    }
}

export default {
    state,
    mutations
};