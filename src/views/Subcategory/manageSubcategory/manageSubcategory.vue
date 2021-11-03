<template>
    <v-card class="mx-auto text-center" max-width="600">
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
                    ref="form"
                    v-model="valid"
                    lazy-validation
                >
                    <v-row class="px-4 ma-0">
                        <v-col cols="12">
                            <v-text-field
                                v-model="currentSubcategory.name"
                                color="#0A9396"
                                label="Subcategoria"
                                :rules="nameRules"
                                autofocus
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-autocomplete
                                color="#0A9396"
                                v-model="categoryId"
                                label="Categoria"
                                :items="categories"
                                item-text="name"
                                item-value="id"
                                :loading="categoryLoading"
                                :rules="categoryRules"
                            ></v-autocomplete>
                        </v-col>
                    </v-row>
                </v-form>
            </v-window-item>

            <v-window-item :value="1">
                <div class="fill-heigth text-center pa-8">
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
</style>

<script src="./index.js"></script>