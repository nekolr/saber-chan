<template>
  <div class="uploader-links-container" v-show="showShare">
    <div class="links-container">
      <div class="uploader-links-panel">
        <div class="panel-heading">
          <a-button size="middle" @click="cancelShowShare">{{ $t('links.cancel') }}</a-button>&nbsp;
          <a-tooltip placement="topLeft" trigger="click" color="blue">
            <template #title>
              <span>{{ $t('links.successfulCopy') }}</span>
            </template>
            <a-button size="middle" class="copy_button" data-clipboard-target="#link">{{ $t('links.copy') }}</a-button>
          </a-tooltip>
        </div>
        <div class="panel-body">
          <div class="links-left">
            <a-space direction="vertical" size="0">
              <a-button :type="originType" block @click="handleOrigin">{{ $t('links.origin') }}</a-button>
              <a-button :type="htmlType" block @click="handleHtml">HTML</a-button>
              <a-button :type="markdownType" block @click="handleMarkdown">Markdown</a-button>
            </a-space>
          </div>
          <div class="links-right">
            <a-textarea id="link" :rows="4" v-model:value="wrappedLink" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"
import ClipboardJS from 'clipboard'

var clipboard = new ClipboardJS('.copy_button')
// 成功回调
clipboard.on('success', function(e) {
    e.clearSelection();
})

export default {
  name: "Share",
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters("links", {
      link: 'getLink',
      wrappedLink: 'getWrappedLink',
      showShare: 'getShowShare',
      originType: 'getOriginType',
      htmlType: 'getHtmlType',
      markdownType: 'getMarkdownType'
    })
  },
  methods: {
    ...mapMutations('links', {
      setShowShare: 'setShowShare',
      setWrappedLink: 'setWrappedLink',
      setOriginType: 'setOriginType',
      setHtmlType: 'setHtmlType',
      setMarkdownType: 'setMarkdownType'
    }),
    cancelShowShare () {
        // 隐藏分享组件
        this.setShowShare(false)
        // 移除选中状态
        var items = window.document.querySelectorAll(".filepond--item")
        for (var i = 0; i < items.length; i++) {
            items[i].classList.remove("selected")
        }
    },
    handleOrigin () {
        this.setOriginType('primary')
        this.setHtmlType('default')
        this.setMarkdownType('default')
        // 修改链接值
        this.setWrappedLink(this.$serverUrl + "/images/" + this.link)
    },
    handleHtml () {
        this.setOriginType('default')
        this.setHtmlType('primary')
        this.setMarkdownType('default')
        // 修改链接值
        this.setWrappedLink('<img src="' + this.$serverUrl + '/images/"' + this.link + '>')
    },
    handleMarkdown () {
        this.setOriginType('default')
        this.setHtmlType('default')
        this.setMarkdownType('primary')
        // 修改链接值
        this.setWrappedLink('![](' + this.$serverUrl + '/images/' + this.link + ')')
    }
  }
}
</script>

<style>
.uploader-links-container {
  position: fixed;
  bottom: 4.8em;
  z-index: 999;
  right: 0;
  left: 0;
  height: 16.5em;
  font-size: 14px;
}

@media (min-width: 768px) {
  .links-container {
    width: 600px;
  }
}

@media (min-width: 992px) {
  .links-container {
    width: 800px;
  }
}

@media (min-width: 1200px) {
  .links-container {
    width: 1100px;
  }
}

.links-container {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

.uploader-links-panel {
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 4px;
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  margin-bottom: 0px !important;
  border-color: #ddd;
  height: 16.5em;
}

.uploader-links-panel > .panel-heading {
  color: #333;
  background-color: #f5f5f5;
  border-color: #ddd;
}

.panel-heading {
  padding: 10px 15px;
  border-bottom: 1px solid transparent;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}

.panel-body {
  padding: 15px;
}

.links-left {
  margin-left: 15px;
  margin-right: 15px;
}

.links-right {
  width: calc(100% - 30%);
}

.links-left,
.links-right {
  float: left;
}
</style>
