<script setup lang="ts">
import { RouterView } from 'vue-router'
import Appbar from './components/appbar/AppbarComponent.vue'
import Page from './components/page/PageComponent.vue'
</script>

<template>
  <div class="font-fredoka bg-muted flex">
    <Appbar />
    <Page>
      <main id="content">
        <RouterView />
      </main>
    </Page>
  </div>
</template>

<style scoped></style>
