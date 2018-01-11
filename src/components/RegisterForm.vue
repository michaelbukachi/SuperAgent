<template>
  <div class="card-block">
    <div class="mt-2 text-center">
      <h2 class="text-white">Create Your Account</h2>
    </div>
    <p class="mt-4 text-white lead text-center">
      Sign up to get started with Super Agent
    </p>
    <div class="mt-4">
      <form v-on:submit.prevent="register()">
        <div class="form-group" :class="{'has-danger': validation.hasError('email') }">
          <input type="email" class="form-control" name="email" v-model="email"  value="" placeholder="Enter email address">
          <div class="form-control-feedback" v-if="validation.hasError('email')">{{ validation.firstError('email') }}</div>
        </div>
        <div class="form-group" :class="{'has-danger': validation.hasError('password') }">
          <input type="password" class="form-control" name="password" v-model="password" value="" placeholder="Enter password">
          <div class="form-control-feedback" v-if="validation.hasError('password')">{{ validation.firstError('password') }}</div>
        </div>
        <div class="form-group" :class="{'has-danger': validation.hasError('confirmPassword') }">
          <input type="password" class="form-control" name="confirm-password" v-model="confirmPassword" value="" placeholder="Confirm password">
          <div class="form-control-feedback" v-if="validation.hasError('confirmPassword')">{{ validation.firstError('confirmPassword') }}</div>
        </div>
        <button type="submit" class="btn btn-primary btn-block">Create Account</button>
      </form>
      <div class="clearfix"></div>
      <div v-show="signupFailed" class="alert alert-danger fade show" role="alert">
        <strong>Oops!</strong> {{ errorMessage }}
      </div>
      <p class="content-divider center mt-4"><span>or</span></p>
    </div>
    <p class="text-center text-white">
      Already have an account? <router-link to="/login">Login Now</router-link>
    </p>
  </div>
</template>
<script>
  import * as firebase from 'firebase'
  import SimpleVueValidation from 'simple-vue-validator'
  let Validator = SimpleVueValidation.Validator

  export default {
    name: 'register',
    data () {
      return {
        email: '',
        password: '',
        confirmPassword: '',
        signupFailed: false,
        errorMessage: ''
      }
    },
    validators: {
      email: function (value) {
        return Validator.value(value).required().email()
      },
      password: function (value) {
        return Validator.value(value).required().minLength(8)
      },
      confirmPassword: function (value) {
        let password = this.password
        return Validator.value(value).required().custom(function () {
          if (value !== password) {
            return 'Passwords do not match'
          }
        })
      }
    },
    methods: {
      register () {
        this.signupFailed = false
        let self = this
        this.$validate().then(function (success) {
          if (success) {
            self.$Progress.start()
            firebase.auth().createUserWithEmailAndPassword(self.email, self.password).then(function (user) {
              self.$Progress.finish()
              self.$router.push({name: 'register-success'})
            }, function (error) {
              self.$Progress.finish()
              self.errorMessage = error.message
              self.signupFailed = true
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
</style>
