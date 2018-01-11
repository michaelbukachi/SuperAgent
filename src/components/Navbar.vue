<template>
  <nav class="navbar navbar-light navbar-expand-md sticky-top bg-dark">
    <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <h1 class="navbar-brand text-white">Crypto Portfolio</h1>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item active">
          <router-link to="/home" class="nav-link text-white">Dashboard <span class="sr-only">(current)</span></router-link>
        </li>
        <li class="nav-item active">
          <a href="#" class="nav-link text-white" @click="logout()">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
  import firebase from 'firebase'

  export default {
    name: 'navbar',
    methods: {
      logout () {
        let self = this
        this.$Progress.start()
        firebase.auth().signOut().then(function () {
          self.$Progress.finish()
          self.$router.replace('login')
        }, function (error) {
          self.$Progress.finish()
          alert('Oops: ' + error.message)
        })
      }
    }
  }
</script>
<style scoped>
  .nav-link {
    text-decoration: none;
  }

  .nav-link:hover {
    color: #f5edd6;
    text-decoration: underline;
  }
</style>
