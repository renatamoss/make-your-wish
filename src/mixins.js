//Do logout
export const logoutMixin = {
    methods: {
        doLogout() {
            this.$store.commit('LOGOUT_USER')
        },
    },
}