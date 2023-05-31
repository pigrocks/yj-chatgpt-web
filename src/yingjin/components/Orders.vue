<script lang='ts' setup>
import { reactive, ref, watch } from 'vue'
import { NDataTable, NPagination, useMessage } from 'naive-ui'
import { orderList } from '@/yingjin/api'

const orders = ref([])
const order = ref()
const message = useMessage()
const total = ref(0)
const accessKey = localStorage.getItem('accessKey') as string

const showModal = ref(false)

const params = reactive({
  accessKey,
  pageNo: 1,
  pageSize: 10,
  payWay: undefined,
})

watch(params, loadData, { immediate: true })

function showDetail(o) {
  order.value = o
  showModal.value = true
  // 发现数据是一样的，没必要再查询一次了
  /*
  orderDetail({ orderNo: order.orderNo, accessKey: order.accessKey }).then((res) => {
    console.log(res)
    const { data, msg, code, total } = res
    if (code === 11000)
  	  order.value = data
    else
      message.error(msg)
  })
	*/
}

function loadData() {
  orderList({ ...params, pageNo: params.pageNo - 1 }).then((res) => {
    const { data, msg, code, total: t } = res
    if (code === 11000) {
		  orders.value = data
      total.value = t
    }
    else { message.error(msg) }
  })
}

const columns = [
  {
    title: '订单号',
    key: 'orderNo',
    width: '21%',
  },
  {
    title: '支付时间',
    key: 'payTime',
    width: '15%',
  },
  {
    title: '金额',
    key: 'amount',
    render(_, index) {
      return `${_.amount}美元/${_.payAmount}人民币`
    },
    width: '15%',
  },
  {
    title: '充值前',
    key: 'beforeAmount',
    render(_, index) {
      return `${_.beforeAmount}美元`
    },
    width: '12%',
  },
  {
    title: '充值后',
    key: 'afterAmount',
    render(_, index) {
      return `${_.afterAmount}美元`
    },
    width: '12%',
  },
  {
    title: '支付场景',
    key: 'payWay',
    render(_, index) {
      return payWayHash[_.payWay]
    },
    width: '12%',
  },
]

const payWayHash = {
  1: 'PC',
  2: 'H5',
  3: 'WX',
}
</script>

<template>
  <NDataTable :columns="columns" :data="orders" :scroll-x="800" />
  <div class="my-3 justify-right flex">
    <NPagination
      v-model:page="params.pageNo"
      v-model:pageSize="params.pageSize"
      :item-count="total"
      :page-sizes="[10, 20, 30, 40]"
      show-size-picker
    />
  </div>
</template>
