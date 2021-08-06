<template>
  <a-table :columns="columns" :data-source="data">
    <!-- 渲染内容 -->
    <a slot="name" slot-scope="text">{{ text }}</a>
    <!-- 渲染标题 -->
    <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
    <!-- 渲染内容 -->
    <span slot="tags" slot-scope="tags">
      <template v-if="Array.isArray(tags)">
        <a-tag
          v-for="tag in tags"
          :key="tag"
          :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
        >
          {{ tag.toUpperCase() }}
        </a-tag>
      </template>
      <template v-else>
        <a-tag :color="tags === 'loser' ? 'geekblue' : 'green'">{{ tags.toUpperCase() }}</a-tag>
      </template>
    </span>
    <!-- 渲染内容 -->
    <span slot="action" slot-scope="text, record">
      <a>Invite 一 {{ record.name }}</a>
      <a-divider type="vertical" />
      <a>Delete</a>
      <a-divider type="vertical" />
      <a class="ant-dropdown-link">More actions<a-icon type="down" /></a>
    </span>
  </a-table>
</template>

<script>
const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'name' }
  },
  {
    dataIndex: 'age',
    key: 'age',
    title: 'Age'
  },
  {
    dataIndex: 'address',
    key: 'address',
    title: 'Address'
  },
  {
    dataIndex: 'tags',
    key: 'tags',
    title: 'Tags',
    scopedSlots: { customRender: 'tags' }
  },
  {
    key: 'action',
    title: 'Action',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  data() {
    return {
      data: [],
      columns
    }
  },
  created() {
    this.getDemoData()
  },
  methods: {
    getDemoData() {
      this.$post('//artemis.com/queryDemoData', {})
        .then(res => {
          console.log('res', res.data)
          const data = res.data.list
          this.data = data
        })
        .catch(error => {
          console.log('error', error)
        })
    }
  }
}
</script>
