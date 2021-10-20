<template>
    <v-main class="fill-height justify-center align-center">
        <v-row justify="center" align="center">
            <v-card
                color="#2A9D8F"
                class="frame"
            >
                <v-alert 
                    type="error"
                    v-show="error"
                    elevation="9"
                    class="errorAlert"
                >
                    {{errorMessage}}
                </v-alert>
                <v-card flat class="text-center login rounded-lg">
                    <h1 class="mb-4">Login</h1>
                    <v-card-text class="text-center">
                        <v-form ref="formLogin" v-model="formValid" lazy-validation>
                            <v-text-field
                                label="E-mail"
                                v-model="email"
                                placeholder="Digite seu e-mail"
                                prepend-icon="mdi-email"
                                aria-autocomplete="userEmail"
                                color="#2A9D8F"
                                :rules="emailRules"
                                @keydown.enter="login"
                            ></v-text-field>
                            <v-text-field
                                label="Senha"
                                v-model="password"
                                prepend-icon="mdi-lock"
                                placeholder="Digite sua senha"
                                type="password"
                                color="#2A9D8F"
                                :rules="passwordRules"
                                @keydown.enter="login"
                            ></v-text-field>
                        </v-form>
                        <v-col cols="12" class="mt-5">
                            <v-btn
                                dark
                                color="#2A9D8F"
                                @click="login"
                                :loading="loading"
                            >
                                Entrar
                            </v-btn>
                        </v-col>
                        <v-col cols="12" class="mt-0 pa-0">
                            <a>Esqueci a senha</a>
                        </v-col>
                    </v-card-text>
                </v-card>
            </v-card>
        </v-row>
    </v-main>
</template>

<style scoped>
h1 {
    color: rgba(0, 0, 0, 0.7) !important;
}

.errorAlert {
  z-index: 100;
  position: absolute;
  right: 2%;
  top: 1;
  white-space: nowrap;
}

.frame {
    max-width: 100%;
    width: 420px; 
    padding: 1rem;
    max-height: 100%;
    height: 420px;
}

.login {
    max-width: 100%;
    padding: 2rem;
    max-height: 100%;
}

@media(max-width: 400px) {
    .frame {
        max-width: 80%;
        height: 400px;
        padding: 0.5rem;
    }

    .login {
        margin: 0 auto;
        padding: 1.5rem 0;
    }

    h1 {
        font-size: 1.8rem;
    }

    button {
        font-size: 0.9rem !important;
    }

    a {
        font-size: 0.8rem;
    }

    a:hover {
        font-size: 0.9rem;
    }
}

</style>

<script src="./index.js"></script>