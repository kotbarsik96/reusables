<template>
  <div class="_wrapper">
    <PageHeader />
    <div class="_main" id="main">
      <RouterView />
    </div>
    <NotificationsContainer />
    <ConfirmationDialogsList />
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/_Layout/PageHeader.vue'
import NotificationsContainer from '@/components/_UI/Notifications/NotificationsContainer.vue'
import ConfirmationDialogsList from '@/components/_UI/Dialog/Confirmation/ConfirmationDialogsList.vue'
</script>

<style>
@import '@/css/base/fonts.scss';
@import '@/css/base/general.scss';
@import '@/css/base/null.scss';
@import '@/css/variables/colors.scss';
@import '@/css/variables/fonts-variables.scss';
@import '@/css/variables/scrollbar.scss';
@import '@/css/variables/sizes.scss';
@import '@/css/variables/transitions.scss';
</style>

<style lang="scss" scoped>
@use '@/css/mixins/mixins.scss';
</style>
