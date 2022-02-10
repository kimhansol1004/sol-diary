<template>
<el-row type="flex"  class="diary-top-margin">
    <el-col :span="1">
            <i class="el-icon-arrow-left"
               :style="{'font-size': '35px', 'cursor': 'pointer', 'color': overPrevColor}"
               @mouseover="overBtn"
               @mouseleave="leaveBtn"
               @click="onClickSchedulePage"
            />
      </el-col>
      <el-col :span="16">
              <span style="font-size:23px">일정 작성</span>
              <el-divider></el-divider>
      <!--상단끝-->
      <!-- 하단 입력-->
        <div class="date-select">
            <el-date-picker
                v-model="formData.date"
                type="date"
                align="right"
                placeholder="날짜를 선택해주세요."
            />
            <el-time-select 
              v-model="formData.time"
              :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30'
              }"
            placeholder="시간을 선택해 주세요">
            </el-time-select>
         </div>

        <el-form ref="form" :rules="rules" model="form"  label-width="120px" class="demo_title">
                <el-form-item label="제목" prop="title"> <!--제목-->
                <el-input v-model="formData.name"  placeholder="제목을 입력하세요"></el-input>
          </el-form-item>

        <el-form-item label="내용" prop="write">  <!-- 내용 입력 -->
                  <el-input type="textarea" v-model="formData.contents" :rows="10"></el-input>
                </el-form-item>

                <el-form-item class="submit"> <!--버튼 가운데 정렬-->
                  <el-button type="primary" @click="handleClickSaveBtn">저장</el-button>  <!-- 저장 버튼 -->
                  <el-button @click="onClickSchedulePage">취소</el-button>
                </el-form-item>
        </el-form>
      </el-col>
</el-row>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import Toastify from 'toastify-js';

export default {
  data(){
    return{
      overPrevColor: 'gray',
      formData:{
        date:'',
        time:'',
        name:'',
        contents:'',
        year:'',
        month:'',
        day:'',
      },
    };
  },
  computed:{
    fromDataForm: function() {
      const formData = Object.assign({}, this.formData);
       formData.date = moment(formData.date).format('yyyy-MM-DD');
        formData.month = (moment(formData.date).month()+1).toString(10);
        formData.year = (moment(formData.date).year()).toString(10);
        formData.day = (moment(formData.date).date()).toString(10);
      return formData;
    }
  },
  methods:{
    overBtn: function() {this.overPrevColor = 'black' },
    leaveBtn: function(){ this.overPrevColor = 'gray' },
    onClickSchedulePage: function() {
        this.$router.push('/schedule');
      },
    handleClickSaveBtn:function(){
      axios.post('http://localhost:3000/schedules',this.fromDataForm )
      Toastify({
        text: "저장되었습니다. 캘린더에서 확인해주세요!'",
        duration: 3000
      }).showToast();
      this.$router.push('/schedule');
    }
  },
}
</script>

<style>
.diary-top-margin{
  margin-top:4%;
  margin-left: 18%;
  color: gray;
}
.submit{
    text-align: center;
}
div .date-select{
    text-align: center;
    margin-top:5%;
    margin: 20px 0px 10px 30px;
}
</style>