<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="main_box">
    <div class="login_box">
      <div class="hea">
        <div class="hea_fl">
          <img class="icon" src="../../assets/images/login_box_fd.png" alt="" />
        </div>
        <div class="line"></div>
        <div class="hea_fr">
          <div class="title">后台管理系统</div>
          <div class="desc">management system</div>
        </div>
      </div>
      <div class="login_btn">
        <a class="a_blo" href="/home"> 登录 </a>
      </div>
    </div>
  </div>
</template>
<script>
export default{
  data () {
    return {}
  }
}
</script>
<style lang="less">
.main_box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-size: cover;
  background: url("../../assets/images/denglu.gif") no-repeat left top;
  background-size: cover;
}
.login_box {
  width: 344px;
  height: 188px;
  background: #ffffff;
  border-radius: 5px;
}
.login_btn {
  width: 262px;
  height: 40px;
  background: #ea3f4a;
  border-radius: 6px;
  line-height: 40px;
  margin: 0 auto;
  cursor: pointer;
  text-align: center;
  color: #fff;

  box-sizing: border-box;

  font-size: 16px;
  font-weight: bold;
}
.a_blo {
  display: block;
  width: 100%;
  color: #fff;
  height: 100%;
  text-decoration: none;
}
.a_blo:hover{
  color: #fff;
}

.hea {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px 0 15px 0;
  .hea_fl {
    .icon {
      width: 124px;
      height: 52px;
    }
  }
  .hea_fr{
    .title {
      font-size: 14px;
      font-weight: 500;
      color: #0b0b09;
    }
    .desc {
      font-size: 10px;
      font-weight: 400;
      color: #0b0b09;
    }
  }
  .line{
    margin: 0 12px;
    width: 1px;
    height: 32px;
    background: #0B0B09;
    opacity: 0.3;
  }
}
</style>
