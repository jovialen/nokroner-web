<script setup lang="ts">
import Navigation from '../navigation/NavigationComponent.vue'
import Sidebar from '../sidebar/SidebarComponent.vue'
import SidebarContent from '../sidebar/SidebarContent.vue'
import SidebarFooter from '../sidebar/SidebarFooter.vue'
import SidebarHeader from '../sidebar/SidebarHeader.vue'
import SidebarTitle from '../sidebar/SidebarTitle.vue'
import Card from '../card/CardComponent.vue'
import NavigationItem from '../navigation/NavigationItem.vue'
import SidebarItem from '../sidebar/SidebarItem.vue'
import { routes } from '@/router/routes'
import { ref } from 'vue'
import router from '@/router'

const path = ref(window.location.pathname);
router.afterEach(() => {
  path.value = window.location.pathname;
})

const filteredRoutes = routes.filter((route) => !(route.hidden ?? false))
</script>

<template>
  <Sidebar>
    <SidebarHeader>
      <SidebarTitle>{{ $t("nokroner") }}</SidebarTitle>
    </SidebarHeader>
    <SidebarContent>
      <Navigation>
        <navigation-item
          v-for="route in filteredRoutes"
          :to="route.path"
          :key="route.name"
        >
          <SidebarItem :selected="path.includes(route.path)">
            <component :is="route.icon" />
            {{ $t(`page.${route.name}`) }}
          </SidebarItem>
        </navigation-item>
      </Navigation>
    </SidebarContent>
    <SidebarFooter>
      <Card>
        <h2>Max Manus</h2>
      </Card>
    </SidebarFooter>
  </Sidebar>
</template>

<style scoped></style>
