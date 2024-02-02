<template>

this user page

{{ firstname }}
{{ lastname }}
{{ email }}
{{ phone }}

</template>

<script>
import axios from "axios";

export default {

    data() {
        return {
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
        }
    },

  mounted() {
    this.getUser();
  },

  methods: {
    getUser() {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .post("http://localhost:8080/users/" + token, {}, { headers })
        .then((response) => {
            const user = response.data;
            this.firstname = user.firstname;
            this.lastname = user.lastname;
            this.email = user.email;
            this.phone = user.phone;
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped></style>
