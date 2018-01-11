<template>
  <div>
    <navbar></navbar>
  </div>
</template>
<script>
  import lang from 'element-ui/lib/locale/lang/en'
  import locale from 'element-ui/lib/locale'
  import Navbar from './Navbar.vue'

  locale.use(lang)

  export default {
    name: 'home',
    components: {
      'navbar': Navbar
    }
  }
</script>
