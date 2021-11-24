<template>
    <v-card class="mx-auto text-center" max-width="900">
        <v-toolbar flat class="pt-1">
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
                color="#AE2012" 
                icon
                @click="close"
            >
                <v-icon small color="#AE2012"> mdi-close </v-icon>
            </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-toolbar flat v-if="step < 2">
            <v-toolbar-title  class="text-subtitle-1">
                {{ caption }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
                <a v-if="step === 1" href="https://buscacepinter.correios.com.br/app/localidade_logradouro/index.php" target="_blank">Não sei o Cep</a>
        </v-toolbar>
        <v-dialog v-model="alterDialog" max-width="300">
            <v-sheet
                class="px-7 pt-7 pb-4 mx-auto text-center d-inline-block"
                color="blue-grey darken-3"
                dark
            >
                <div class="grey--text text--lighten-1 text-body-2 mb-4">
                    Os dados informados não serão salvos, deseja continuar?
                </div>

                <v-btn class="ma-1" color="grey" text @click="alterDialog = false">
                    Não
                </v-btn>

                <v-btn class="ma-1" color="#9B2226" text @click="closeModal">
                    Sim
                </v-btn>
            </v-sheet>
        </v-dialog>

        <v-window v-model="step" touchless>
            <v-window-item :value="0">
                <v-form
                    class="form text-center"
                    ref="firstForm"
                    v-model="firstValid"
                    lazy-validation
                >
                    <v-row class="px-4 ma-0">
                        <v-col cols="12" sm="6" md="6" lg="6">
                            <v-text-field
                                v-model="currentCompany.corporateName"
                                color="#0A9396"
                                label="Razão Social"
                                :rules="corporateNameRules"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" lg="6">
                            <v-text-field
                                v-model="currentCompany.name"
                                color="#0A9396"
                                label="Nome Fantasia"
                                :rules="nameRules"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" lg="6">
                            <v-text-field
                                label="CNPJ"
                                color="#0A9396"
                                v-model="currentCompany.cnpjCpf"
                                v-mask="['##.###.###/####-##']"
                                :rules="[
                                    (value) => !!value || 'Cnpj é obrigatório',
                                    (value) => validateCnpj(value) || 'Cnpj inválido'
                                ]"
                            >
                            </v-text-field>
                         </v-col>
                         <v-col cols="12" sm="6" md="6" lg="6">
                            <v-text-field
                                v-model="currentCompany.ieRg"
                                color="#0A9396"
                                label="Inscrição Estadual"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" lg="6">
                            <v-text-field
                                v-model="currentCompany.responsibleName"
                                color="#0A9396"
                                label="Nome Responsável"
                                :rules="responsibleNameRules"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" lg="6">
                            <v-text-field
                                v-model="currentCompany.phoneNumber"
                                color="#0A9396"
                                label="Telefone"
                                v-mask="['(##) ####-####']"
                                :rules="phoneRules"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" lg="6">
                            <v-text-field
                                v-model="currentCompany.cellPhoneNumber"
                                color="#0A9396"
                                label="Celular"
                                v-mask="['(##) #####-####']"
                                :rules="cellPhoneRules"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" lg="6">
                            <v-text-field
                                v-model="currentCompany.email"
                                color="#0A9396"
                                label="E-mail"
                                :rules="emailRules"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-form>
            </v-window-item>

            <v-window-item :value="1">
                <v-form
                    class="form text-center"
                    ref="secondForm"
                    v-model="secondValid"
                    lazy-validation
                >
                    <v-row class="px-4 ma-0">
                        <v-col cols="12" sm="3" md="3" lg="3">
                            <v-text-field
                                v-model="postalCode"
                                color="#0A9396"
                                label="Cep"
                                :rules="postalCodeRules"
                                v-mask="['##.###-###']"
                                @blur="getAddress"
                                @keypress.enter="getAddress"
                            ></v-text-field>
                        </v-col>
                        
                        <v-col cols="12" sm="9" md="9" lg="9">
                            <v-text-field
                                label="Logradouro"
                                color="#0A9396"
                                v-model="currentAddress.publicPlace"
                                :rules="addressPublicPlaceRules"
                                disabled
                            >
                            </v-text-field>
                         </v-col>
                         <v-col cols="12" sm="2" md="2" lg="2">
                            <v-text-field
                                v-model="currentCompany.addressNumber"
                                color="#0A9396"
                                label="Número"
                                :rules="addressNumberRules"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" lg="6">
                            <v-text-field
                                v-model="currentCompany.addressComplement"
                                color="#0A9396"
                                label="Complemento"
                                :rules="addressComplementRules"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="4" lg="4">
                            <v-text-field
                                v-model="currentAddress.district"
                                color="#0A9396"
                                label="Bairro"
                                :rules="addressDistrictRules"
                                disabled
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" lg="6">
                            <v-text-field
                                v-model="currentAddress.city"
                                color="#0A9396"
                                label="Cidade"
                                :rules="addressCityRules"
                                disabled
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" lg="6">
                            <v-text-field
                                v-model="currentAddress.state"
                                color="#0A9396"
                                label="Estado"
                                :rules="addressStateRules"
                                disabled
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-form>
            </v-window-item>

            <v-window-item :value="2">
                <div class="fill-heigth text-center py-8">
                    <v-icon large color="success">mdi-checkbox-marked-circle</v-icon>
                    <span class="ml-5 text-subtitle-1">
                        {{ successMessage }}
                    </span>
                </div>
            </v-window-item>
        </v-window>
        <v-divider></v-divider>
        <v-card-actions class="py-5">
            <v-btn @click="close" v-if="step === 0" class="ml-4 white--text" color="#9B2226">
                Cancelar
            </v-btn>
            <v-btn @click="step--" v-if="step === 1" class="ml-4 grey--text" text>
                Voltar
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="#098486" class="white--text" depressed @click="nextStep" :loading="loading">
                {{ buttonText }}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<style scoped>
.v-btn {
    letter-spacing: initial !important;
    font-size: 0.8rem !important;
}

a {
    text-decoration: none;
    font-size: 0.8rem;
}
</style>

<script src="./index.js"></script>