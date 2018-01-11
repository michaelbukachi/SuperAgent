<template>
  <div id="app">
    <router-view/>
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'app',
    mounted () {
      this.$Progress.finish()
    },
    created () {
      this.$Progress.start()
      this.$router.beforeEach((to, from, next) => {
        if (to.meta.progress !== undefined) {
          let meta = to.meta.progress
          this.$Progress.parseMeta(meta)
        }
        this.$Progress.start()
        if (to.meta.title !== undefined) {
          document.title = to.meta.title
        }
        let currentUser = firebase.auth().currentUser
        let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
        // eslint-disable-next-line no-trailing-spaces
        if (requiresAuth && !currentUser) {
          next('login')
        } else if (!requiresAuth && currentUser) {
          next('home')
        } else {
          next()
        }
      })
      this.$router.afterEach((to, from) => {
        this.$Progress.finish()
      })
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Hind:400,500,700');

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }

  .brand-logo {
    width: 120px;
  }

  .hero {
    background-image: url('assets/bg.jpg');
    background-size: cover;
    background-position: center center;
    min-height: 100%;
    min-width: 100%;
    width: auto;
    height: auto;
    margin: 0;
    position: absolute;
  }

  .hero:after {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    display: block;
    left: 0;
    top: 0;
    content: "";
    background-color: rgba(0, 0, 0, 0.4);
  }

  .hero .container {
    z-index: 3;
    position: relative;
  }

  .hero .card {
    background: rgba(0, 0, 0, 0.7);
  }

  a, a:hover {
    color: #fff;
    text-decoration: underline;
  }

  @media (min-width: 576px) {
    section {
      padding: 40px 0;
    }

    .hero .card .card-block {
      padding-left: 4rem;
      padding-right: 4rem;
    }
  }

  @media (max-width: 576px) {
    section {
      padding: 20px;
    }
  }

  .bg-alt {
    background-color: #fff;
  }

  .btn {
    -webkit-transition: 350ms ease all;
    transition: 350ms ease all;
    text-transform: uppercase;
    font-weight: 500;
    padding: .6rem 1.5rem;
    cursor: pointer;
  }

  .btn:hover, .btn:focus {
    box-shadow: 6px 6px 25px rgba(0, 0, 0, 0.15);
  }

  .btn-primary {
    background-color: #0099fe !important;
    border-color: #0099fe !important;
  }

  .btn-primary:hover, .btn-primary:focus {
    color: #fff !important;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-control {
    height: 45px;
    font-size: 16px;
    background-color: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.5);
    color: #FFFFFF;
  }

  .form-control:focus {
    border-color: #FFFFFF;
    background-color: transparent;
    color: #FFFFFF;
  }

  .form-control-feedback {
    color: #FFFFFF;
  }

  .border-none {
    border: none !important;
    border-color: transparent !important;
  }

  .text-primary {
    color: #0099fe !important;
  }

  .custom-control-input:checked ~ .custom-control-indicator {
    color: #fff;
    background-color: #0099fe;
    outline-color: #0099fe;
  }

  .content-divider.center {
    text-align: center;
  }

  .content-divider {
    position: relative;
    z-index: 1;
  }

  .content-divider > span, .content-divider > a {
    background-color: #000;
    color: #fff;
    display: inline-block;
    padding: 2px 12px;
    border-radius: 3px;
    text-transform: uppercase;
    font-weight: 500;
  }

  .content-divider > span:before, .content-divider > a:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    height: 1px;
    background-color: #ddd;
    width: 100%;
    z-index: -1;
  }

  .social-login .btn {
    color: #fff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    padding: 0.6rem 0;
    font-size: 18px;
    margin-right: 10px;
    margin-bottom: 10px;
  }

  .social-login .btn-twitter {
    background: #00aced;
  }

  .social-login .btn-facebook {
    background: #3b5998;
  }

  .social-login .btn-google {
    background: #dd4b39;
  }

  .social-login .btn-linkedin {
    background: #007bb6;
  }

  .social-login .btn-github {
    background: #000000;
  }
</style>
