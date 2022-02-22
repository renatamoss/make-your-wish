<template>
  <div class="error-servidor">
    <h2>{{ message_server_error }}</h2>
  </div>
</template>
            
            
<script>
export default {
  props: {
    message_server_error: String,
  },
};
</script>
            
            
<style lang="scss" scoped>
.error-servidor {
  text-align: center;
  margin: 2rem;
}
</style>