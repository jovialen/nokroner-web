<script setup lang="ts">
import Card from '../card/CardComponent.vue'
import AvatarImage from '../avatar/AvatarImage.vue'
import AvatarIcon from '../avatar/AvatarIcon.vue'
import AvatarFallback from '../avatar/AvatarFallback.vue'

import { ref } from 'vue'
import LogoutButton from '../auth/LogoutButton.vue'
import { LogOutIcon } from 'lucide-vue-next'
import { useUserStore } from '@/stores/auth'

const userStore = useUserStore()
const imageFailed = ref(false)
</script>

<template>
  <Card :label="$t('accessibility.sidebar.user_card', { user: userStore.full_name })">
    <div class="flex gap-2 items-center">
      <AvatarIcon>
        <AvatarImage @failed="imageFailed = true"
          src="https://externalcontent.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.w3schools.com%2Fw3images%2Favatar2.png&f=1&nofb=1&ipt=d20abe37a30a3941343b6f88ee2d68dd1663eab27f3e2465bb7b1a51033610d4" />
        <AvatarFallback :show="imageFailed">{{ userStore.initials }}</AvatarFallback>
      </AvatarIcon>
      <div class="flex flex-col grow">
        <span>{{ userStore.full_name }}</span>
        <span class="text-sm">{{ userStore.user?.email_address }}</span>
      </div>
      <LogoutButton class="transition aspect-square h-full p-2 ml-2 rounded-md hover:bg-destructive hover:text-white">
        <LogOutIcon />
        <span class="sr-only">{{ $t("auth.logout") }}</span>
      </LogoutButton>
    </div>
  </Card>
</template>

<style scoped></style>
