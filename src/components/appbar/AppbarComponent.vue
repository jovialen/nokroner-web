<script setup lang="ts">
import Navigation from '../navigation/NavigationComponent.vue'
import NavigationItem from '../navigation/NavigationItem.vue'
import Sidebar from '../sidebar/SidebarComponent.vue'
import SidebarContent from '../sidebar/SidebarContent.vue'
import SidebarFooter from '../sidebar/SidebarFooter.vue'
import SidebarHeader from '../sidebar/SidebarHeader.vue'
import SidebarTitle from '../sidebar/SidebarTitle.vue'
import SidebarItem from '../sidebar/SidebarItem.vue'

import { routes } from '@/router/routes'
import { ref } from 'vue'
import router from '@/router'
import UserCard from './UserCard.vue'

const model = defineModel("open")

const path = ref(window.location.pathname)
router.afterEach(() => {
  path.value = window.location.pathname
})

const filteredRoutes = routes.filter((route) => !route.hidden)
</script>

<template>
  <Sidebar :open="open">
    <SidebarHeader v-model:open="model">
      <SidebarTitle>{{ $t('nokroner') }}</SidebarTitle>
    </SidebarHeader>
    <SidebarContent>
      <Navigation>
        <navigation-item v-for="route in filteredRoutes" :to="route.path" :key="route.name">
          <SidebarItem :selected="path.includes(route.path)">
            <component :is="route.icon" />
            {{ $t(`navigation.${route.name?.toString()}`) }}
          </SidebarItem>
        </navigation-item>
      </Navigation>
    </SidebarContent>
    <SidebarFooter>
      <UserCard />
    </SidebarFooter>
  </Sidebar>
</template>

<style scoped></style>
