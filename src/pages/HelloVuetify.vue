<template>
  <splitpanes class="default-theme" :style="{height: editor_height}">
    <pane min-size="20">
        <v-row>
          <v-col class="mx-1 my-1">
            <card-type1></card-type1>
          </v-col>
          <v-col class="mx-1 my-1">
            <card-type1></card-type1>
          </v-col>
        </v-row>
    </pane>
    <pane>
      <splitpanes horizontal>
        <pane>
          <file-loader></file-loader>
          <draggable>
            <transition-group>
            </transition-group>
          </draggable>
        </pane>
        <pane>
          <blockquote> {{ test() }}</blockquote>
          <p>段落段落段落段落段<var>$段落</var>落段落段落段落</p>
          <code>
            bundle exec rake db:migrate
          </code>
          <kbd>ユーザー入力ユーザー入力ユーザー入力</kbd>
        </pane>
      </splitpanes>
    </pane>
    <pane>
      <draggable>
        <transition-group transition="scale-transition">
          <div v-for="element in cards" :key="element.id" :move="checkMove">
            <card-type2 :title="element.name" :text="element.text" class="mx-1 my-1"></card-type2>
          </div>
        </transition-group>
      </draggable>
    </pane>
  </splitpanes>
</template>
<script>
import { mdiAccount, mdiCheck } from '@mdi/js'
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import CardType1 from '../components/CardType1'
import CardType2 from '../components/CardType2'
import FileLoader from '../components/FileLoader'
import draggable from 'vuedraggable'

export default {
  // 自作コンポーネントを利用可能にする
  components: {
    Splitpanes,
    Pane,
    CardType1,
    CardType2,
    FileLoader,
    draggable
  },
  data () {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      account: mdiAccount,
      check: mdiCheck,
      cards: [
        {
          id: 1,
          name: 'elem1',
          text: 'This is 1st components! Test drug & drop then sorted'
        },
        {
          id: 2,
          name: 'elem2',
          text: 'This is 2nd one! Test drug & drop then sorted'
        }
      ]
    }
  },
  watch: {
  },
  created () {
  },
  mounted () {
  },
  computed: {
    editor_height: function () {
      return (this.$store.state.windowHeight * 0.85) + 'px'
    },
    card_margin: function () {
      return 'mx-1 my-1'
    }
  },
  methods: {
    checkMove (e) {
      console.log(e)
    },
    test () {
      return this.$store.state
    }
  }
}
</script>
<style>
.splitpanes__pane {
  justify-content: center;
  align-items: start;
  display: flex;
  overflow-y: scroll;
}
.v-container{

}
</style>
