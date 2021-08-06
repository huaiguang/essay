<template>
  <div>
    <!-- 示例一: 在Group中选中某一项，且不可更改 -->
    <p class="title">普通options生成选择组</p>
    <a-checkbox-group :options="options" :value="['Pear']" @change="onChange" />

    <p class="title">options中带disabled</p>
    <a-checkbox-group v-model="values" disabled :options="optionsWithDisabled" @change="onChange">
      <span class="red" slot="label" slot-scope="{ value }">{{ value }}</span>
    </a-checkbox-group>
  </div>
</template>

<script>
const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' }
]

const optionsWithDisabled = [
  { value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange', disabled: true }
]

export default {
  name: 'Checkbox',
  data() {
    return {
      options,
      optionsWithDisabled,
      values: ['Apple', 'Orange']
    }
  },
  methods: {
    onChange(values) {
      console.log('checked = ', values)
      console.log('value = ', this.values)
    }
  }
}
</script>

<style lang="scss" scoped></style>
