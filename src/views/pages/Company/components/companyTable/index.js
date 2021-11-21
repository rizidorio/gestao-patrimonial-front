import Api from "../../../../../services/apiService/apiService";
import ManageCompany from "../manageCompany/manageCompany.vue";

export default {
    components: {
        ManageCompany,
    },
    
    created() {
        this.getCompanies();
    },

    data: () => ({
        apiService: Api,
        loading: false,
        deleteLoading: false,
        filterVisible: false,
        createDialog: false,
        editDialog: false,
        deleteDialog: false,
        dialogKey: false,
        page: 1,
        totalPages: 1,
        pageSize: 10,
        sizes: [10, 20, 40, 80, 160],
        filter: {
            page: 1,
            pageSize: 10,
            name: "",
            cnpjCpf: "",
        },
        name: "",
        document: "",
        companies: [],
        currentCompany: {},
        headers: [
            {
                text: "Empresa",
                align: "center",
                class: "item",
                value: "name",
            },
            {
                text: "CNPJ/CPF",
                align: "center",
                class: "item",
                value: "document",
            },
            {
                text: "Responsável",
                align: "center",
                class: "item",
                value: "responsible",
            },
            {
                text: "Celular",
                align: "center",
                class: "item",
                value: "cellPhone",
            },
            {
                text: "E-mail",
                align: "center",
                class: "item",
                value: "email",
            },
            {
                text: "Ações",
                align: "center",
                class: "item",
                value: "actions",
            },
        ],
        headerProps: {
            sortByText: "Ordenar por",
        },
    }),

    methods: {
        closeModal() {
            this.createDialog = false;
            this.editDialog = false;
            this.getCompanies();
        },

        newCompany() {
            this.createDialog = true;
            this.dialogKey = !this.dialogKey;
        },

        editCompany(company) {
            this.currentCompany = company;
            this.editDialog = true;
            this.dialogKey = !this.dialogKey;
        },

        deleteCompany(company) {
            this.currentCompany = company;
            this.deleteDialog = true;
        },

        documentIsValid(value) {
            return value.length > 14 ? this.validarCNPJ(value) : this.validarCpf(value);
        },

        validarCNPJ(cnpj) {
            cnpj = cnpj.replace(/[^\d]+/g, "");
                
            if (
                cnpj == "00000000000000" ||
                cnpj == "11111111111111" ||
                cnpj == "22222222222222" ||
                cnpj == "33333333333333" ||
                cnpj == "44444444444444" ||
                cnpj == "55555555555555" ||
                cnpj == "66666666666666" ||
                cnpj == "77777777777777" ||
                cnpj == "88888888888888" ||
                cnpj == "99999999999999"
            )
                return false;
        
            let tamanho = cnpj.length - 2;
            let numeros = cnpj.substring(0, tamanho);
            let digitos = cnpj.substring(tamanho);
            let soma = 0;
            let pos = tamanho - 7;
            for (let i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2) pos = 9;
            }
            let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
            if (resultado != digitos.charAt(0)) return false;
        
            tamanho = tamanho + 1;
            numeros = cnpj.substring(0, tamanho);
            soma = 0;
            pos = tamanho - 7;
            for (let i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2) pos = 9;
            }
            resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
            if (resultado != digitos.charAt(1)) return false;
        
            return true;
        },
    
        validarCpf(strCPF) {
            strCPF = strCPF.replace(/\D/g, "");
            var Soma;
            var Resto;
            Soma = 0;
            if (strCPF == "00000000000" ||
                strCPF == "11111111111" ||
                strCPF == "22222222222" ||
                strCPF == "33333333333" ||
                strCPF == "44444444444" ||
                strCPF == "55555555555" ||
                strCPF == "66666666666" ||
                strCPF == "77777777777" ||
                strCPF == "88888888888" ||
                strCPF == "99999999999" 
            ) return false;
        
            for (let i = 1; i <= 9; i++)
                Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
            Resto = (Soma * 10) % 11;
            if (Resto == 10 || Resto == 11) Resto = 0;
            if (Resto != parseInt(strCPF.substring(9, 10))) return false;
            Soma = 0;
            for (let i = 1; i <= 10; i++)
                Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
            Resto = (Soma * 10) % 11;
        
            if (Resto == 10 || Resto == 11) Resto = 0;
            if (Resto != parseInt(strCPF.substring(10, 11))) return false;
            return true;
        },

        filterTable() {
            this.filter.page = this.page;
            this.filter.pageSize = this.pageSize;
            this.filter.name = this.name;
            this.filter.cnpjCpf = this.document;

            this.getCompanies();
        },

        resetFilter() {
            this.filter = {
                page: 1,
                pageSize: 10,
                name: "",
                cnpjCpf: "",
            };
            this.name = "";
            this.document = "";

            this.getCompanies();
        },

        async getCompanies() {
            this.loading = true;

            await this.apiService.post("company/getAll", this.filter)
                .then((response) => {
                    this.totalPages = response.data.content.totalPages;
                    this.companies = response.data.content.objects;
                }).catch((err) => {
                    console.log(err)
                });

            this.loading = false;
        },

        async removeCompany() {
            this.deleteLoading = true;

            const companyId = this.currentCompany.id;

            await this.apiService.delete(`company/delete/${companyId}`)
                .then(() => {
                })
                .catch((err) => {
                    console.log(err)
                });
            
            this.deleteLoading = false;
            this.deleteDialog = false;
            this.getCompanies();
        }
    },

    computed: {
        getMask() {
            return this.document.length > 14 ? ['##.###.###/####-##'] : ['###.###.###-##'];
        },
    },

    watch: {
        pageSize() {
            this.filter.pageSize = this.pageSize;
            this.filter.page = 1;
            this.getCompanies();
        },

        page() {
            this.filter.page = this.page;
            this.getCompanies();
        }
    },
};