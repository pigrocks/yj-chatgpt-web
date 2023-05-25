<script lang='ts' setup>
import { onMounted, ref } from 'vue'
import { useMessage } from 'naive-ui'
import { orderDetail, orderList } from '@/yingjin/api'

const orders = ref([])
const order = ref()

function showDetail(id) {
  orderDetail({ id }).then((res) => {
    const message = useMessage()
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
  orderList({
    accessKey,
    pageNo: 1,
    pageSize: 10,
    payWay: 0,
  }).then((res) => {
    const { data, msg, code, total } = res
    if (code === 11000)
		  orders.value = data
    else
      message.error(msg)
  })
}

onMounted(loadData)
</script>

<template>
  <div>{{ orders }}</div>
</template>
