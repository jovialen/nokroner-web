<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import Appbar from './components/appbar/AppbarComponent.vue';
  import Page from './components/page/PageComponent.vue';
</script>

<template>
  <div class="bg-muted flex">
    <Appbar />
    <Page>
      <main>
        <RouterView />
      </main>
    </Page>
  </div>
</template>

<style scoped></style>
