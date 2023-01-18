<template>
  <div class="content">
    <file-pond
      name="image"
      ref="pond"
      label-idle="<svg aria-hidden='true' width='26' height='26' viewBox='0 0 26 26' xmlns='http://www.w3.org/2000/svg'><g><path fill='none' d='M0 0h24v24H0z'/><path fill='#a1b1c1' d='M3 19h18v2H3v-2zM13 5.828V17h-2V5.828L4.929 11.9l-1.414-1.414L12 2l8.485 8.485-1.414 1.414L13 5.83z'/></g></svg>"
      :label-file-processing="$t('upload.loading')"
      :label-tap-to-cancel="$t('upload.tapToCancel')"
      :label-file-processing-error="$t('upload.uploadError')"
      :label-tap-to-retry="$t('upload.tapToRetry')"
      :label-tap-to-undo="$t('upload.tapToUndo')"
      :label-file-type-not-allowed="$t('upload.fileTypeNotAllowed')"
      :label-file-processing-complete="$t('upload.fileProcessingComplete')"
      :file-validate-type-label-expected-types="
        $t('upload.expectedTypes', { allTypes: '{allTypes}' })
      "
      :label-max-file-size-exceeded="$t('upload.maxFileSizeExceeded')"
      :label-max-file-size="$t('upload.maxFileSize')"
      :max-file-size="10 * 1024 * 1024"
      allow-multiple="true"
      accepted-file-types="image/jpeg, image/png, image/gif, image/svg+xml"
      v-bind:files="files"
      v-on:processfile="handleProcessFile"
    />
  </div>
</template>

<script>
import vueFilePond, { setOptions } from "vue-filepond";
import { mapMutations } from "vuex";
import { getToken } from "@/utils/token";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Import image plugins
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileRename from "filepond-plugin-file-rename";

// Create FilePond component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize,
  FilePondPluginFileRename,
  FilePondPluginImagePreview
);

export default {
  name: "ImageUpload",
  data: function () {
    return {
      files: [],
    };
  },
  created() {
    // 配置 filepond
    setOptions({
      server: {
        url: this.$serverUrl,
        process: {
          url: "/api/upload",
          method: "POST",
          withCredentials: false,
          headers: {
            Authorization: "Bearer " + getToken(),
          },
        },
      },
    });
  },
  methods: {
    ...mapMutations("links", {
      setLink: "setLink",
      setWrappedLink: "setWrappedLink",
      setShowShare: "setShowShare",
      setOriginType: "setOriginType",
      setHtmlType: "setHtmlType",
      setMarkdownType: "setMarkdownType",
    }),
    // 处理图片上传
    handleProcessFile(error, file) {
      var self = this;
      if (!error) {
        window.document
          .querySelector("#filepond--item-" + file.id)
          .addEventListener("click", function () {
            // 显示分享组件
            self.setShowShare(true);
            self.setLink(file.serverId);
            self.setWrappedLink(self.$serverUrl + "/images/" + file.serverId);
            // 设置选中的链接格式
            self.setOriginType("primary");
            self.setHtmlType("default");
            self.setMarkdownType("default");
            // 处理图片选中
            self.handleSelected(this);
          });
      }
    },
    // 处理图片选中的效果
    handleSelected(el) {
      var items = Array.prototype.filter.call(
        el.parentNode.children,
        function (child) {
          return child !== el;
        }
      );
      for (var i = 0; i < items.length; i++) {
        items[i].classList.remove("selected");
      }
      if (el.classList.contains("selected")) {
        el.classList.remove("selected");
        this.setShowShare(false);
      } else {
        el.classList.add("selected");
        this.setShowShare(true);
      }
    },
  },
  components: {
    FilePond,
  },
};
</script>

<style>
@media (min-height: 768px) {
  .content {
    height: 630px;
  }
}

@media (min-height: 992px) {
  .content {
    height: 760px;
  }
}

@media (min-height: 1200px) {
  .content {
    height: 860px;
  }
}

.content {
  margin: 0 auto;
  margin-top: calc(100% - 90%);
}

.filepond--root {
  box-sizing: initial;
  max-width: 60em;
  max-height: 30em;
  margin: 0 auto;
  border: 1px dashed rgba(0, 0, 0, 0.24);
  border-radius: 0.5em;
}

.filepond--panel-root {
  background-color: #f3f6f6;
}

[data-filepond-item-state*="error"] .filepond--item-panel,
[data-filepond-item-state*="invalid"] .filepond--item-panel {
  /* background: linear-gradient(-90deg, #fb88b8, #ef5b5b); */
  background-color: #fd826d;
}

[data-filepond-item-state="processing-complete"] .filepond--item-panel {
  background-color: #2da942;
}

.filepond--image-preview-overlay-failure {
  color: #fd826d;
}

.filepond--image-preview-overlay-success {
  color: #2da942;
}

.filepond--file-status .filepond--file-status-sub {
  color: #ffffff;
  opacity: 0.8;
}

/* file item 选中样式 */
.filepond--list li.selected {
  background: #ffffff;
  border: 2px dashed #a6a6a7;
  border-radius: 0.5em;
}
</style>

