<script lang="ts" setup>
import QRCode from 'qrcode'
import { computed, onBeforeMount, onUnmounted, ref } from 'vue'
import { NButton, useMessage } from 'naive-ui'
import { orderDetail, wechatPay } from '@/yingjin/api'
import { useUserStore } from '@/store'
const succeed = ref(false)
const selectIndex = ref(10)
const showUnit = ref(false)
const model = ref<any>()
const userInfo = ref()
const qrCodeImgUrl = ref()
const list = [10, 30, 50, 100, 200, 300]
const timer = ref()
const paying = ref(false)
const message = useMessage()
const accessKey = localStorage.getItem('accessKey') as string

const isWeixin = computed(() => {
  const ua = navigator.userAgent.toLowerCase()
  return ua.includes('micromessenger')
})

const isMobile = computed(() => {
  const ua = navigator.userAgent.toLowerCase()
  return /Mobi|Android|iPhone/i.test(ua)
})

onBeforeMount(() => {
  const usr = localStorage.getItem('userInfo')
  if (usr)
    userInfo.value = JSON.parse(usr)
})
onUnmounted(() => {
  clearTimeout(timer.value)
  timer.value = ''
})

function handleChargeAgain() {
  succeed.value = false
  paying.value = false
  qrCodeImgUrl.value = null
  model.value = null
}
const selectMoney = (item: number, index: number) => {
  selectIndex.value = index
  model.value = ''
  message.success(`您已经选择了充值金额 ${item} 元人民币`)
}
const input = () => {
  if (parseInt(model.value) > 999999)
    model.value = '999999'
}
const showYuan = (flag: boolean) => {
  showUnit.value = flag
}

const h5Pay = async () => {
  const money = model.value || list[selectIndex.value]
  paying.value = true
  console.log(money, userInfo)
  const img = await wechatPay({ accessKey, osType: 1, payAmount: +money })
  QRCode.toDataURL(img.data.data.codeUrl).then((res1: any) => {
    qrCodeImgUrl.value = res1
    setTimeout(() => {
      loopOrderDetail(img.data.data.orderNo)
    }, 3000)
  })
}

const mobileH5Pay = async () => {
  const money = model.value || list[selectIndex.value]
  paying.value = true
  console.log(money, userInfo)
  const img = await wechatPay({ accessKey, osType: 2, payAmount: +money })
  const url = img.data.data.h5Url
  window.location.href = url
}

const wxPay = async () => {
  const money = model.value || list[selectIndex.value]
  const userStore = useUserStore()
  const userId = userStore.userInfo?.id
  const state = `${userId}-${money}`
  let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3ea8d7dd10dc5be1'
  url += `&redirect_uri=https%3A%2F%2Fyopenai.yingjin.pro%2Fv1%2FgetOpenid&response_type=code&scope=snsapi_base&state=${state}`
  window.location.href = url
}

const onPay = async () => {
  if (isWeixin.value || isMobile.value) {
    if (isWeixin.value)
      wxPay()
		 else
      mobileH5Pay()
  }
  else { h5Pay() }
  // wxPay()
}

const loopOrderDetail = async (orderNo: string) => {
  const orderResult = await orderDetail({ orderNo, accessKey })
  console.log('orderResult', orderResult)
  if (orderResult.data.payStatus === 1) {
    clearTimeout(timer.value)
    timer.value = ''
    succeed.value = true
  }
  else {
    timer.value = setTimeout(() => {
      loopOrderDetail(orderNo)
    }, 3000)
  }
}
</script>

<template>
  <div v-if="succeed">
    <div class="p-4 my-3 text-2xl text-center">
      充值成功
    </div>
    <div class="text-center">
      <NButton type="primary" @click="handleChargeAgain">
        再次充值
      </NButton>
    </div>
  </div>
  <div v-else class="recharge">
    <p v-if="false" class="tip">
      充值到: {{ userInfo?.mobile }}
    </p>
    <div class="charge-box">
      <div class="right mx-auto">
        <div class="compute" :style="{ 'text-align': paying ? 'center' : 'left' }">
          <span class="d">充值:</span>
          {{ !paying ? '到账按人民币兑美元汇率' : `${model || list[selectIndex]}元人民币` }}
        </div>
        <ul v-if="!paying" class="money-list">
          <li v-for="(item, index) in list" :key="item" class="money-item" :class="{ 'select-money': selectIndex === index }" @click="selectMoney(item, index)">
            {{ item }}元
          </li>
          <li class="ipt-money">
            <input v-model="model" max="99999" class="self-money" type="number" placeholder="自定义充值" @focus="showYuan(true)" @blur="showYuan(!!model)" @input="input">
            <div v-if="showUnit" class="yuan">
              元
            </div>
          </li>
        </ul>
        <div class="weChat-pay-code">
          <img v-if="qrCodeImgUrl" class="code" :src="qrCodeImgUrl" alt="">
          <div class="icon-weChat">
            微信支付
          </div>
          <div v-if="!paying" class="do-pay" @click="onPay">
            确认支付
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@mixin hover5Style {
  &:hover {
    color: #000;
  }
  &:active {
    color: rgba(0, 0, 0, 0.5);
  }
}
.recharge {
  // min-width: 1200px;
  box-sizing: border-box;
  background: #fff;
  overflow: hidden;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
  .recharge-icon {
    color: #447eea;
    height: 61px;
    line-height: 61px;
  }
  .recharge-count {
    font-weight: bold;
    color: #161618;
  }
  .tip {
    font-weight: 400;
    color: #000000;
    margin-top: 25px;
  }
  .charge-box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    margin-top: 20px;
    .left {
      flex: 1 0 auto;
      height: 500px;
      background: #f2f2f5;
      border-radius: 26px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-direction: column;
      padding: 39px 59px;
      box-sizing: border-box;
      margin-right: 50px;
      box-sizing: border-box;

      .mbm {
        font-family: FUTURA-MEDIUM;
        line-height: 102px;
        color: #221815;
      }
      .slogan-logo {
        width: 100%;
        height: 46px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex-wrap: wrap;
        .slogan {
          height: 36px;
          font-family: FUTURA-MEDIUM;
          font-weight: bold;
          color: #000000;
        }
        .line {
          width: 0px;
          height: 33px;
          border-left: 1px solid #707070;
          margin: 0 28px;
        }
        .logo {
          display: block;
          height: 100%;
        }
      }
    }
    .right {
      width: 345px;
      .compute {
        width: 100%;
        font-family: Futura;
        font-weight: bold;
        color: #737379;
        .d {
          color: #000;
        }
      }
      .money-list {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        list-style: none;
        padding: 0;
        margin-top: 16px;
        .money-item {
          width: 30%;
          height: 72px;
          background: #f2f2f5;
          border-radius: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          margin-top: 16px;
          font-family: FUTURA-MEDIUM;
          font-weight: 500;
          color: #000000;
          cursor: pointer;
          box-sizing: border-box;
        }
        .select-money {
          border: 1px solid #000000;
          background: none;
        }
        .ipt-money {
          font-family: FUTURA-MEDIUM;
          font-weight: 500;
          color: #000000;
          width: 100%;
          height: 74px;
          background: #f2f2f5;
          border-radius: 16px;
          margin-top: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          position: relative;
          .self-money {
            border: none;
            outline: none;
            display: block;
            height: 100%;
            width: 100%;
            background: transparent;
            text-align: center;
            padding: 0 20px;
            box-sizing: border-box;
            &::placeholder {
              color: #000000;
            }
          }
          .yuan {
            width: 50px;
            height: 100%;
            position: absolute;
            right: 0;
            top: 0;
            background: #f2f2f5;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
          }
        }
      }
      .weChat-pay-code {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
        .code {
          width: 204px;
          height: 204px;
          margin-top: 40px;
        }
        .icon-weChat {
          height: 45px;
          line-height: 45px;
          background: url('@/assets/wechat-pay-icon.png') center left / contain no-repeat;
          padding-left: 55px;
          margin-top: 20px;
        }
        .do-pay {
          width: 100%;
          height: 70px;
          line-height: 70px;
          border: 1px solid #000;
          font-family: FUTURA-MEDIUM;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.95);
          text-align: center;
          margin: 30px auto 0;
          cursor: pointer;
          @include hover5Style;
        }
      }
    }
  }
}
@media screen and (max-width: 1600px) {
  .recharge {
    padding-top: 20px;
    .charge-box {
      overflow: hidden;
      .left {
        height: 400px;
        padding: 39px 29px;
      }
      .right {
        width: 300px;
        .compute {
        }
        .weChat-pay-code {
          .code {
            height: 150px;
            width: 150px;
            margin-top: 30px;
          }
        }
      }
    }
  }
}
</style>
