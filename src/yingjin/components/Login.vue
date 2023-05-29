<script setup lang='ts'>
import { computed, ref } from 'vue'
import { NButton, NInput, NInputNumber, NModal, NTabPane, NTabs, useMessage } from 'naive-ui'
import { useRouter } from 'vue-router'
import { useAuthStore, useChatStore, useUserStore } from '@/store'
import SendCode from '@/yingjin/components/SendCode.vue'
// import { userDoLogin, userRegisterAccount } from '@/yingjin/api'
import { fetchUserLogin as userDoLogin, fetchUserRegister as userRegisterAccount } from '@/api'

interface Props {
  visible: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<Emit>()

interface Emit {
  (e: 'update:visible', visible: boolean): void
}

const show = computed({
  get: () => props.visible,
  set: (visible: boolean) => emit('update:visible', visible),
})

const router = useRouter()
const authStore = useAuthStore()
const userStore = useUserStore()
const chatStore = useChatStore()

const ms = useMessage()

const loading = ref(false)
const phone = ref<string>()
const code = ref('')
const name = ref('')

const disabled = computed(() => !code.value || !phone.value || loading.value)

const activeTab = ref('login')

function handlePress(event: KeyboardEvent, type: string) {
  console.log(event)
  if (!['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(event.key)) {
    event.preventDefault()
    return
  }
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    if (type === 'login')
      handleLogin()
    else
      handleRegister()
  }
}

async function setUser(data: any) {
  console.log('set User', data)
  await authStore.setToken(data.token)
  userStore.userInfo = {
    ...userStore.userInfo,
    name: String(phone.value),
    accessKey: data.accessKey,
    accessToken: data.accessToken,
    nickname: data.name,
    mobile: data.mobile,
    inviteCode: data.inviteCode,
    id: data.id,
  }
  userStore.recordState()
  localStorage.setItem('accessKey', data.accessKey)
  localStorage.setItem('accessToken', data.accessToken)
  // 获取chat history
  chatStore.syncHistory(() => {
    console.log('get history')
  })
}

async function handleLogin() {
  try {
    loading.value = true
    const result = await userDoLogin({
      phone: String(phone.value),
      code: code.value,
    })
    const { data, message, status } = result
    globalThis.console.log('login ok', result)
    if (status === 'Success') {
      setUser(data)
      ms.success(message as string)
      show.value = false
    }
    else {
      throw new Error(message as string)
    }
  }
  catch (error: any) {
    ms.error(error.message ?? 'error')
  }
  finally {
    loading.value = false
  }
}

async function handleRegister() {
  try {
    loading.value = true
    const result = await userRegisterAccount({
      phone: String(phone.value),
      code: code.value,
      name: name.value,
    })
    console.log(result)
    const { data, message, status } = result
    if (status === 'Success') {
      setUser(data)
      ms.success(message as string)
      show.value = false
    }
    else { throw new Error(message as string) }

    ms.success(message as string)
  }
  catch (error: any) {
    ms.error(error.message ?? 'error')
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <NModal :show="visible" style="width: 90%; max-width: 440px">
    <div class="p-10 bg-white rounded dark:bg-slate-800">
      <div class="space-y-4">
        <header class="space-y-2">
          <h2 class="text-2xl font-bold text-center text-slate-800 dark:text-neutral-200">
            {{ $t('common.notLoggedIn') }}
          </h2>
        </header>

        <!-- Add Tabs -->
        <NTabs v-model:value="activeTab" type="line">
          <NTabPane name="login" :tab="$t('common.login')">
            <NInput v-model:value="phone" :show-button="false" :maxlength="11" placeholder="手机号" type="text" @keypress="handlePress($event, 'login')" />
            <div class="my-2" />
            <SendCode v-model:value="code" :phone="phone" type="login" :maxlength="4" />
            <div class="my-2" />
            <NButton block type="primary" :disabled="disabled" :loading="loading" @click="handleLogin">
              登录
            </NButton>
          </NTabPane>

          <NTabPane v-if="authStore.session && authStore.session.allowRegister" name="register" :tab="$t('common.register')">
            <NInput v-model:value="name" :maxlength="10" type="text" placeholder="姓名" @keypress="handlePress($event, 'register')" />
            <div class="my-2" />
            <NInputNumber v-model:value="phone" :max="100000000000" type="text" placeholder="手机号" :show-button="false" @keypress="handlePress($event, 'regsiter')" />
            <div class="my-2" />
            <SendCode v-model:value="code" :phone="phone" type="register" />
            <div class="my-2" />
            <NButton block type="primary" :disabled="disabled" :loading="loading" @click="handleRegister">
              注册
            </NButton>
          </NTabPane>
        </NTabs>
        <!-- End Tabs -->
      </div>
    </div>
  </NModal>
</template>
