<script setup lang="ts">
import { RouterView } from 'vue-router'
import Appbar from './components/appbar/AppbarComponent.vue'
import Page from './components/page/PageComponent.vue'
import Card from './components/card/CardComponent.vue'
</script>

<template>
  <div class="font-fredoka bg-background min-h-screen">
    <div v-if="!$route.meta.allowUnauthorized" class="flex">
      <Appbar />
      <Page>
        <main id="content">
          <RouterView />
        </main>
      </Page>
    </div>
    <Card v-else class="absolute top-1/2 left-1/2 -translate-1/2 p-6">
      <h1 class="text-center text-2xl font-baloo font-semibold mb-4">{{ $t('nokroner') }}</h1>
      <RouterView />
    </Card>
  </div>
</template>

<style scoped></style>
