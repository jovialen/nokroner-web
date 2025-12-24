<script setup lang="ts">
import Navigation from '../navigation/NavigationComponent.vue'
import NavigationItem from '../navigation/NavigationItem.vue'
import Sidebar from '../sidebar/SidebarComponent.vue'
import SidebarContent from '../sidebar/SidebarContent.vue'
import SidebarFooter from '../sidebar/SidebarFooter.vue'
import SidebarHeader from '../sidebar/SidebarHeader.vue'
import SidebarTitle from '../sidebar/SidebarTitle.vue'
import SidebarItem from '../sidebar/SidebarItem.vue'
import Card from '../card/CardComponent.vue'
import AvatarImage from '../avatar/AvatarImage.vue'
import AvatarIcon from '../avatar/AvatarIcon.vue'
import AvatarFallback from '../avatar/AvatarFallback.vue'

import { routes } from '@/router/routes'
import { ref } from 'vue'
import router from '@/router'

const path = ref(window.location.pathname);
router.afterEach(() => {
  path.value = window.location.pathname;
})

const filteredRoutes = routes.filter((route) => !(route.hidden ?? false))
const imageLoaded = ref(false);
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
        <div class="flex gap-2">
          <AvatarIcon>
            <AvatarImage @loaded="imageLoaded = true" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.w3schools.com%2Fw3images%2Favatar2.png&f=1&nofb=1&ipt=d20abe37a30a3941343b6f88ee2d68dd1663eab27f3e2465bb7b1a51033610d4" />
            <AvatarFallback :show="!imageLoaded" text="Max Manus" />
          </AvatarIcon>
          <div class="flex flex-col">
            <span>Max Manus</span>
            <span class="text-sm">max@manus.no</span>
          </div>
        </div>
      </Card>
    </SidebarFooter>
  </Sidebar>
</template>

<style scoped></style>
