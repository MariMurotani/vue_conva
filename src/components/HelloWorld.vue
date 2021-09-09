<template>
  <v-stage ref="stage" :config="configKonva">
    <v-layer>
      <v-circle :config="configCircle"></v-circle>
      <v-text id="text_example1" ref="text_example1" :config="configText"></v-text>
      <v-line ref="anim_example1" @mousemove="handleMouseMove" :config="{
        x: 20,
        y: 200,
        points: [0, 0, 100, 0, 100, 100],
        tension: 0.5,
        closed: true,
        stroke: 'black',
        fillLinearGradientStartPoint: { x: -50, y: -50 },
        fillLinearGradientEndPoint: { x: 50, y: 50 },
        fillLinearGradientColorStops: [0, 'red', 1, 'yellow'],
      }"/>
    </v-layer>
  </v-stage>
</template>

<script>
import Konva from 'konva'

export default {
  data () {
    return {
      configKonva: {
        width: 600,
        height: 800
      },
      configCircle: {
        x: 100,
        y: 100,
        radius: 70,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 4
      },
      configText: {
        text: 'hover your mouse on images'
      },
      blur: 1
    }
  },
  created () {
    console.log("It's called after created vue instances")
  },
  mounted () {
    const self = this
    Konva.Image.fromURL('https://konvajs.org/assets/yoda.jpg', function (yoda) {
      // Nodeからステージを取得
      // const transformerNode = self.$refs.anim_example1.getNode()
      // const stage = transformerNode.getStage()

      // refsからstageを取得
      const stage = self.$refs.stage.getStage()

      var layer = new Konva.Layer()
      //  idを付与するとfindできる
      yoda.attrs.id = 'yoda'
      yoda.position({
        x: 300,
        y: 100
      })
      yoda.cache()
      yoda.filters([Konva.Filters.Blur])
      layer.add(yoda)
      layer.addEventListener('mousemove', self.changeBlur)
      stage.add(layer)
    })
  },
  methods: {
    handleMouseMove (event) {
      const mousePos = this.$refs.stage.getNode().getPointerPosition()
      const x = mousePos.x
      const y = mousePos.y
      this.$data.configText.text = 'x: ' + x + ', y: ' + y
    },
    changeBlur (event) {
      const stage = this.$refs.stage.getStage()
      const node = stage.findOne('#yoda')
      // const node = stage.children[1].children[0]
      this.$data.blur += 0.1
      node.blurRadius(this.$data.blur)
    }
  }
}

</script>
