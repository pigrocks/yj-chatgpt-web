<script lang="ts" setup>
import { ref, watch } from 'vue'
import { NButton, NInput, NInputGroup, useMessage } from 'naive-ui'
import { userDoRegisterCode, userDoSendCode } from '@/yingjin/api'

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
const emit = defineEmits(['update:value'])
const ms = useMessage()
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

function doSendCode() {
  sending.value = true
  const api = (props.type === 'register' ? userDoRegisterCode : userDoSendCode)
  api({ phone: props.phone }).then((res) => {
    const { data: { code, msg } } = res
    if (code !== 11000) {
      ms.error(msg)
      return
    }

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

watch(code, () => {
  emit('update:value', code.value)
}, { immediate: true, flush: 'sync' })
</script>

<template>
  <NInputGroup>
    <NInput v-model:value="code" placeholder="验证码" />
    <NButton :loading="sending" :disabled="!!countDown || sending" type="primary" @click="doSendCode">
      <span v-if="!countDown">发送</span>
      <span v-else>{{ countDown }}</span>
    </NButton>
  </NInputGroup>
</template>
