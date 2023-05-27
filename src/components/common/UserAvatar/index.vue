<script setup lang='ts'>
import { computed, onMounted, ref } from 'vue'
import { NAvatar, NButton } from 'naive-ui'
import { useRoute } from 'vue-router'
import { useAuthStore, useUserStore } from '@/store'
import defaultAvatar from '@/assets/avatar.jpg'
import { isString } from '@/utils/is'
import Permission from '@/yingjin/components/Login.vue'
import { useBasicLayout } from '@/hooks/useBasicLayout'

const route = useRoute()
const userStore = useUserStore()
const authStore = useAuthStore()
const { isMobile } = useBasicLayout()
const showPermission = ref(false)

const needPermission = computed(() => !!authStore.session?.auth && !authStore.token && (isMobile.value || showPermission.value))

const userInfo = computed(() => userStore.userInfo)

onMounted(async () => {
  const sign = route.query.verifyresetpassword as string
  if (sign)
    showPermission.value = true
})
</script>

<template>
  <div class="flex items-center overflow-hidden">
    <div class="w-10 h-10 overflow-hidden rounded-full shrink-0">
      <template v-if="isString(userInfo.avatar) && userInfo.avatar.length > 0">
        <NAvatar
          size="large"
          round
          :src="userInfo.avatar"
          :fallback-src="defaultAvatar"
        />
      </template>
      <template v-else>
        <NAvatar size="large" round :src="defaultAvatar" />
      </template>
    </div>
    <div class="flex-1 min-w-0 ml-2">
      <div v-if="userInfo.name" class="overflow-hidden text-ellipsis whitespace-nowrap flex flex-col">
        <div class="font-bold text-md">
          {{ userInfo.name }}
        </div>
        <div>
          {{ userInfo.nickname }}
        </div>
      </div>
      <NButton
        v-else tag="a" text
        @click="showPermission = true"
      >
        <span v-if="!!authStore.session?.auth && !authStore.token" class="text-xl text-[#ff69b4] dark:text-white">
          {{ $t('common.notLoggedIn') }}
        </span>
        <span v-else class="text-xl text-[#ff69b4] dark:text-white">
          {{ authStore .session?.title }}
        </span>
      </NButton>
    </div>
    <Permission :visible="needPermission" />
  </div>
</template>
