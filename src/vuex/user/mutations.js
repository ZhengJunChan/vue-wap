export default {
    setLoginStatus(state, {isLogined}) {
        let userId = Number(isLogined);

        if (userId < 1 || isNaN(userId)) {
            state.isLogined = false;
            state.infos.uid = 0;
        } else {
            state.isLogined = true;
            state.infos.uid = userId;
        }
    }
};
