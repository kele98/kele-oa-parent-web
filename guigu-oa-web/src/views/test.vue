<template>
  <div>
    <div>账号切换</div>
    <button @click="zhangsan()" type="default" size="mini">张三</button>
    <button @click="lisi()" type="default" size="mini">李四</button>
    <button @click="zzjl()" type="default" size="mini">张总经理</button>
    <button @click="admin()" type="default" size="mini">admin</button>
    <div>当前token：{{ token }}</div>
  </div>
</template>

<script>
export default {
  name: "Test",

  data() {
    return {
      token: ''
    };
  },

  created(){
    this.token = window.localStorage.getItem('token')
  },

  methods: {
    admin() {
      window.localStorage.setItem('token', '');
      let token = 'eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAAKtWKi5NUrJSSiwtydAtLU4tUtJRykwsUbIyNDO3NDU3NzA10VFKrSiACVhYgARACj1TgGKWEHZeYm4q0JDs1JxUpVoAPIFVT1MAAAA.edB26o589IWCJ1mrL4TqBfKpoltlTJFn7U8pv9CpGeWtoUOSM0-kE-BS7PBVjDXrtHR8d0LVA8oGhcE6u16cdQ'
      window.localStorage.setItem('token', token);
      this.token = window.localStorage.getItem('token')
    },

    zhangsan() {
      window.localStorage.setItem('token', '');
      let token = 'eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAAKtWKi5NUrJSSiwtydAtLU4tUtJRykwsUbIyNDO3NDU3NzQ01lFKrSiACVhYggRACj1TlKyMDCHsvMTcVKAhVRmJeenFiXlKtQDMSNSNVwAAAA.Ie8rHkXu1_qWJiZQToeOb0HpQv2sAHqKWX1IPn7PPdSRzKmDwzeotMtJaNzQ6SPL8uCfIbioeOsx-wmlCdMnJQ'
      window.localStorage.setItem('token', token);
      this.token = window.localStorage.getItem('token')
    },

    zzjl() {
      window.localStorage.setItem('token', '');
      let token = 'eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAAKtWKi5NUrJScgwN8dANDXYNUtJRSq0oULIyNDM3NjMwNLYw11EqLU4t8kxRsjKFMPMSc1OBWqqqsnKUagGHebUNQQAAAA.FcCkD6QfaP8bd_3MYsRD6Tp9wr9JSRFWIUuIdG5O7XxhIeyWfzGLp40_Lesx_kWMMaaskh_ba3NrTlj8-nP6OA'
      window.localStorage.setItem('token', token);
      this.token = window.localStorage.getItem('token')
    },

    lisi() {
      window.localStorage.setItem('token', '');
      let token = 'eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAAKtWKi5NUrJSSiwtydAtLU4tUtJRykwsUbIyNDO3NDU3N7Aw1VFKrSiACVhYgARACj1TlKyMjCDsvMTcVKAhOZnFmUq1ABQtOyNTAAAA.VfsUFYzxd6BIjLFFTIJLbGvP2796iNBUBqQsIWnKQpre9xAT0KpNEqBxlKCcnnOSbjS3AeQA1G56lES8UtvomQ'
      window.localStorage.setItem('token', token);
      this.token = window.localStorage.getItem('token')
    }
  }
}
</script>
