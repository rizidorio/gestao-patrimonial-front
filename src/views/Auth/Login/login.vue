<template>
    <v-content class="fill-height justify-center align-center">
        <v-row justify="center" align="center">
            <v-card class="text-center login elevation-3">
                <h1 class="display-1 font-weight-bold mb-4">Login</h1>
                <v-card-text class="text-center">
                    <v-form lazy-validation>
                        <v-text-field
                            label="E-mail"
                            placeholder="Digite seu e-mail"
                            prepend-icon="mdi-email"
                            aria-autocomplete="userEmail"
                            color="#ee9b00"
                        ></v-text-field>
                        <v-text-field
                            label="Senha"
                            prepend-icon="mdi-lock"
                            placeholder="Digite sua senha"
                            type="password"
                            color="#ee9b00"
                        ></v-text-field>
                    </v-form>
                    <v-col cols="12" class="mt-5">
                        <v-btn 
                            dark
                            color="#CA6702"
                        >
                            Entrar
                        </v-btn>
                    </v-col>
                    <v-col cols="12">
                        <a>Esqueci a senha</a>
                    </v-col>
                </v-card-text>
            </v-card>
        </v-row>
    </v-content>
</template>

<style scoped>
.login {
    max-width: 100%;
    width: 400px; 
    background-color: #FBF8EF !important;
    padding: 2rem;
    max-height: 100%;
    height: 400px;
}

h1 {
    color: rgba(94,86,105,.87)!important;
}
</style>

<script src="./index.js"></script>