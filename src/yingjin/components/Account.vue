<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import { NSpin } from 'naive-ui'
import AccountInfoComp from './accountInfo.vue'
import { userDoGetInfo } from '@/yingjin/api'

const loading = ref(false)
const account = ref({})

const getData = () => {
  const accessToken = localStorage.getItem('accessToken') as string
  loading.value = true
  userDoGetInfo({ accessToken }).then((res) => {
    account.value = res.data as any
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
