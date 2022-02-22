<template>
  <div class="error-servidor">
    <h2>{{ errorServidor }}</h2>
  </div>
</template>
            
            
<script>
export default {
  props: {
    errorServidor: String,
  },
};
</script>
            
            
<style lang="scss" scoped>
.error-servidor {
  text-align: center;
  margin: 2rem;
}
</style>