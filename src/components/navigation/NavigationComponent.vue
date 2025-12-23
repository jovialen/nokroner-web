<script setup lang="ts">
import NavigationItem from './NavigationItem.vue';

</script>

<template>
  <nav>
    <ul class="flex flex-col">
      <slot>
        <navigation-item to="/">Oversikt</navigation-item>
        <navigation-item to="/analysis">Analyse</navigation-item>
        <navigation-item to="/account">Kontoer</navigation-item>
        <navigation-item to="/transaction">Overførseler</navigation-item>
        <navigation-item to="/payment">Faste utgifter</navigation-item>
        <navigation-item to="/budget">Budsjett</navigation-item>
        <navigation-item to="/saving-goals">Sparemål</navigation-item>
        <navigation-item to="/loan">Lån</navigation-item>
        <navigation-item to="/asset">Verdier</navigation-item>
        <navigation-item to="/investment">Investeringer</navigation-item>
      </slot>
    </ul>
  </nav>
</template>

<style scoped></style>
