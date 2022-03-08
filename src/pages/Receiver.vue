<template>
  <v-layout align-left>
    <v-flex align-self-start class="text-left">
      <v-row align-self-center class="justify-center">
        <H1>Receiverのテスト</H1>
      </v-row>
      <v-row align-self-center class="justify-center">
        <v-btn @click="connectPeers">1. 接続開始</v-btn>
        <v-btn @click="onStartCreateCandidate">2. Offer StringからICE Candidatesの作成</v-btn>
        <v-btn @click="onAcceptsenderCandidateString">3. Sender Candidatesの受け入れ</v-btn>
        <v-btn @click="debugConnection">4. Debug</v-btn>
      </v-row>
      <H3>Connection</H3>
      <pre v-if="connection">
        connectionState: {{ connection['connectionState'] }}
        iceConnectionState: {{ connection['iceConnectionState'] }}
        iceGatheringState: {{ connection['iceGatheringState'] }}
        localDescription["sdp"]: {{ connection['localDescription.sdp'] }}
        localDescription["type"]: {{ connection['localDescription.type'] }}
      </pre>
      <span><v-icon @click="copyToClipboard(offerString)">mdi-content-copy</v-icon>1. SenderのOfferを貼り付けてね</span>
      <v-text-field v-model="offerString"></v-text-field>
      <span><v-icon @click="copyToClipboard(sdpAnswerString)">mdi-content-copy</v-icon>2. SDP Answer</span>
      <v-text-field v-model="sdpAnswerString"></v-text-field>
      <span><v-icon @click="copyToClipboard(senderCandidateString)">mdi-content-copy</v-icon>3. Sender Candidateを貼り付けてね</span>
      <v-text-field v-model="senderCandidateString"></v-text-field>
      <span><v-icon @click="copyToClipboard(receiverCandidateString)">mdi-content-copy</v-icon>4. Reciver Candidate</span>
      <v-text-field v-model="receiverCandidateString"></v-text-field>
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
      offerString: '',
      connection: null,
      channel: null,
      receivedMessages: [],
      senderCandidateString: '',
      candidates: [],
      answer: {},
      mediaStream: null
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
    sdpAnswerString () {
      return JSON.stringify(this.answer) || ''
    },
    receiverCandidateString () {
      return JSON.stringify(this.candidates)
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
      this.connection.ondatachannel = this.receiveChannelCallback
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
    onStartCreateCandidate () {
      this.createICECandidate()
    },
    async createICECandidate () {
      // オファーを受け取ったらそれをリモートのSDPとして登録
      await this.connection.setRemoteDescription(JSON.parse(this.offerString))
      // config,データチャネル、メディアストリーム情報を元にしたSDPを作成し、自身のSDPとして登録
      // 裏でICE Candidatesが作成されるので、自身のonicecandidateが発火される
      this.answer = await this.connection.createAnswer()
      this.connection.setLocalDescription(this.answer)
      // NOTE: 実際にはコピペではなくてAPI経由で受け渡しする必要がある
    },
    receiveChannelCallback (e) {
      // データチャンネルの生成とイベントハンドラの登録
      this.channel = e.channel
      this.channel.onmessage = e => { this.receivedMessages.push(e.data) }
      this.channel.onopen = e => { console.log('open data channel --') }
      this.channel.onclose = e => { console.log('close data channel --') }
    },
    handleconnectionTrack (e) {
      console.log('handleconnectionTrack--------------')
      // Sender側から来たメディアストリームをthis.mediaStreamに代入
      this.mediaStream = e.streams[0]
    },
    onAcceptsenderCandidateString () {
      // それぞれのCandidateをブラウザのICEエージェントに渡す
      const candidates = JSON.parse(this.senderCandidateString)
      candidates.forEach(candidate => {
        console.log('Receiver adding candidate', candidate)
        this.connection.addIceCandidate(candidate).catch(e => {
          console.eror('Receiver addIceCandidate error', e)
        })
      })
    },
    debugConnection () {
      console.log(this.connection)
      this.channel.send('test messages from receiver')
      let stream = this.$refs.video.srcObject
      let tracks = stream.getTracks()
      console.log(tracks)
    }
  }
}
</script>
