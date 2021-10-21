import Api from "../../../services/apiService/apiService";

export default {
    created() {
        
    },

    data: () => ({
        apiService: Api,
        loading: false,
        error: false,
        formValid: true,
        errorMessage: "",
        email: "",
        password: "",
        emailRules: [
            (v) => !!v || "E-mail é obrigatório",
            (v) => /.+@.+\..+/.test(v) || "E-mail inválido",
        ],
        passwordRules: [(v) => !!v || "Senha é obrigatório"],
    }),

    methods: {
        async login() {
            if(this.$refs.formLogin.validate()) {
                this.loading = true;
                const loginModel = {
                    Email: this.email,
                    Password: this.password,
                };

                await this.apiService.post("auth/login", loginModel)
                    .then((response) => {
                        const user = JSON.stringify(response.data.content.user);
                        const tokenExpires = response.data.content.expiration;
                        const userToken = response.data.content.token;
                        this.$store.commit("USER_LOGGED", user);
                        this.$store.commit("TOKEN_EXPIRES", tokenExpires);
                        this.$store.commit("CURRENT_USER_TOKEN", userToken);
                        this.$router.push("/configurations");
                    })
                    .catch((err) => {
                        console.log(err.response)
                        this.error = true;
                        this.errorMessage = err.response.data.message;

                        setTimeout(() => {
                            this.error = false;
                        }, 4000);
                    });
                this.loading = false;
            }
        },
    },
};