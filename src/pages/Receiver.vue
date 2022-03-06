<template>
  <v-layout align-left>
    <v-flex align-self-start class="text-left">
      <v-row align-self-center class="justify-center">
        <H1>Receiverのテスト</H1>
      </v-row>
      <v-row align-self-center class="justify-center">
        <v-btn @click="connectPeers">接続開始</v-btn>
      </v-row>
      <H3>Connection</H3>
      <pre v-if="connection">
        iceConnectionState: {{ connection['iceConnectionState'] }}
        iceGatheringState: {{ connection['iceGatheringState'] }}
        localDescription["sdp"]: {{ connection['localDescription.sdp'] }}
        localDescription["type"]: {{ connection['localDescription.type'] }}
      </pre>
      <span><v-icon @click="copyToClipboard(offerString)">mdi-content-copy</v-icon>1. Offer</span>
      <v-text-field v-model="offerString"></v-text-field>
      <span><v-icon @click="copyToClipboard(candidateString)">mdi-content-copy</v-icon>2. Sender Candidates</span>
      <v-text-field v-model="candidateString"></v-text-field>
      <H3>Channel</H3>
      <pre>
        {{ channel }}
      </pre>
      <H3>receivedMessages</H3>
      <pre>
        {{ receivedMessages }}
      </pre>
      <H3>candidates</H3>
      <pre>
        {{ candidates }}
      </pre>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  name: 'webrtc',
  data () {
    return {
      connection: null,
      channel: null,
      receivedMessages: [],
      candidates: []
    }
  },
  props: {
  },
  watch: {
  },
  created () {
  },
  mounted () {
  },
  computed: {
    offerString () {
      return window.localStorage.getItem('offerString')
    },
    candidateString () {
      return window.localStorage.getItem('candidatesString')
    }
  },
  methods: {
    copyToClipboard (text) {
      navigator.clipboard.writeText(text)
        .then(() => {
          console.log('copied!')
        })
        .catch(e => {
          console.error(e)
        })
    },
    connectPeers () {
      // RTCPeerConnectionのコンフィグを作成。
      // offerToReceiveVideo/Audioの設定を明記する
      // 同NAT内のブラウザ同士で接続するなら、iceServersの記述は不要
      const config = {
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 0
        /* iceServers: [
          {
            urls: 'stun:stun.l.google.com:19302'
          }
        ] */
      }

      // configを元にRTCPeerConnectionを初期化
      this.connection = new RTCPeerConnection(config)

      // Sender側からデータチャネルを受け取った時発火するイベントハンドラ
      this.connection.ondatachannel = e => {
        // データチャンネルの生成とイベントハンドラの登録
        this.channel = e.channel
        this.channel.onmessage = this.handleMessage
        this.channel.onopen = this.handlechannelStatusChange
        this.channel.onclose = this.handlechannelStatusChange
      }
      // Sender側のメディアストリームを受け取った時発火するイベントハンドラ
      this.connection.ontrack = this.handleconnectionTrack

      // ICE Candidatesが生成された時発火するイベントハンドラ
      // setLocalDescription(sdp)が呼ばれるとICE Candidatesの生成が裏で行われて発火する
      // Sender側にICE Candidatesの情報を渡す必要があるので
      // this.candidates変数にpushしてテキストボックスに表示する
      this.connection.onicecandidate = e => {
        if (e.candidate) {
          this.candidates.push(e.candidate)
        }
      }
      console.log(this.connection)
      console.log('onconnect')
    },
    handleconnectionTrack (e) {
      console.log('handleconnectionTrack--------------')
      // Sender側から来たメディアストリームをthis.mediaStreamに代入
      this.mediaStream = e.streams[0]
    },
    handleMessage (e) {
      console.log('handleMessage--------------')
      console.log(e)
    },
    handlechannelStatusChange (e) {
      console.log('handlechannelStatusChange----------')
      console.log(e)
    }
  }
}
</script>
