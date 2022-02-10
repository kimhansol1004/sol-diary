<template>
  <div class="login">
    <div class="center"  >
      <div>
        <h1 v-bind:style="{ marginTop:'50px' }">Join</h1>
      </div>

      <div class="user">
        <el-input placeholder="Name" v-model="joinForm.name" ></el-input>
        <el-input placeholder="ID" v-model="joinForm.userld" v-bind:style="{ marginTop:'30px' }"></el-input>
        <el-input placeholder="Password" v-model="joinForm.userPwd" show-password v-bind:style="{ marginTop:'30px' }"></el-input>
        <el-input placeholder="Password Check" v-model="joinForm.userPwdCheck" show-password v-bind:style="{ marginTop:'30px' }"></el-input>
      </div>

      <div class="button-login">
        <el-button type="info" plain size="medium" @click="onClickJoinButton">Join</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Toastify from 'toastify-js';

export default {
  name:"joinPage",
  data() {
    return {
      joinForm:{
        name:"",
        userId: "",
        userPwd:'',
        userPwdCheck:""
      }
    }
  },
  computed:{
    computedJoinForm:function(){
      const copy = Object.assign({},this.joinForm)
      copy.userPwdCheck = null;
      return copy;
    }
  },
  methods:{
    onClickJoinButton:async function(){
      alert('버튼')
      axios.post('http://localhost:3000/users',this.computedJoinForm )
      Toastify({
        text: "저장되었습니다.'",
        duration: 3000
      }).showToast();
      this.$router.push('/login');
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
    height: 700px;
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
   div .button-login{
     margin: 40px 0px 0px 43%;
  }
</style>
