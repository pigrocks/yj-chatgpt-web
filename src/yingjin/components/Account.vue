<script setup lang='ts'>
import { computed, onMounted, ref } from 'vue'
import { NSpin } from 'naive-ui'
import AccountInfoComp from './accountInfo.vue'
import { userDoGetInfo } from '@/yingjin/api'

interface Props {
  visible: boolean
  accessKey?: string
}

interface Emit {
  (e: 'update:visible', visible: boolean): void
}

const props = defineProps<Props>()

const emit = defineEmits<Emit>()

const loading = ref(false)

const account = ref({})

const show = computed({
  get() {
    return props.visible
  },
  set(visible: boolean) {
    emit('update:visible', visible)
  },
})

const getData = () => {
  const accessToken = localStorage.getItem('accessToken') as string
  loading.value = true
  userDoGetInfo({ accessToken }).then((res) => {
    account.value = res.data as any
    console.log(account.value, res)
  }).finally(() => {
    loading.value = false
  })
}

onMounted(getData)
</script>

<template>
  <NSpin :spinning="loading">
    <AccountInfoComp :account="account" />
  </NSpin>
</template>
