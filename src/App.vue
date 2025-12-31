<script setup lang="ts">
import { RouterView } from 'vue-router'
import Appbar from './components/appbar/AppbarComponent.vue'
import Page from './components/page/PageComponent.vue'
import Card from './components/card/CardComponent.vue'
import { PanelLeftCloseIcon, PanelLeftOpenIcon } from 'lucide-vue-next';
import { ref } from 'vue';
import SidebarToggle from './components/sidebar/SidebarToggle.vue';

const appbarOpen = ref(true)
</script>

<template>
  <div class="font-fredoka bg-background min-h-screen">
    <div v-if="!$route.meta.allowUnauthorized" class="flex">
      <Appbar v-model:open="appbarOpen" />
      <div class="container mx-auto h-screen p-4 overflow-y-scroll space-y-4" :class="appbarOpen && 'md:block hidden'">
        <SidebarToggle v-model:open="appbarOpen">
          <PanelLeftCloseIcon v-if="appbarOpen" />
          <PanelLeftOpenIcon v-else />
        </SidebarToggle>
        <Page>
          <main id="content" class="space-y-6" :aria-label="$t(`navigation.${$route.name?.toString()}`)">
            <RouterView />
          </main>
        </Page>
      </div>
    </div>
    <Card v-else class="absolute top-1/2 left-1/2 -translate-1/2 p-6">
      <h1 class="text-center text-2xl font-baloo font-semibold mb-4">
        {{ $t('nokroner') }}
      </h1>
      <RouterView />
    </Card>
  </div>
</template>

<style scoped></style>
