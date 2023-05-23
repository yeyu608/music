<template>
  <div id="listItem">
    <ul>
      <li v-for="(item, index) in listItem" :key="item.id">
        <div class="list-left">
          <h4>{{ listItems[index] }}</h4>
          <p v-for="(item, index) in listItem" :key="item.id">
            {{ index + 1 }}、{{ item.name }}
          </p>
        </div>
        <div class="list-right">
          <img :src="item.picUrl" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { RecommendMusic } from "@/http/api/music";
export default {
  data() {
    return {
      listItem: {},
      listItems: ["飙升榜", "热歌榜", "新歌榜"],
    };
  },
  created() {
    this.getOffice();
  },
  methods: {
    getOffice() {
      if (sessionStorage.getItem("listitem")) {
        this.listItem = JSON.parse(sessionStorage.getItem("listitem"));
      } else {
        RecommendMusic("/personalized/newsong", { limit: 3 }).then((res) => {
          this.listItem = res.data.result;
          sessionStorage.setItem("listitem", JSON.stringify(res.data.result));
        });
      }
    },
  },
};
</script>

<style scoped lang="less">
#listItem {
  ul {
    li {
      height: 500px;
      border: 1px solid #ccc;
      margin: 30px 0;
      border-radius: 50px;
      display: flex;
      justify-content: space-between;
      .list-left {
        padding: 30px;
        h4 {
          margin: 20px 0;
        }
        p {
          font-size: 60px;
          margin: 10px 0;
        }
      }
      .list-right {
        width: 500px;
        height: 500px;
        border-radius: 0 50px 50px 0;
        img {
          width: 100%;
          height: 100%;
          border-radius: 0 50px 50px 0;
        }
      }
    }
  }
}
</style>