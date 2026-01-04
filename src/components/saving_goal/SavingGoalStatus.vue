<script setup lang="ts">
import type { DetailedSavingGoal } from '@/api/schemas';
import api from '@/services/axios';
import { useSavingGoalsStore } from '@/stores/saving_goals';
import { formatMoney, formatPercentage } from '@/utils/format';
import { computed, reactive, watchEffect } from 'vue';
import TextButton from '../button/TextButton.vue';
import gsap from 'gsap';
import IconButton from '../button/IconButton.vue';
import { ArchiveIcon } from 'lucide-vue-next';

const props = defineProps({
  savingGoal: {
    type: Object,
    required: true
  }
})

const savingGoals = useSavingGoalsStore()

const realSavingGoal = computed(() => props.savingGoal as DetailedSavingGoal);
const tweened = reactive({ saved: 0 })
const progress = computed(() => realSavingGoal.value.saved / realSavingGoal.value.amount)

const url = computed(() => `/saving_goals/${realSavingGoal.value.id}`)

const complete = async (realized: boolean) => {
  await api.patch(url.value, { realized })
  await savingGoals.fetchSavingGoals()
}

const archive = async (archived: boolean) => {
  await api.patch(url.value, { archived })
  await savingGoals.fetchSavingGoals()
}

watchEffect(() => {
  gsap.to(tweened, { duration: 0.5, saved: realSavingGoal.value.saved || 0 })
})
</script>

<template>
  <div class="flex flex-col gap-2 text-muted-foreground text-sm" tabindex="0"
    :aria-label="$t(`accessibility.saving_goals.${realSavingGoal.archived ? 'archived' : 'saved'}`, realSavingGoal)">
    <div class="flex justify-between items-center">
      <h3 class="text-base" :class="realSavingGoal.archived ? 'line-through' : 'text-foreground'">{{
        realSavingGoal.name }}
      </h3>
      <div>
        <span class="text-base" :class="realSavingGoal.archived ? 'line-through' : 'text-foreground'">{{
          formatMoney(tweened.saved, 0)
          }}</span>
        /
        <span>{{ formatMoney(realSavingGoal.amount, 0) }}</span>
      </div>
    </div>
    <div class="flex gap-2 h-full justify-center items-center" v-if="tweened.saved < realSavingGoal.amount">
      <progress :value="tweened.saved" :max="realSavingGoal.amount" class="w-full rounded-sm"></progress>
      <span>{{ formatPercentage(progress) }}</span>
    </div>
    <div class="flex gap-2 h-full items-center" v-else-if="realSavingGoal.realized && !realSavingGoal.archived">
      <TextButton @click="complete(false)" hover-variant="destructive" class="group grow">
        <span class="group-hover:hidden">
          {{ $t("components.saving_goals.completed") }}
        </span>
        <span class="group-hover:block hidden">
          {{ $t("components.saving_goals.undo") }}
        </span>
      </TextButton>
      <IconButton @click="archive(true)">
        <ArchiveIcon />
        <span class="sr-only">{{ $t("accessibility.saving_goals.archive") }}</span>
      </IconButton>
    </div>
    <TextButton v-else-if="realSavingGoal.archived" @click="archive(false)" variant="accent"
      hover-variant="destructive">
      {{ $t("components.saving_goals.undo_archive") }}
    </TextButton>
    <TextButton v-else @click="complete(true)" variant="accent" hover-variant="primary">
      {{ $t("components.saving_goals.complete") }}
    </TextButton>
  </div>
</template>

<style scoped></style>
