import Menu from "../menu/menu.vue";

export default {
  name: "Authenticated",

  async created() {
  },

  data: () => ({
  }),

  components: {
    Menu,
  },

  methods: {
    showSuccessAlert(message) {
      this.message = message;

      this.showSuccess = true;

      setTimeout(() => {
        this.showSuccess = false;
      }, 4000);
    },
  },
};