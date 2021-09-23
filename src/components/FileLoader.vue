<template>
  <v-layout>
    <img
      class="preview-item-file"
      :src="uploadedImage"
      alt=""
    />
    <input type="file" ref="filedialog" @change="onFileChange" style="display:none" />
    <v-btn ref="" @click="$refs.filedialog.click()"><v-icon>mdi-image</v-icon></v-btn>
  </v-layout>
</template>

<script>
export default {
  name: 'file_loader',
  data () {
    return {
      uploadedImage: null,
      imgName: ''
    }
  },
  props: {
  },
  watch: {
    counter: function () {

    }
  },
  created () {
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    onFileChange: function (e) {
      const files = e.target.files || e.dataTransfer.files
      this.createImage(files[0])
      this.imgName = files[0].name
    },
    /*
    * lastModified: 1632377586673
      lastModifiedDate: Thu Sep 23 2021 15:13:06 GMT+0900 (日本標準時) {}
      name: "image.jpeg"
      size: 26543
      type: "image/jpeg"
      webkitRelativePath: ""
    * */
    createImage: function (file) {
      console.log(file)
      const reader = new FileReader()
      reader.onload = e => {
        this.uploadedImage = e.target.result
      }
      console.log(file)
      reader.readAsDataURL(file)
    }
  }
}
</script>
