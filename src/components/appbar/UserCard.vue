<script setup lang="ts">
import Card from '../card/CardComponent.vue'
import AvatarImage from '../avatar/AvatarImage.vue'
import AvatarIcon from '../avatar/AvatarIcon.vue'
import AvatarFallback from '../avatar/AvatarFallback.vue'

import { computed, ref } from 'vue'
import api from '@/services/axios'
import LogoutButton from '../auth/LogoutButton.vue'
import { LogOutIcon } from 'lucide-vue-next'

const imageFailed = ref(false)

interface UserData {
  first_name: string
  last_name: string
  email_address: string
}

const user = ref<UserData>({
  first_name: '',
  last_name: '',
  email_address: '',
})

const full_name = computed(
  () => `${user.value.first_name} ${user.value.last_name}`,
)
const initials = computed(
  () => {
    const names = full_name.value.split(' ')
    const first = names[0]
    const last = names[names.length - 1]

    if (!first || first === "") {
      return 'NaN'
    } else if (first === last) {
      return first.substring(0, 2)
    } else {
      return first.charAt(0) + last!.charAt(0)
    }
  }
)

api.get('/user').then((response) => {
  user.value = response.data
})
</script>

<template>
  <Card :label="$t('accessibility.sidebar.user_card', { user: full_name })">
    <div class="flex gap-2 items-center">
      <AvatarIcon>
        <AvatarImage @failed="imageFailed = true"
          src="https://externalcontent.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.w3schools.com%2Fw3images%2Favatar2.png&f=1&nofb=1&ipt=d20abe37a30a3941343b6f88ee2d68dd1663eab27f3e2465bb7b1a51033610d4" />
        <AvatarFallback :show="imageFailed">{{ initials }}</AvatarFallback>
      </AvatarIcon>
      <div class="flex flex-col grow">
        <span>{{ full_name }}</span>
        <span class="text-sm">{{ user.email_address }}</span>
      </div>
      <LogoutButton class="transition aspect-square h-full p-2 ml-2 rounded-md hover:bg-destructive hover:text-white">
        <LogOutIcon />
        <span class="sr-only">{{ $t("auth.logout") }}</span>
      </LogoutButton>
    </div>
  </Card>
</template>

<style scoped></style>
