<template>
  <div class="footer">
    <p>Make Your Wish &copy; 2022</p>
  </div>
</template>


<style lang="scss" scoped>
.footer {
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--bg-color-1);
  bottom: 0;
  color: var(--text-color-2);
  font-size: 1rem;
  height: 3rem;
}

@media (max-width: 768px) {
  .footer {
    height: 3rem;
    font-size: 0.8rem;
  }
}
</style>