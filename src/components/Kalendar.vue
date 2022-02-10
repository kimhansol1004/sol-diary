<template>
<div>
  <div class="input-parent">
      <el-col :span="19">
          <el-radio-group v-model="selectedTimeLine" class="radio-group">
            <el-radio-button size="small" label="list"><i class="el-icon-tickets"></i></el-radio-button>
            <el-radio-button size="small" label="card"><i class="el-icon-menu"></i></el-radio-button>
          </el-radio-group>
          <el-button title="일정페이지 이동" size="medium" class="el-icon-collection" @click="onClickDiaryPage" circle></el-button>
          <el-button title="일기페이지 이동" size="medium" class="el-icon-edit" @click="onClickRecordPage" circle></el-button>

      </el-col>

    <el-input placeholder="검색하세요." v-model="scheduleSearchValue" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="handleClickSearchBtn" />
      </el-input>
  </div>
  <div>
      <el-calendar v-model="calendarValue">
        <template
            slot="dateCell"
            slot-scope="{data}">
            <div @dblclick="moveToDiary(data)"  @click="handleClickDiary(data)" style="height: 100%  ">
                {{checkDiary(data.day.split('-')[2].replace(/(^0+)/, ""), data.day.split('-')[1].replace(/(^0+)/, ""))}}
                {{checkSchedule(data.day.split('-')[2].replace(/(^0+)/, ""), data.day.split('-')[1].replace(/(^0+)/, ""))}}
              <p :class="data.isSelected ? 'is-selected' : ''" >
                {{data.day.split('-')[2].replace(/(^0+)/, "")}}
              </p>
            </div>
        </template>
      </el-calendar>
  </div>
  <div id="daily-schedule-list">
    <div v-if="selectedTimeLine === 'list'">
      <div v-for="(model, index) in scheduleModels " :key="index">
        <el-timeline>
          <el-timeline-item :timestamp="model.date + model.time" placement="top">
            <el-card>
              <h4>{{model.date}}</h4>
              <p>{{model.contents}}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
        </div>
        <!-- "date": "2021-12-11",
      "time": "09:00",
      "name": "01",
      "contents": "01", -->

    </div>
    <div v-else>
      <el-row :gutter="12">
        <el-col :span="8" v-for="(model,index) in scheduleModels " :key="index" >
          <el-card>
            <h4>{{model.date}}</h4>
            <p>{{model.contents}}</p>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  async mounted() {
      this.loadMarkers(new Date());
  },

  data: () => {
      return {
        calendarValue: new Date(),
        loadDiaries: [],
        loadSchedules:[],
        value: new Date(),
        scheduleSearchValue: '',
        handleClickSearchBtn: () => {
          alert('내용을 입력해주세요')
        },
        selectedTimeLine: 'list',
      }
    },
  watch: {
        calendarValue: function() {
          this.loadMarkers(this.calendarValue);
        }
    },
  created() {
    this.init()
  },
    methods: {
      loadMarkers: async function (date) {
        const datas = await axios.get(`http://localhost:3000/diaries?year=${date.getFullYear()}&month=${date.getMonth() + 1}`);
        this.loadDiaries = datas.data;
        const schedules = await axios.get(`http://localhost:3000/schedules?year=${date.getFullYear()}&month=${date.getMonth() + 1}`);
        this.loadSchedules = schedules.data;
      },
      moveToDiary: async function (data) {
        const day = data.day; //2021-10-23
        const target = await axios.get(`http://localhost:3000/diaries?diaryDate=${day}`);

        if (target.data.length !== 0) {
          this.$router.push(`/record/${day}`)
        } else {
          alert("선택한 날짜에 일기 없습니다.")
        }
      },
      handleClickDiary: async function (data) { //일정
        const day = data.day;
        const target = await axios.get(`http://localhost:3000/schedules?date=${day}`);
        this.scheduleModels = target.data;
      },
      checkDiary: function (calendarDate, calendarMonth) {
        if (this.loadDiaries.find(({day, month}) => day === calendarDate && calendarMonth === month)) {
        // if (this.loadDiaries.find((diary) => diary.day === calendarDate && calendarMonth === diary.month)) {
          return '♥';
        } else {
          return '';
        }
      },
      checkSchedule: function (calendarDate, calendarMonth) {
        if (this.loadSchedules.find(({day, month}) => day === calendarDate && calendarMonth === month)) {
          return '♡';
        } else {
          return '';
        }
      },
      onClickRecordPage: function () {
        this.$router.push('/record');
      },
      onClickDiaryPage: function () {
        this.$router.push('/diary');
      }
    }
}
</script>

<style>
  #daily-schedule-list {
    margin-top: 2%;
  }
  .input-parent {
    display: flex;
    margin-top: 2%;
    margin-bottom: 10px;
  }
  .input-with-select {
    width: 400px;
    margin-left: auto;

  }
   .el-icon-edit{
    background-color: #b7b4f7;
    color:white;
  }
   .el-icon-collection{
     background-color: #b7b4f7;
     color:white;
   }
   .el-icon-edit:hover{
    color:black;
  }
  .radio-group{
    margin-right: 20px;
  }
</style>
