<script lang='ts' setup>
import { onMounted, ref } from 'vue'
import { NDataTable, useMessage } from 'naive-ui'
import { orderDetail, orderList } from '@/yingjin/api'

const orders = ref([])
const order = ref()
const message = useMessage()

function showDetail(id) {
  orderDetail({ id }).then((res) => {
    console.log(res)
    const { data, msg, code, total } = res
    if (code === 11000)
  	  order.value = data
    else
      message.error(msg)
  })
}

function loadData() {
  const accessKey = localStorage.getItem('accessKey') as string
  const params = {
    accessKey,
    pageNo: 0,
    pageSize: 10,
    payWay: undefined,
  }
  orderList(params).then((res) => {
    const { data, msg, code, total } = res
    if (code === 11000)
		  orders.value = data
    else
      message.error(msg)
  })
}

const columns = [
  {
    title: '订单号',
    key: 'orderNo',
    width: '20%',
  },
  {
    title: '支付时间',
    key: 'payTime',
    width: '20%',
  },
  {
    title: '金额',
    key: 'amount',
    render(_, index) {
      return `${_.amount}美元/${_.payAmount}人民币`
    },
    width: '20%',
  },
  {
    title: '充值前',
    key: 'beforeAmount',
    render(_, index) {
      return `${_.beforeAmount}美元`
    },
    width: '13%',
  },
  {
    title: '充值后',
    key: 'afterAmount',
    render(_, index) {
      return `${_.afterAmount}美元`
    },
    width: '13%',
  },
  {
    title: '支付场景',
    key: 'payWay',
    render(_, index) {
      return payWayHash[_.payWay]
    },
    width: '14%',
  },
]

const payWayHash = {
  1: '手机端',
  2: '电脑端',
}
onMounted(loadData)
</script>

<template>
  <NDataTable :columns="columns" :data="orders" />
  <NDialog v-model:visible="order" title="订单详情">
    <div>{{ order }}</div>
  </NDialog>
</template>
