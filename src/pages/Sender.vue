<template>
  <v-layout align-left>
    <v-flex align-self-start class="text-left">
      <v-row align-self-center class="justify-center">
        <H1>Senderのテスト</H1>
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
      <video
        playsinline
        autoplay
        muted
        width="100px"
        height="100px"
        ref="video"
        id="video"
      ></video>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  name: 'webrtc',
  data () {
    return {
      video: null,
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
    this.video = this.$refs.video
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.video.srcObject = stream
        this.video.play()
      })
    }
  },
  computed: {

  },
  methods: {
    // RTCPeerConnectionのインスタンスを作成する。
    async connectPeers () {
      // RTCPeerConnectionのコンフィグを作成。
      // 今回はビデオ通信を行うため、
      // offerToReceiveVideo/Audioの設定を明記する
      // 同NAT内のブラウザ同士で接続するなら、iceServersの記述は不要
      const config = {
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 0,
        iceServers: [{
          urls: 'stun:stun.l.google.com:19302'
        }]
      }

      // configを元にRTCPeerConnectionを初期化
      this.connection = new RTCPeerConnection(config)
      console.log(this.connection)

      // データチャンネルの生成とイベントハンドラの登録
      // それぞれ、表示用の変数に追加、代入する
      this.channel = this.connection.createDataChannel('channel')
      this.channel.onmessage = e => { this.receivedMessages.push(e.data) }
      this.channel.onopen = e => { this.channelOpen = true }
      this.channel.onclose = e => { this.channelOpen = false }

      // ICE Candidatesが生成された時発火するイベントハンドラ
      // setLocalDescription(sdp)が呼ばれるとICE Candidatesの生成が裏で行われて発火する
      // Receiver側にICE Candidatesの情報を渡す必要があるので
      // this.candidates 変数にpushしてテキストボックスに表示する
      this.connection.onicecandidate = e => {
        if (e.candidate) {
          this.candidates.push(e.candidate)
        }
      }

      // ユーザがビデオを許可している時のみ、MediaStreamTrackを登録する
      // Sender側の画面でもビデオを使っている事が見えるようにする必要があるので
      // this.localStream 変数にメディアストリームを代入
      this.localStream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true })
      this.localStream.getTracks().forEach(track => this.connection.addTrack(track, this.localStream))
      this.useMedia = true

      // config、データチャンネル、メディアストリーム情報を元にしたSDPを作成し、自身のSDPとして登録。
      // 裏でICE Candidatesが作成されるので、自身の onicecandidate が発火される
      this.connection.createOffer().then(offerSDP => {
        this.connection.setLocalDescription(offerSDP)
        // 作成したSDPはReceiver側に渡す必要があるので this.offer 変数に代入
        this.offer = offerSDP
      })
      console.log('接続準備完了')
    }
  }
}
</script>
