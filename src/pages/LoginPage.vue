<template>
  <div class="login">
    <div class="center">
      <div>
        <h1 v-bind:style="{ marginTop:'50px' }">Login</h1>
      </div>

      <div class="user">
        <el-input placeholder="ID" v-model="userld" ></el-input>
        <el-input placeholder="Password" v-model="userPwd" show-password v-bind:style="{ marginTop:'30px' }"></el-input>
      </div>

      <div class="buttonPage-login">
        <el-button type="info" plain size="medium" @click="onClickLoginButton">LOGIN</el-button>
        <el-button type="info" plain size="medium" @click="onClickJoinButton">JOIN</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name:"LoginPage",
  data() {
    return {
      userld: '',
      userPwd:''
    }
  },
  methods:{
    onClickLoginButton:async function(){
      const datas = await axios.get(`http://localhost:3000/users?userId=${this.userld}&userPwd=${this.userPwd}`);
      const users = datas.data;
      if (users.length===1){
        window.localStorage.clear();
        window.localStorage.setItem('loggedInUser',users[0].name)
        window.localStorage.setItem('loggedInUserId',users[0].userId)
        this.$router.push('/schedule');
        location.reload();
      }else{
        alert('다시확인해주세요')
      }
    },
    onClickJoinButton:function(){
      this.$router.push('/join');
    }
  }
}
</script>

<style >
.login{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(45deg, rgb(133, 180, 243),rgb(241, 195, 255));
    }
.center{
    background-color:white;
    width: 500px;
    height: 500px;
    border-radius: 20px;
  }
  .center h1{
    text-align:center;
    font-size: 50px;
  }
  .user{
    width: 400px;
    margin:70px 0px 0px 50px;
  }
  div .buttonPage-login{
    margin: 40px 0px 0px 30%;
  }
</style>
