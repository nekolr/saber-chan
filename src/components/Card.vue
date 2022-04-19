<template>
  <div class="s-card s-card-bordered">
    <div class="s-card-boby">
      <img
        class="s-card-body-img"
        :src="$serverUrl + '/images/' + image.shortName"
      />
    </div>
    <ul class="icon">
      <li>
        <a href="javascript:void(0)"><font-awesome-icon icon="search" /></a>
      </li>
      <a-tooltip trigger="click" placement="bottom" width="200px">
        <template #title>
          <span>{{ $t("links.successfulCopy") }}</span>
        </template>
        <li>
          <a :id="'copyImage_' + image.id" href="javascript:void(0)">
            <font-awesome-icon icon="link" />
          </a>
        </li>
      </a-tooltip>
    </ul>
    <div class="s-card-content">
      <h3 class="title">{{ image.shortName }}</h3>
      <span class="post">{{ postTime }}</span>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import dayjs from "dayjs";
import ClipboardJS from "clipboard";

export default {
  name: "Card",
  props: ["image"],
  data() {
    return {
      // 将 clipboard 放到属性中，由 vue 进行生命周期的维护
      clipboard: "",
    };
  },
  mounted() {
    var self = this;
    var clipboard = new ClipboardJS("#copyImage_" + self.image.id, {
      text: function () {
        return self.$serverUrl + "/images/" + self.image.shortName;
      },
    });

    // 成功回调
    clipboard.on("success", function (e) {
      e.clearSelection();
    });
    this.clipboard = clipboard;
  },
  computed: {
    postTime: function () {
      return dayjs(this.image.createTime).format("YYYY-MM-DD HH:mm:ss");
    },
  },
  methods: {
    ...mapMutations("links", {
      setLink: "setLink",
      setWrappedLink: "setWrappedLink",
      setShowLinks: "setShowLinks",
      setOriginType: "setOriginType",
      setHtmlType: "setHtmlType",
      setMarkdownType: "setMarkdownType",
    }),
  },
  destroyed() {
    this.clipboard.destroy();
  },
};
</script>

<style>
.s-card {
  text-align: center;
  width: 250px;
  height: 250px;
  margin: 5px;
  background: #fff;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.2s ease-in-out;
  overflow: hidden;
  position: relative;
}

.s-card::before {
  content: "";
  width: 150%;
  height: 150%;
  position: absolute;
  top: 50%;
  left: 50%;
  background-size: 32px 32px;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  z-index: 1;
  transform: translate(-50%, -50%) scale(0);
  transition: all 0.56s ease 0s;
}

.s-card:hover:before {
  opacity: 1;
  border-radius: 4px;
  transform: translate(-50%, -50%) scale(1);
}

.s-card:hover {
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  border-color: #eee;
  opacity: 1;
  border-radius: 4px;
  transform: translateY(0);
}

.s-card-bordered {
  border: 1px solid #dcdee2;
  border-color: #e8eaec;
}

.s-card .icon {
  padding: 0;
  margin: 0;
  list-style: none;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  transform: translate(-50%, -50%);
  transition: all 0.3s ease 0s;
}

.s-card .icon li {
  display: inline-block;
  margin: 0 7px;
  transform: rotateX(90deg);
  transition: all 0.3s ease 0s;
}

.s-card .icon li:last-child {
  transition-delay: 0.2s;
}

.s-card:hover .icon li {
  transform: rotateX(0);
}

.s-card .icon li a {
  display: block;
  width: 35px;
  height: 35px;
  line-height: 35px;
  border-radius: 5px;
  background: #fff;
  font-size: 17px;
  color: #505050;
  z-index: 6;
  transition: all 0.3s ease 0s;
}

.s-card .icon li a:hover {
  background: #47ddc8;
  box-shadow: 0 0 10px #000;
  color: #fff;
}

.s-card-body {
  padding: 16px;
}

.s-card:hover .s-card-body-img {
  transform: scale(1.3);
}

.s-card-body-img {
  border-style: none;
  max-width: 220px;
  max-height: 220px;
  transition: all 0.3s ease 0s;
}

.s-card .s-card-content {
  width: 100%;
  position: absolute;
  bottom: 5px;
  left: 0;
  z-index: 1;
  transition: all 0.3s ease 0s;
}

.s-card .title {
  font-size: 22px;
  font-weight: 600;
  color: #47ddc8;
  text-transform: uppercase;
  text-shadow: 0 0 2px #000;
  opacity: 0;
  margin: 0 0 5px 0;
  position: relative;
  transform: translateY(100%);
  transition: all 0.5s ease 0s;
}
.s-card:hover .title {
  opacity: 1;
  transform: translateY(0);
}
.s-card .post {
  display: block;
  font-size: 14px;
  font-style: italic;
  color: #fff;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 5px;
  transform: translateX(-100%) rotateX(90deg);
  transition: all 0.5s ease 0s;
}

.s-card:hover .post {
  transform: translateY(0) rotate(0);
}
</style>

