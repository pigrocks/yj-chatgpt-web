<script setup lang='ts'>
import { NTabPane } from 'naive-ui'
import Recharge from './Recharge.vue'
</script>

<template>
  <NTabPane name="Recharge" tab="Recharge">
    <template #tab>
      <SvgIcon class="text-lg" icon="ri:file-user-line" />
      Setings
      <span class="ml-2">{{ $t('setting.general') }}</span>
    </template>
    <div class="min-h-[100px]">
      <Recharge />
    </div>
  </NTabPane>
</template>
