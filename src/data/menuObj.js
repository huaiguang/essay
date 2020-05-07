// menus
const menuObj = {
  "lago": {
    "key": '1',
    "available": false,
    "name": "LAGO主页",
    "disabled": false,
  },
  "globalaccount": {
    "key": '2',
    "available": false,
    "name": "全球收款",
    "disabled": false,
    "submenus": {
      "shops": {
        "key": "2.1",
        "available": false,
        "name": "店铺管理",
      },
      "withdraw": {
        "key": "2.2",
        "available": false,
        "name": "店铺提现",
      }
    }
  },
  "companycenter": {
    "key": "3",
    "available": false,
    "name": "商户中心",
    "disabled": false,
    "submenus": {
      "info": {
        "key": "3.1",
        "available": false,
        "name": "商户信息",
      },
      "contract": {
        "key": "3.2",
        "available": false,
        "name": "联系人信息",
      },
      "operator": {
        "key": "3.3",
        "available": false,
        "name": "操作员管理",
      },
      "role": {
        "key": "3.4",
        "available": false,
        "name": "角色管理",
      },
      "loginInfo": {
        "key": "3.5",
        "available": false,
        "name": "修改登录信息",
      },
      "payPwd": {
        "key": "3.6",
        "available": false,
        "name": "设置交易密码",
      },
      "cashCard": {
        "key": "3.7",
        "available": false,
        "name": "提现卡管理",
      }
    }
  },
  "check": {
    "key": "4",
    "available": false,
    "name": "对账管理",
    "disabled": false,
    "submenus": {
      "monthsatement": {
        "key": "4.1",
        "available": false,
        "name": "月结单下载",
      },
      "receipt": {
        "key": "4.2",
        "available": false,
        "name": "回单下载",
      },
      "shoptrade": {
        "key": "4.3",
        "available": false,
        "name": "店铺资金明细查询",
      },
      "tradedetail": {
        "key": "4.4",
        "available": false,
        "name": "交易明细查询",
      },
      "wallet": {
        "available": false,
        "key": "4.5",
        "name": "钱包资金明细查询",
      }
    }
  }
};