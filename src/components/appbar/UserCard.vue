<script setup lang="ts">
import Card from '../card/CardComponent.vue'
import AvatarImage from '../avatar/AvatarImage.vue'
import AvatarIcon from '../avatar/AvatarIcon.vue'
import AvatarFallback from '../avatar/AvatarFallback.vue'

import { computed, ref } from 'vue'
import { apiRoute, useAuthStore } from '@/stores/auth'
import api from '@/services/axios'

const auth = useAuthStore();
const imageLoaded = ref(false);

interface UserData {
  first_name: string
  last_name: string
  email_address: string
}

const user = ref<UserData>({
  first_name: "",
  last_name: "",
  email_address: "",
})

const full_name = computed(() => `${user.value.first_name} ${user.value.last_name}`)

api.get(apiRoute("/user")).then((response) => {
  user.value = response.data;
})
</script>

<template>
      <Card>
        <div class="flex gap-2">
          <AvatarIcon>
            <AvatarImage @loaded="imageLoaded = true" src="https://externalcontent.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.w3schools.com%2Fw3images%2Favatar2.png&f=1&nofb=1&ipt=d20abe37a30a3941343b6f88ee2d68dd1663eab27f3e2465bb7b1a51033610d4" />
            <AvatarFallback :show="!imageLoaded" :text="full_name" />
          </AvatarIcon>
          <div class="flex flex-col grow">
            <span>{{ full_name }}</span>
            <span class="text-sm">{{ user.email_address }}</span>
          </div>
          <button @click="auth.logout" class="border text-destructive">{{ $t("auth.logout") }}</button>
        </div>
      </Card>
</template>

<style scoped></style>
