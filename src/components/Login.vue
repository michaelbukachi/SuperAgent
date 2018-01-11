<template>
  <section class="hero">
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-sm-8 offset-sm-2 col-xs-12">
          <div class="card border-none">
            <div class="card-block">
              <div class="mt-2">
                <!--<img src="../assets/portfolio-logo.png" alt="Male" class="brand-logo mx-auto d-block img-fluid rounded-circle"/>-->
              </div>
              <p class="mt-4 text-white lead text-center">
                Sign In
              </p>
              <div class="mt-4">
                <form v-on:submit.prevent="login()">
                  <div class="form-group" :class="{'has-danger': validation.hasError('email') }">
                    <input type="email" class="form-control" id="email" v-model="email" value="" placeholder="Enter email address">
                    <div class="form-control-feedback" v-if="validation.hasError('email')">{{ validation.firstError('email') }}</div>
                  </div>
                  <div class="form-group" :class="{'has-danger': validation.hasError('password') }">
                    <input type="password" class="form-control" id="password" v-model="password" value="" placeholder="Enter password">
                    <div class="form-control-feedback" v-if="validation.hasError('password')">{{ validation.firstError('password') }}</div>
                  </div>
                  <label class="custom-control custom-checkbox mt-2">
                    <input type="checkbox" class="custom-control-input">
                    <span class="custom-control-indicator"></span>
                    <span class="custom-control-description text-white">Keep me logged in</span>
                  </label>
                  <button type="submit" class="btn btn-primary float-right" >Sign in</button>
                </form>
                <div class="clearfix"></div>
                <div v-show="loginFailed" class="alert alert-danger fade show" role="alert">
                  <strong>Oops!</strong> {{ errorMessage }}
                </div>
                <p class="content-divider center mt-4"><span>or</span></p>
              </div>
              <p class="text-center text-white">
                Don't have an account yet? <router-link to="/register">Sign Up Now</router-link>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import * as firebase from 'firebase'
  import SimpleVueValidation from 'simple-vue-validator'
  let Validator = SimpleVueValidation.Validator

  export default {
    name: 'login',
    data: function () {
      return {
        email: '',
        password: '',
        loginFailed: false,
        errorMessage: ''
      }
    },
    validators: {
      email: function (value) {
        return Validator.value(value).required().email()
      },
      password: function (value) {
        return Validator.value(value).required()
      }
    },
    methods: {
      login () {
        this.loginFailed = false
        let self = this
        this.$validate().then(function (success) {
          if (success) {
            self.$Progress.start()
            firebase.auth().signInWithEmailAndPassword(self.email, self.password).then(function (user) {
              self.$Progress.finish()
              self.$router.push('home')
            }, function (error) {
              self.$Progress.finish()
              self.errorMessage = error.message
              self.loginFailed = true
            })
          }
        })
      }
    }
  }
</script>

<style scoped>
  .alert {
    margin-top: 10px;
  }
  .social-login {
    display: none;
  }
</style>
