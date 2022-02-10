<template>
    <el-row>
        <el-col :span="24" >
            <div class="bar" >
              <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1" @click="onClickLoginPage">Home</el-menu-item>
                <el-submenu index="2">
                    <template slot="title">{{menuName}}</template>
                    <el-menu-item index="2-1" @click="onClickSchedulePage">캘린더</el-menu-item>
                    <el-menu-item index="2-2" @click="onClickDiaryPage">일정</el-menu-item>
                    <el-menu-item index="2-3" @click="onClickRecordPage">일기</el-menu-item>
                </el-submenu>
                <div class="menu">
                <el-col :span="16">
                    <div class="name" >
                        <p>{{loginMessage}}</p>
                    </div>
                </el-col>
                    <el-col :span="5">
                        <el-container>
                                    <el-header>
                                    <el-dropdown>
                                        <i class="el-icon-s-tools"></i>
                                        <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item >
                                            <el-button type="info" plain size="medium" @click="onClickLogoutItem">LogOut</el-button>
                                        </el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                    </el-header>
                        </el-container>
                    </el-col>
            </div>
        </el-menu>
            </div>
        </el-col>
    </el-row>
</template>

<script>
export default {
    name: 'MenuBar',
  data() {
    return {
      menuName: 'Menu',

    }
  },
    methods: {
        onClickLoginPage: function() {
          this.menuName='Menu'
          if(window.localStorage.getItem('loggedInUserId')){
            this.$router.push('/schedule');
          } else {
            this.$router.push('/login');
          }
        },
        onClickSchedulePage: function() {
          this.menuName='캘린더'
          this.$router.push('/schedule');
        },
        onClickDiaryPage: function() {
          this.menuName='일정'
          this.$router.push('/diary');
        },
        onClickRecordPage: function() {
          this.menuName='일기'
          this.$router.push('/record');
        },
        onClickLogoutItem: function(){
            window.localStorage.removeItem('loggedInUser');
            this.$router.push('/login');
            location.reload();
        }
    },
    computed:{
        loggedInUser:function(){
            return window.localStorage.getItem('loggedInUser')
        },
        loginMessage:function(){
            if(window.localStorage.getItem('loggedInUser')!==null){
                return this.loggedInUser+' 님 안녕하세요'
            }else{
                return '로그인해주세요'
            }
        }
    }
}
</script>

<style>
.el-icon-s-tools{
    font-size: 30px;
    margin-top:10px;
    cursor:pointer;
}
.menu{
    float: right;
}
</style>
