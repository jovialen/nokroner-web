<script setup lang="ts">
import { RouterView } from 'vue-router'
import Appbar from './components/appbar/AppbarComponent.vue'
import Page from './components/page/PageComponent.vue'
import { useAuthStore } from './stores/auth';
import Card from './components/card/CardComponent.vue';

const auth = useAuthStore();
</script>

<template>
  <div class="font-fredoka bg-background flex min-h-screen">
    <div v-if="auth.isAuthenticated" >
    <Appbar />
    <Page>
      <main id="content">
        <RouterView />
      </main>
    </Page>
    </div>
    <Card v-if="!auth.isAuthenticated" class="absolute top-1/2 left-1/2 -translate-1/2">
      <RouterView />
    </Card>
  </div>
</template>

<style scoped></style>
