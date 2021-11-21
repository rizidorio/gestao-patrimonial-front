import Api from "../../../../../services/apiService/apiService";
import Utils from "../../../../../Utils/validateDocument";

export default {
    props: {
        title: String,
        company: Object,
    },

    created() {
        if (this.company) {
            this.currentCompany = this.company;
            this.isEditing = true;
        }
    },

    data: () => ({
        apiService: Api,
        step: 0,
        errorMessage: "",
        successMessage: "",
        postalCode: "",
        loading: false,
        addressLoading: false,
        firstValid: true,
        secondValid: true,
        alterDialog: false,
        changeData: false,
        error: false,
        typesCompany: ["Física", "Jurídica"],
        companyType: 1,
        currentCompany: {
            id: 0,
            name: "",
            corporateName: "",
            cnpj: "",
            ie: "",
            responsibleName: "",
            phoneNumber: "",
            cellPhoneNumber: "",
            email: "",
            addressNumber: "",
            addressComplement: "",
        },
        currentAddress: {
            id: 0,
            publicPlace: "",
            district: "",
            city: "",
            state: "",
        },
        nameRules: [(value) => value.length <= 100 || "Nome fantasia deve ter no máximo 100 caracteres"],
        corporateNameRules: [
            (value) => !!value || "Razão social é obrigatória",
            (value) => value && value.length <= 100 || "Razão social deve ter no máximo 100 caracteres"
        ],
        responsibleNameRules: [
            (value) => !!value || "Nome do responsável é obrigatório",
            (value) => (value && value.length <= 100) || "Nome do responsável deve ter no máximo 100 caracteres"
        ],
        phoneRules: [(value) => value.length == 0 || value.length > 13 || "Telefone inválido"],
        cellPhoneRules: [(value) => value.length == 0 || value.length > 14 || "Celular inválido"],
        emailRules: [ (value) => !!value || "E-mail é obrigatório",
            (value) => /.+@.+\..+/.test(value) || "E-mail inválido"
        ],
        postalCodeRules:[
            (value) => !!value || "Cep é obrigatório",
            (value) => value && value.length >= 10 || "Cep inválido"
        ],
        addressPublicPlaceRules: [(value) => value.length <= 100 || "Logradouro deve ter no máximo 100 caracteres"],
        addressDistrictRules: [(value) => value.length <= 50 || "Bairro deve ter no máximo 50 caracteres"],
        addressCityRules: [(value) => value.length <= 50 || "Cidade deve ter no máximo 50 caracteres"],
        addressStateRules: [(value) => value.length <= 2 || "Estado deve ter no máximo 02 caracteres"],
        addressNumberRules: [(value) => value.length <= 10 || "Número do endereço deve ter no máximo 10 caracteres"],
        addressComplementRules: [(value) => value.length <= 80 || "Complemento do endereço deve ter no máximo 80 caracteres"],
    }),

    computed: {
        caption() {
            switch(this.step) {
                case 0: 
                    return "Dados Gerais"
                case 1:
                    return "Endereço"
                default:
                    return this.isEditing ? "Atualização efetuada" : "Cadastrar efetuado";
            }
        },

        buttonText() {
            switch (this.step) {
                case 0:
                    return "Continuar";
                case 1:
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

        isValidCnpj(cnpj) {
            return Utils.validarCNPJ(cnpj);
        },

        async nextStep() {
            if (this.step === 0) {
                if (this.$refs.firstForm.validate()) {
                    this.step++;
                } 
            } else if (this.step === 1) {
                if (this.$refs.secondForm.validate()) {
                    this.submitForm();
                } 
            } else {
                this.closeModal();
            }
        },

        async getAddress() {
            this.addressLoading = true;
            console.log(this.postalCode)

            await this.apiService.get(`address/getPostalCode/${this.postalCode}`)
                .then((response) => {
                    this.currentAddress = response.data.content;
                });
            
            this.addressLoading = false;
        },

        async submitForm() {
            this.loading = true;

            const company = {
                Id: this.currentCompany.id,
                Name: this.currentCompany.name,
                CorporateName: this.currentCompany.corporateName,
                CompanyType: this.companyType,
                CnpjCpf: this.currentCompany.cnpj,
                IeRg: this.currentCompany.ie,
                ResponsibleName: this.currentCompany.responsibleName,
                PhoneNumber: this.currentCompany.phoneNumber,
                CellPhoneNumber: this.currentCompany.cellPhoneNumber,
                Email: this.currentCompany.email,
                AddressId: this.currentAddress.id,
                AddressNumber: this.currentCompany.addressNumber,
                AddressComplement: this.currentCompany.addressComplement,
            };

            const url = this.isEditing ? "company/update" : "company/create";

            if (this.isEditing) {
                await this.apiService.put(url, company)
                    .then((response) => {
                        console.log(response.data)
                        this.step++;
                        this.successMessage = response.data.message;
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            } else {
                await this.apiService.post(url, company)
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
        currentCompany: {
            deep: true,
            handler() {
                this.changeData = true;
            },
        },
    },
};