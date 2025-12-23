<script setup lang="ts">
  import Navigation from '../navigation/NavigationComponent.vue';
  import Sidebar from '../sidebar/SidebarComponent.vue';
  import SidebarContent from '../sidebar/SidebarContent.vue';
  import SidebarFooter from '../sidebar/SidebarFooter.vue';
  import SidebarHeader from '../sidebar/SidebarHeader.vue';
  import SidebarTitle from '../sidebar/SidebarTitle.vue';
  import Card from "../card/CardComponent.vue";
</script>

<template>
  <Sidebar>
    <SidebarHeader>
      <SidebarTitle>Nokroner</SidebarTitle>
    </SidebarHeader>
    <SidebarContent>
      <Navigation></Navigation>
    </SidebarContent>
    <SidebarFooter>
      <Card>
        <h2>Max Manus</h2>
      </Card>
    </SidebarFooter>
  </Sidebar>
</template>

<style scoped></style>
