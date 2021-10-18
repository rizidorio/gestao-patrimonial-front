<template>
    <v-main class="back">
        <v-navigation-drawer
            color="#264653"
            dark
            permanent
            height="100vh"
            >
            <v-list
                nav
                dense
            >
            <v-list-item-group
                v-model="group"
                active-class="info--text text--accent-2"
            >
                <v-list-item
                v-for="item in items"
                :key="item.title"
                link
                width="100%"
                >
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
            </v-list>

            <template v-slot:append>
                <div class="pa-2">
                    <v-btn block color="#001219">
                        Logout
                    </v-btn>
                </div>
            </template>
        </v-navigation-drawer>
    </v-main>
</template>

<style scoped>
.back {
    background-color: #f9f9f9;
}
</style>

<script src="./index.js"></script>