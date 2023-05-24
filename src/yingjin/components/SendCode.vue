<script lang="ts" setup>
import { computed, ref } from 'vue'
import { NButton, NInput, NInputGroup, useMessage } from 'naive-ui'
import { checkCode, sendCode } from '@/yingjin/api'
import { useAuthStore, useUserStore } from '@/store'

const props = defineProps({
  phone: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
})
const userStore = useUserStore()
const authStore = useAuthStore()
const ms = useMessage()
const loading = ref(false)
const token = ref('')
const code = ref('')
const countDown = ref(0)
const startCountDown = () => {
  countDown.value = 60
  const timer = setInterval(() => {
    countDown.value -= 1
    if (countDown.value <= 0)
      clearInterval(timer)
  }, 1000)
}
const sending = ref(false)

const error = ref(null)

const disabled = computed(() => (!code.value.trim() && !code.value) || loading.value)

async function handleVerify() {
  loading.value = true
  error.value = null
  checkCode({ phone: props.phone, code: code.value }).then((res: any) => {
    globalThis.console.log(res)
    authStore.setToken(res.data.accessKey)
    token.value = res.data.accessKey
    ms.success('登录成功')
    // 设置 用户信息
    userStore.updateUserInfo({
      name: res.data.name,
      description: res.data.mobile,
    })
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }).catch((err) => {
    error.value = err.message
    ms.error(err.message)
    globalThis.console.log('error', err)
    authStore.removeToken()
    token.value = ''
  })
    .finally(() => {
      loading.value = false
    })
}

function handlePress(event: KeyboardEvent) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    handleVerify()
  }
}

function doSendCode() {
  sending.value = true
  sendCode({ phone: props.phone }).then((res) => {
    globalThis.console.log(res)
    startCountDown()
    ms.success('发送成功')
  }).catch((err) => {
    error.value = err.message
    ms.error(err.message)
    globalThis.console.log('error', err)
  }).finally(() => {
    sending.value = false
  })
}
</script>

<template>
  <NInputGroup>
    <NInput v-model:value="code" placeholder="验证码" @press="handlePress" />
    <NButton :loading="sending" :disabled="!!countDown || sending" type="primary" @click="doSendCode">
      <span v-if="!countDown">发送</span>
      <span v-else>{{ countDown }}</span>
    </NButton>
  </NInputGroup>
</template>
