<template>
    <el-row type="flex"  class="content-top-margin">
        <el-col>
            <el-col :span="1">
            <i
                class="el-icon-arrow-left"
                :style="{'font-size': '35px', 'cursor': 'pointer', 'color': overPrevColor}"
                @mouseover="overPrevBtn"
                @mouseleave="leavePrevBtn"
                @click="onClickSchedulePage"
            />
            </el-col>
            <el-col :span="16">
            <span style="font-size:23px">일기 작성{{isUpdate ? '(수정)' : ''}}</span>
            <el-divider></el-divider>
        <!--상단끝-->
        <!-- 하단 입력-->
        <div class="block">
            <el-date-picker
                v-model="diaryForm.diaryDate"
                type="date"
                align="right"
                start-placeholder="날짜를 선택해주세요."
            />
         </div>

         <el-form ref="form" :rules="rules" model="form"  label-width="120px" class="demo_title">
                <el-form-item label="제목" prop="title"> <!--제목-->
                <el-input v-model="diaryForm.name"  placeholder="제목을 입력하세요"></el-input>
            </el-form-item>

        <el-form-item label="날씨" prop="weather-click">
        <el-radio-group v-model="diaryForm.weather"> <!--날씨-->
                    <el-radio-button label="sunny" ><i class="el-icon-sunny"></i></el-radio-button>
                    <el-radio-button label="cloudy"><i class="el-icon-cloudy"></i></el-radio-button>
                    <el-radio-button label="heavy-rain"><i class="el-icon-heavy-rain"></i></el-radio-button>
                    <el-radio-button label="light-rain"><i class="el-icon-light-rain"></i></el-radio-button>
            </el-radio-group>
                </el-form-item>

                <el-form-item label="기분" prop="feel">   <!-- 기분 -->
                  <el-select v-model="diaryForm.feeling" placeholder="기분을 선택하세요">
                    <el-option label="기쁨" value="happy"></el-option>
                    <el-option label="우울" value="blue"></el-option>
                    <el-option label="화남" value="angry"></el-option>
                  </el-select>
                </el-form-item>

                 <el-form-item label="내용" prop="write">  <!-- 내용 입력 -->
                  <el-input type="textarea" v-model="diaryForm.contents" :rows="10"></el-input>
                </el-form-item>

                <el-form-item class="submit"> <!--버튼 가운데 정렬-->
                    <el-button 
                      v-if="isUpdate===true"
                      type="primary"
                      @click="handleClickSaveBtn('UPDATE')"
                      >
                      업데이트
                      </el-button>  <!-- 수정 버튼 -->
                    <el-button
                      v-else
                      type="primary"
                      @click="handleClickSaveBtn('INSERT')"
                     >
                     신규등록
                     </el-button>  <!-- 저장 버튼 -->
                  <el-button @click="onClickSchedulePage">취소</el-button>
                </el-form-item>
                </el-form>
            </el-col>
        </el-col>
    </el-row>
</template>

<script>

import axios from "axios";
import moment from "moment";
import Toastify from 'toastify-js';

export default {
    name:'Write',
    async mounted() {
      const diaryDate = this.$route.params.id;

      if(diaryDate) {
        this.isUpdate = true;

      const foundDiary = await this.findDiary(diaryDate);
      if(foundDiary.data.length === 0) {
        this.$router.push("/schedule");
      } else {
        const diary = foundDiary.data[0];
        this.diaryForm = diary;
      }
      }
    },
    data(){
        return{
          isUpdate: false,
          overPrevColor: 'gray',
          diaryForm:{
            diaryDate: new Date(),
            name: '',
            weather: '',
            feeling: '',
            contents: '',
            year:'',
            month:'',
            day:'',
            id:""
          }
        };
    },
    computed: {
      formattedDiaryForm: function() {
        const formatted = Object.assign({}, this.diaryForm);
        formatted.diaryDate = moment(formatted.diaryDate).format('yyyy-MM-DD');
        formatted.month = (moment(formatted.diaryDate).month()+1).toString(10);
        formatted.year = (moment(formatted.diaryDate).year()).toString(10);
        formatted.day = (moment(formatted.diaryDate).date()).toString(10);
        return formatted;
      }
    },
    methods:{
      clearForm: function() {
        this.diaryForm = {
          diaryDate: new Date(),
          name: '',
          weather: '',
          feeling: '',
          contents: ''
        }
      },
      overPrevBtn: function() {this.overPrevColor = 'black' },
      leavePrevBtn: function(){ this.overPrevColor = 'gray' },
      handleClickSaveBtn: async function(type) {
        if(type === 'UPDATE') {
          const response = await this.checkExistDiary();
          await this.updateDiary(response.data[0].id);
        }
        if(type === 'INSERT') {
          const returnValue = await this.checkExistDiary();
          if(returnValue.data.length > 0) {
            alert('해당 날짜의 일기가 있습니다.')
          } else {
            await this.saveDiary();
          }
        }
        this.$router.push('/schedule');
      },
      findDiary: function(targetDate) {
        return axios.get(`http://localhost:3000/diaries?diaryDate=${targetDate}`)
      },
      checkExistDiary: function() {
        return axios.get(`http://localhost:3000/diaries?diaryDate=${this.formattedDiaryForm.diaryDate}`);
      },
      saveDiary: async function() {
        await axios.post(`http://localhost:3000/diaries`, this.formattedDiaryForm);
        Toastify({
          text: "저장되었습니다. 캘린더에서 확인해주세요!'",
          duration: 3000
      }).showToast();
        this.clearForm();
      },
      updateDiary: async function(id) {
        await axios.put(`http://localhost:3000/diaries/${id}`, this.formattedDiaryForm);
        Toastify({
          text: "업데이트되었습니다. 캘린더에서 확인해주세요!'",
          duration: 3000
        }).showToast();
        this.clearForm();
      },
      onClickSchedulePage: function() {
        this.$router.push('/schedule');
      }
    }
}
</script>

<style scoped>
.content-top-margin{
  margin-top:4%;
  margin-left: 18%;
  color: gray;
}
.submit{
    text-align: center;
}
div .block{
    text-align: center;
    margin-top:5%;
    margin: 20px 0px 10px 0px;
}
</style>
