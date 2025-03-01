<script setup lang='ts'>
import { computed, ref } from 'vue'
import { NModal, NTabPane, NTabs } from 'naive-ui'
import General from './General.vue'
import Advanced from './Advanced.vue'
import Statistics from './Statistics.vue'
import About from './About.vue'
import Site from './Site.vue'
import Mail from './Mail.vue'
import Audit from './Audit.vue'
import User from './User.vue'
import Key from './Keys.vue'
import Recharge from '@/yingjin/components/Recharge.vue'
import Account from '@/yingjin/components/Account.vue'
import Orders from '@/yingjin/components/Orders.vue'
import { SvgIcon } from '@/components/common'
import { useAuthStore, useUserStore } from '@/store'
import { useBasicLayout } from '@/hooks/useBasicLayout'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  tab: {
    type: String,
    default: 'General',
  },
})

const emit = defineEmits<Emit>()

const userStore = useUserStore()
const authStore = useAuthStore()
const { isMobile } = useBasicLayout()

const isChatGPTAPI = computed<boolean>(() => !!authStore.isChatGPTAPI)

interface Emit {
  (e: 'update:visible', visible: boolean): void
}

const active = ref(props.tab)

const show = computed({
  get() {
    return props.visible
  },
  set(visible: boolean) {
    emit('update:visible', visible)
  },
})
</script>

<template>
  <NModal v-model:show="show" :auto-focus="false" preset="card" :style="{ 'width': '80%', 'min-height': !isMobile ? '800px' : 'auto' }">
    <div>
      <NTabs v-model:value="active" type="line" animated>
        <NTabPane name="General" tab="General">
          <template #tab>
            <SvgIcon class="text-lg" icon="ri:file-user-line" />
            <span class="ml-2">{{ $t('setting.general') }}</span>
          </template>
          <div class="min-h-[100px]">
            <General />
          </div>
        </NTabPane>
        <NTabPane v-if="false" name="Account" tab="Account">
          <template #tab>
            <SvgIcon class="text-lg" icon="ri:bar-chart-box-line" />
            <span class="ml-2">账户信息</span>
          </template>
          <div class="min-h-[100px]">
            <Account />
          </div>
        </NTabPane>

        <NTabPane name="Recharge" tab="Recharge">
          <template #tab>
            <SvgIcon class="text-lg" icon="ri:bar-chart-box-line" />
            <span class="ml-2">充值</span>
          </template>
          <div class="min-h-[100px]">
            <Recharge />
          </div>
        </NTabPane>

        <NTabPane name="Orders" tab="Orders">
          <template #tab>
            <SvgIcon class="text-lg" icon="ri:bar-chart-box-line" />
            <span class="ml-2">充值记录</span>
          </template>
          <div class="min-h-[100px]">
            <Orders />
          </div>
        </NTabPane>

        <NTabPane name="Statistics" tab="Statistics">
          <template #tab>
            <SvgIcon class="text-lg" icon="ri:bar-chart-box-line" />
            <span class="ml-2">{{ $t('setting.statistics') }}</span>
          </template>
          <div class="min-h-[100px]">
            <Statistics />
          </div>
        </NTabPane>

        <NTabPane v-if="false && userStore.userInfo.root" name="Config" tab="Config">
          <template #tab>
            <SvgIcon class="text-lg" icon="ri:list-settings-line" />
            <span class="ml-2">{{ $t('setting.config') }}</span>
          </template>
          <About />
        </NTabPane>
        <NTabPane v-if="false && userStore.userInfo.root" name="SiteConfig" tab="SiteConfig">
          <template #tab>
            <SvgIcon class="text-lg" icon="ri:settings-line" />
            <span class="ml-2">{{ $t('setting.siteConfig') }}</span>
          </template>
          <Site />
        </NTabPane>
        <NTabPane v-if="false && userStore.userInfo.root" name="MailConfig" tab="MailConfig">
          <template #tab>
            <SvgIcon class="text-lg" icon="ri:mail-line" />
            <span class="ml-2">{{ $t('setting.mailConfig') }}</span>
          </template>
          <Mail />
        </NTabPane>
        <NTabPane v-if="false && userStore.userInfo.root" name="AuditConfig" tab="AuditConfig">
          <template #tab>
            <SvgIcon class="text-lg" icon="ri:settings-line" />
            <span class="ml-2">{{ $t('setting.auditConfig') }}</span>
          </template>
          <Audit />
        </NTabPane>
        <NTabPane v-if="false && userStore.userInfo.root" name="UserConfig" tab="UserConfig">
          <template #tab>
            <SvgIcon class="text-lg" icon="ri-user-5-line" />
            <span class="ml-2">{{ $t('setting.userConfig') }}</span>
          </template>
          <User />
        </NTabPane>
        <NTabPane v-if="false && userStore.userInfo.root" name="KeysConfig" tab="KeysConfig">
          <template #tab>
            <SvgIcon class="text-lg" icon="ri-key-2-line" />
            <span class="ml-2">{{ $t('setting.keysConfig') }}</span>
          </template>
          <Key />
        </NTabPane>
        <NTabPane v-if="isChatGPTAPI" name="Advanced" tab="Advanced">
          <template #tab>
            <SvgIcon class="text-lg" icon="ri:equalizer-line" />
            <span class="ml-2">{{ $t('setting.advanced') }}</span>
          </template>
          <div class="min-h-[100px]">
            <Advanced />
          </div>
        </NTabPane>
      </NTabs>
    </div>
  </NModal>
</template>
