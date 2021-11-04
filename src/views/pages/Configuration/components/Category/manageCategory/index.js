import Api from "../../../../../../services/apiService/apiService";

export default {
    props: {
        title: String,
        category: Object,
    },

    created() {
        if (this.category) {
            this.currentCategory = this.category;
            this.isEditing = true;
        }
    },

    data: () => ({
        apiService: Api,
        step: 0,
        errorMessage: "",
        successMessage: "",
        loading: false,
        valid: true,
        alterDialog: false,
        changeData: false,
        error: false,
        currentCategory: {
            id: 0,
            name: "",
        },
        nameRules: [
            (value) => !!value || "Nome da categoria é obrigatório",
            (value) => value && value.length <= 100 || "Nome da categoria deve ter no máximo 100 caracteres"
        ],
    }),

    computed: {
        caption() {
            return this.isEditing ? "Atualização efetuada" : "Cadastrar efetuado";
        },

        buttonText() {
            switch (this.step) {
                case 0:
                    return this.isEditing ? "Atualizar" : "Cadastrar";
                default:
                    return "Fechar";
            }
        }
    },

    methods: {
        closeModal() {
            this.changeData = false;
            this.close();
        },

        close() {
            if (this.changeData) {
                this.alterDialog = true;
            } else {
                this.$emit("close");
            }
        },

        async nextStep() {
            if (this.step === 0) {
                if (this.$refs.form.validate()) {
                    this.submitForm();
                } 
            } else {
                this.closeModal();
            }
        },

        async submitForm() {
            this.loading = true;

            const category = {
                Id: this.currentCategory.id,
                Name: this.currentCategory.name,
            };

            const url = this.isEditing ? "category/update" : "category/create";

            if (this.isEditing) {
                await this.apiService.put(url, category)
                    .then((response) => {
                        console.log(response.data)
                        this.step++;
                        this.successMessage = response.data.message;
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            } else {
                await this.apiService.post(url, category)
                    .then((response) => {
                        console.log(response.data)
                        this.step++;
                        this.successMessage = response.data.message;
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            }
            
            this.loading = false;
            this.changeData = false;
        },
    },

    watch: {
        currentCategory: {
            deep: true,
            handler() {
                this.changeData = true;
            },
        }
    },
};