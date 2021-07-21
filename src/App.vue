<template>
  <div id="app">
    <h1 class="title">台灣水庫即時水情</h1>
    <div class="flex container mx-auto">
      <div class="space" v-for="(item, index) in data" :key="index">
        <h2 class="name">{{ item.name }}</h2>
        <div :class="color(item.percentage)">
          <div class="white">
            <div class="percentage">
              <p class="big_num">{{ item.percentage.toFixed(1) }}%</p>
            </div>
          </div>
        </div>
        <div class="text">
          <p class="available">有效蓄水量：{{ item.volumn }} 萬立方公尺</p>
          <span v-if="culcuate(index) === 'NaN'"><p class="update">--</p></span>
          <span v-else-if="culcuate(index) > 0"
            ><p class="update blue">
              昨日水量上升：{{ culcuate(index) }}%
            </p></span
          >
          <span v-else
            ><p class="update red">
              昨日水量下降：{{ culcuate(index).substring(1) }}%
            </p></span
          >

          <p class="time">{{ item.updateAt }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      data: [],
    };
  },
  created() {
    this.$http.get("https://www.taiwanstat.com/waters/latest").then((res) => {
      this.data = res.data[0];
    });
  },
  methods: {
    culcuate(index) {
      let num = 0;
      num = (
        (this.data[index].daliyNetflow / this.data[index].baseAvailable) *
        100
      ).toFixed(2);
      return num;
    },
    color(percentage) {
      if (percentage < 25) {
        return "border_red";
      } else if (percentage < 50) {
        return "border_orange";
      } else {
        return "border_blue";
      }
    },
  },
};
</script>

<style lang="scss">
$red: #eb544d;
$orange: #f2a57f;
$blue: #4188c5;
* {
  font-family: sans-serif;
  box-sizing: border-box;
}

.container {
  max-width: 1200px;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.flex {
  display: flex;
  flex-wrap: wrap;
}
.space {
  width: 23%;
  margin: 1%;
}
.name,
.percentage,
.title {
  text-align: center;
}

.update,
.available,
.time {
  margin: 0.5rem 0;
}
.time {
  color: #666;
}
.text {
  padding: 0.5rem;
}
.blue {
  color: #4188c5;
}

.red {
  color: #eb544d;
}
.name {
  font-size: 24px;
}
.title {
  font-size: 32px;
}

.percentage {
  font-size: 60px;
}

.big_num::before {
  content: "";
  height: 2.7rem;
  display: block;
}
.white {
  width: 265px;
  height: 265px;
  border-radius: 50%;
  border: 5px solid white;
  position: absolute;
}

.border_red {
  width: 275px;
  height: 275px;
  border-radius: 50%;
  border: 5px solid #eb544d;
  color: #eb544d;
  position: relative;
  overflow: hidden;

  &:before,
  &:after {
    content: "";
    position: absolute;
    left: 50%;
    min-width: 300%;
    min-height: 300%;
    background-color: #eb544d;
    animation-name: rotate;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    z-index: -1;
  }

  &:before {
    top: 80%;
    border-radius: 45%;
    animation-duration: 9s;
  }

  &:after {
    top: 77%;
    opacity: 0.5;
    border-radius: 47%;
    animation-duration: 10s;
  }
}

.border_orange {
  width: 275px;
  height: 275px;
  border-radius: 50%;
  border: 5px solid #f2a57f;
  color: #f2a57f;
  position: relative;
  overflow: hidden;
  &:before,
  &:after {
    content: "";
    position: absolute;
    left: 50%;
    min-width: 300%;
    min-height: 300%;
    background-color: #f2a57f;
    animation-name: rotate;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    z-index: -1;
  }

  &:before {
    top: 70%;
    opacity: 0.9;
    border-radius: 45%;
    animation-duration: 9s;
  }

  &:after {
    top: 67%;
    opacity: 0.5;
    border-radius: 47%;
    animation-duration: 10s;
  }
}

.border_blue {
  width: 275px;
  height: 275px;
  border-radius: 50%;
  border: 5px solid #4188c5;
  color: #225b9c;
  position: relative;
  overflow: hidden;
  &:before,
  &:after {
    content: "";
    position: absolute;
    left: 50%;
    min-width: 300%;
    min-height: 300%;
    background-color: #4188c5;
    animation-name: rotate;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    z-index: -1;
  }

  &:before {
    top: 50%;
    opacity: 0.8;
    border-radius: 45%;
    animation-duration: 9s;
  }

  &:after {
    top: 47%;
    opacity: 0.5;
    border-radius: 47%;
    animation-duration: 10s;
  }
}

@keyframes rotate {
  0% {
    transform: translate(-50%, 0) rotateZ(0deg);
  }
  50% {
    transform: translate(-50%, -2%) rotateZ(180deg);
  }
  100% {
    transform: translate(-50%, 0%) rotateZ(360deg);
  }
}
</style>
