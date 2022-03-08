<template>
  <v-layout align-left>
    <v-flex align-self-start class="text-left">
      <v-row align-self-center class="justify-center">
        <H1>Senderのテスト</H1>
      </v-row>
      <v-row align-self-center class="justify-center">
        <v-btn @click="connectPeers">1. 接続開始</v-btn>
        <v-btn @click="acceptSDPAnswer">2. sdpAnswer受け入れ</v-btn>
        <v-btn @click="acceptsenderCandidateString">3. Receiver Candidate受け入れ</v-btn>
        <v-btn @click="debugConnection">4. Debug</v-btn>
      </v-row>
      <H3>Connection</H3>
      <pre v-if="connection">
        connectionState: {{ connection['connectionState'] }}
        iceConnectionState: {{ connection['iceConnectionState'] }}
        iceGatheringState: {{ connection['iceGatheringState'] }}
        currentLocalDescription: {{ connection['currentLocalDescription'] }}
        currentRemoteDescription: {{ connection['currentRemoteDescription'] }}
      </pre>
      <span><v-icon @click="copyToClipboard(offerString)">mdi-content-copy</v-icon>1. Offer</span>
      <v-text-field v-model="offerString"></v-text-field>
      <span><v-icon @click="copyToClipboard(sdpAnswerString)">mdi-content-copy</v-icon>2. レシーバーのsdpAnswerを貼り付けてね</span>
      <v-text-field v-model="sdpAnswerString"></v-text-field>
      <span><v-icon @click="copyToClipboard(senderCandidateString)">mdi-content-copy</v-icon>3. Sender Candidates</span>
      <v-text-field v-model="senderCandidateString"></v-text-field>
      <span><v-icon @click="copyToClipboard(receiverCandidateString)">mdi-content-copy</v-icon>4. Receiver Candidateを貼り付けてね</span>
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
      useMedia: null,
      localStream: null,
      connection: null,
      localDescription: '',
      offer: '',
      channel: null,
      receivedMessages: [],
      sdpAnswer: '',
      sdpAnswerString: '',
      receiverCandidateString: '',
      candidates: []
    }
  },
  props: {
  },
  watch: {
    sdpAnswer (_oldValue, newValue) {
      // アンサーを受け取ったらそれをリモートのSDPとして登録
      if (newValue) {
        this.connection.setRemoteDescription(JSON.parse(newValue))
      }
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {
    offerString () {
      // NOTE: 実際にはコピペではなくてAPI経由で受け渡しする必要がある
      return JSON.stringify(this.offer)
    },
    senderCandidateString () {
      // NOTE: 実際にはコピペではなくてAPI経由で受け渡しする必要がある
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
    // RTCPeerConnectionのインスタンスを作成する。
    async connectPeers () {
      // RTCPeerConnectionのコンフィグを作成。
      // 今回はビデオ通信を行うため、
      // offerToReceiveVideo/Audioの設定を明記する
      // 同NAT内のブラウザ同士で接続するなら、iceServersの記述は不要
      const config = {
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 0
        /* iceServers: [{
          urls: 'stun:stun.l.google.com:19302'
        }] */
      }

      // configを元にRTCPeerConnectionを初期化
      this.connection = new RTCPeerConnection(config)
      this.localDescription = this.connection['localDescription']

      // データチャンネルの生成とイベントハンドラの登録
      // それぞれ、表示用の変数に追加、代入する
      this.channel = this.connection.createDataChannel('channel')
      this.channel.onmessage = e => { this.receivedMessages.push(e.data) }

      // ICE Candidatesが生成された時発火するイベントハンドラ
      // setLocalDescription(sdp)が呼ばれるとICE Candidatesの生成が裏で行われて発火する
      // Receiver側にICE Candidatesの情報を渡す必要があるので
      // this.candidates 変数にpushしてテキストボックスに表示する
      this.connection.onicecandidate = e => {
        if (e.candidate) {
          this.candidates.push(e.candidate)
        }
      }

      // config、データチャンネル、メディアストリーム情報を元にしたSDPを作成し、自身のSDPとして登録。
      // 裏でICE Candidatesが作成されるので、自身の onicecandidate が発火される
      this.connection.createOffer().then(offerSDP => {
        this.connection.setLocalDescription(offerSDP)
        // 作成したSDPはReceiver側に渡す必要があるので this.offer 変数に代入
        this.offer = offerSDP
      })

      // ユーザがビデオを許可している時のみ、MediaStreamTrackを登録する
      // Sender側の画面でもビデオを使っている事が見えるようにする必要があるので
      // this.localStream 変数にメディアストリームを代入
      this.localStream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true })
      this.localStream.getTracks().forEach(track => this.connection.addTrack(track, this.localStream))
      this.useMedia = true
      this.$refs.video.srcObject = this.localStream
      this.$refs.video.play()

      console.log(this.connection)
      console.log('接続準備完了')
    },
    acceptSDPAnswer () {
      // アンサーを受け取ったらそれをリモートのSDPとして登録
      this.connection.setRemoteDescription(JSON.parse(this.sdpAnswerString))
    },
    acceptsenderCandidateString () {
      // ICE Candidatesを受け取る
      const candidates = JSON.parse(this.senderCandidateString)
      // それぞれのCandidateをブラウザのICEエージェントに渡す。
      candidates.forEach(candidate => {
        console.log('Sender adding candidate', candidate)
        this.connection.addIceCandidate(candidate).catch((e) => {
          console.eror('Sender addIceCandidate error', e)
        })
      })
    },
    debugConnection () {
      console.log(this.connection)
      this.channel.send('test messages from sender')
      let stream = this.$refs.video.srcObject
      let tracks = stream.getTracks()
      console.log(tracks)
    }
  }
}
</script>
