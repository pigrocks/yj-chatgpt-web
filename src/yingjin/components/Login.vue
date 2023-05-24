<script setup lang='ts'>
import { computed, ref } from 'vue'
import { NButton, NInput, NModal, NTabPane, NTabs, useMessage } from 'naive-ui'
import { useRouter } from 'vue-router'
import { useAuthStore, useUserStore } from '@/store'
import SendCode from '@/yingjin/components/SendCode.vue'
import { userDoLogin, userRegisterAccount } from '@/yingjin/api'

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

const ms = useMessage()

const loading = ref(false)
const phone = ref('')
const code = ref('')
const name = ref('')

const disabled = computed(() => !code.value.trim() || !phone.value.trim() || loading.value)

const activeTab = ref('login')

function handlePress(event: KeyboardEvent, type: string) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    if (type === 'login')
      handleLogin()
    else
      handleRegister()
  }
}

async function handleLogin() {
  try {
    loading.value = true
    const result = await userDoLogin({
      phone: phone.value,
      code: code.value,
    })
    const { data: { code: cd, msg, data: dt } } = result
    if (cd === 11000) {
      await authStore.setToken(dt.token)
      userStore.userInfo = { ...userStore.userInfo, name: dt.name }
      ms.success(msg)
      show.value = false
    }
    else {
      throw new Error(msg)
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
      phone: phone.value,
      code: code.value,
      name: name.value,
    })
    const { data: { msg, data: dt, code: cd } } = result
    if (cd === 11000) {
      authStore.setToken(dt.token)
      show.value = false
      userStore.userInfo = { ...userStore.userInfo, name: dt.name }
    }
    else { throw new Error(msg) }

    ms.success(msg as string)
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
            <NInput v-model:value="phone" placeholder="手机号" type="text" :max-length="11" @keypress="handlePress($event, 'login')" />
            <div class="my-2" />
            <SendCode v-model:value="code" :phone="phone" type="login" />
            <div class="my-2" />
            <NButton block type="primary" :disabled="disabled" :loading="loading" @click="handleLogin">
              登录
            </NButton>
          </NTabPane>

          <NTabPane v-if="authStore.session && authStore.session.allowRegister" name="register" :tab="$t('common.register')">
            <NInput v-model:value="name" type="text" placeholder="姓名" @keypress="handlePress($event, 'register')" />
            <div class="my-2" />
            <NInput v-model:value="phone" type="text" placeholder="手机号" @keypress="handlePress($event, 'regsiter')" />
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
