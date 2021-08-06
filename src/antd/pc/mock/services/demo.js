import Mock from 'mockjs'
const Random = Mock.Random

// Mock响应模板
// 第一种写法，直接匹配url，不与请求方法相关联
// 拦截 http://test01.com
const obj = {
  aa: '11',
  bb: '22',
  cc: '33',
  dd: '44'
}

Mock.mock('http://test01.com', {
  code: '000000',
  data: {
    'user|1-3': [
      {
        // 随机生成1到3个数组元素
        name: '@cname', // 中文名称
        'id|+1': 88, // 属性值自动加 1，初始值为88
        'age|18-28': 0, // 18至28以内随机整数, 0只是用来确定类型
        birthday: '@date("yyyy-MM-dd")', // 日期
        city: '@city(true)', // 中国城市
        color: '@color', // 16进制颜色
        'isMale|1': true, // 布尔值
        'isFat|1-2': true, // true的概率是1/3
        'fromObj|2': obj, // 从obj对象中随机获取2个属性
        'fromObj2|1-3': obj, // 从obj对象中随机获取1至3个属性
        'brother|1': ['jack', 'jim'], // 随机选取 1 个元素
        'sister|+1': ['jack', 'jim', 'lily'], // array中顺序选取元素作为结果
        'friends|2': ['jack', 'jim'] // 重复2次属性值生成一个新数组
      },
      {
        gf: '@cname'
      }
    ]
  }
})

// 第二种写法
// 模拟请求写法
// Get请求模版
Mock.mock('http://test02.com', 'get', () =>
  Mock.mock({
    code: '000000',
    data: {
      'list|1-3': [
        {
          name: '@cname',
          id: 88
        }
      ]
    }
  })
)

// Post请求模版
Mock.mock('http://test02.com', 'post', () =>
  Mock.mock({
    code: '000000',
    data: {
      'list|1-3': [
        {
          name: '@cname',
          id: 88
        }
      ]
    }
  })
)

// Post请求模版
const tagsPool = {
  0: 'nice',
  1: 'developer',
  2: 'loser',
  3: 'cool',
  4: 'teacher'
}
Mock.mock('//artemis.com/queryDemoData', 'post', () =>
  Mock.mock({
    code: '000000',
    data: {
      'list|1-10': [
        {
          'key|+1': 0,
          name: '@cname',
          id: '@integer(0, 100)',
          'age|18-28': 0,
          address: '@county(true)',
          'tags|1': ['nice', 'developer', 'loser', 'cool', 'teacher']
        }
      ]
    }
  })
)
