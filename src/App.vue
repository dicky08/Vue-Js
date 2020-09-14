<template>
  <div id="app">
    <router-view/>
{{port}}
  </div>
</template>
<script>
export default {
  data () {
    return {
      port: process.env.VUE_APP_PORT
    }
  }
}
</script>
