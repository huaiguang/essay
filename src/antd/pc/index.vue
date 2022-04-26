<template>
  <a-layout class="layout-revise">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo"></div>
      <a-menu
        mode="inline"
        theme="dark"
        :inline-collapsed="collapsed"
        :default-selected-keys="defaultSelectedKeys"
        :default-open-keys="defaultOpenKeys"
        @select="selectMenu"
      >
        <a-sub-menu v-for="item in menuTree" :key="item.key">
          <span slot="title">
            <a-icon :type="item.icon"></a-icon>
            <span>{{ item.name }}</span>
          </span>
          <template v-if="item.children && item.children.length > 0">
            <a-menu-item v-for="subItem in item.children" :key="subItem.key">
              {{ subItem.name }}
            </a-menu-item>
          </template>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        ></a-icon>
      </a-layout-header>
      <a-layout-content class="layout-content-revise">
        <router-view :key="routerkey"></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import displayBuildInfoMixin from '@/common/mixins/displayBuildInfoMixin'
import menuTree from './config/menu.js'

export default {
  name: 'Index',
  mixins: [displayBuildInfoMixin],
  data() {
    return {
      routerkey: 'home',
      collapsed: false,
      menuTree,
      defaultSelectedKeys: ['button'],
      defaultOpenKeys: ['general'],
      currentSelectedKey: 'button'
    }
  },
  created() {},
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed
    },
    selectMenu({ item, key, selectedKeys }) {
      console.log(item, key, selectedKeys)
      // 判断是否为当前选中的key
      // 只有部位当前选中的路由才能跳转
      if (this.currentSelectedKey !== key) {
        this.currentSelectedKey = key
        this.$router.push({ name: key })
      }
    }
  }
}
</script>

<style lang="scss">
.logo {
  margin: 16px;
  height: 32px;
  background: #fff3;
  cursor: pointer;
}

.layout-revise {
  height: 100%;
  .trigger {
    padding: 0 10px;
    font-size: 18px;
    line-height: 64px;
    cursor: pointer;
    transition: color 0.3s;
  }

  .trigger:hover {
    color: #1890ff;
  }
}

.layout-content-revise {
  margin: 10px;
  padding: 16px;
  background-color: #fff;
  overflow-y: auto;
}
</style>
