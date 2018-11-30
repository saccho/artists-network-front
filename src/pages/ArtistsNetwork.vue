<template>
  <div class="main">
    <MyHeader></MyHeader>
    <div class="container">
      <div class="nodes" v-if="results.artists.source">
        <div :style="styles.sourceNodeStyle">
          <div class="mask-source">
            <p class="source" :style="styles.sourceChildStyle">{{results.artists.source.name}}</p>
          </div>
        </div>
        <div v-for="(related_artist, index) in results.artists.related"
          :key="related_artist.name" :style="styles.relatedNodeStyles[index]">
          <div class="mask-related">
            <router-link :to="{name: 'Network', query: {id: related_artist.id}}">
              <p :style="styles.relatedChildStyles[index]">{{related_artist.name}}</p>
            </router-link>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <div class="mask-card-header">
            <h1>{{results.artists.source.name}}</h1>
            <p>Popularity: {{results.artists.source.popularity}}</p>
          </div>
        </div>
        <div class="related-artists">
          <div v-if="results.albumLength">
            <h2>Albums</h2>
            <div v-for="(album, index) in results.albums.album" :key="index">
              <a :href="album.spotify_url" target="_blank">
                <img :src="album.image">
              </a>
            </div>
          </div>
          <div v-if="results.singleLength">
            <h2>Singles</h2>
            <div v-for="(single, index) in results.albums.single" :key="index">
              <a :href="single.spotify_url" target="_blank">
                <img :src="single.image">
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import MyHeader from '@/components/MyHeader'

export default ({
  data () {
    return {
      results: {
        artists: {
          source: {},
          related: []
        },
        albums: {},
        albumLength: 0,
        singleLength: 0
      },
      styles: {
        sourceNodeStyle: {},
        sourceChildStyle: {},
        relatedNodeStyles: [],
        relatedChildStyles: []
      }
    }
  },
  components: {
    MyHeader
  },
  methods: {
    getArtistsData () {
      const baseUrl = 'https://artists-network-api.herokuapp.com'
      let endPoint = `/related-artists/${this.$route.query.id}`
      axios.get(`${baseUrl}${endPoint}`).then(res => {
        const artistData = res.data
        this.sourceStyle(artistData)
        this.relatedStyles(artistData)
        this.$set(this.results, 'artists', artistData)
      })
    },
    getArtistAlbums () {
      const baseUrl = 'https://artists-network-api.herokuapp.com'
      let endPoint = `/artist-albums/${this.$route.query.id}`
      axios.get(`${baseUrl}${endPoint}`).then(res => {
        const albumData = res.data
        this.$set(this.results, 'albums', albumData)
        this.$set(this.results, 'albumLength', albumData.album.length)
        this.$set(this.results, 'singleLength', albumData.single.length)
      })
    },
    sourceStyle (data) {
      let hue, color, size
      if (data.source.genre === 0) {
        color = 'white'
      } else {
        hue = data.source.genre
        color = `hsl(${hue}, 100%, 70%)`
      }
      size = this.nodeSize(data.source.popularity)
      const sourceNodeStyle = {
        backgroundImage: `url(${data.source.image})`,
        backgroundSize: 'cover',
        position: 'absolute',
        top: 40 + '%',
        left: 40 + '%',
        display: 'inline-block',
        textAlign: 'center',
        width: size + 'px',
        height: size + 'px',
        borderRadius: 50 + '%',
        backgroundColor: 'whitesmoke',
        boxShadow: `0px 0px 30px 2px ${color}`
      }
      const sourceChildStyle = {
        fontSize: 13 + 'px',
        color: 'black',
        fontWeight: 500,
        textShadow:
          `2px  2px 3px ${color},
          -2px  2px 3px ${color},
          2px -2px 3px ${color},
          -2px -2px 3px ${color}`,
        margin: 0,
        display: 'flex',
        height: 100 + '%',
        width: 'auto',
        justifyContent: 'center',
        alignItems: 'center'
      }
      this.$set(this.styles, 'sourceNodeStyle', sourceNodeStyle)
      this.$set(this.styles, 'sourceChildStyle', sourceChildStyle)
    },
    relatedStyles (data) {
      let hue, color, size
      const relatedLength = data.related.length
      const degIn = 360.0 / Math.round(relatedLength / 3)
      const radIn = (degIn * Math.PI / 180.0)
      const degOut = 360.0 / Math.round(2 * relatedLength / 3)
      const radOut = (degOut * Math.PI / 180.0)
      const circleRIn = relatedLength * 1
      const circleROut = relatedLength * 1.8
      let x, y
      let relatedNodeStyles = []
      let relatedChildStyles = []
      for (let i = 0; i < relatedLength; i++) {
        if (data.related[i].genre === 0) {
          color = 'white'
        } else {
          hue = data.related[i].genre
          color = `hsl(${hue}, 100%, 70%)`
        }
        if (i < Math.round(relatedLength / 3)) {
          x = Math.cos(radIn * i) * circleRIn + (2 * circleRIn)
          y = Math.sin(radIn * i) * circleRIn + (2.1 * circleRIn)
        } else {
          x = Math.cos(radOut * i) * circleROut + (1.1 * circleROut)
          y = Math.sin(radOut * i) * circleROut + (1.2 * circleROut)
        }
        size = this.nodeSize(data.related[i].popularity)
        relatedNodeStyles[i] = {
          backgroundImage: `url(${data.related[i].image})`,
          backgroundSize: 'cover',
          position: 'absolute',
          left: x + '%',
          top: y + '%',
          display: 'inline-block',
          textAlign: 'center',
          width: size + 'px',
          height: size + 'px',
          borderRadius: 50 + '%',
          backgroundColor: 'whitesmoke',
          boxShadow: `0px 0px 20px 1px ${color}`
        }
        relatedChildStyles[i] = {
          fontSize: 13 + 'px',
          color: 'gray',
          textShadow:
            `1px  1px 2px ${color},
            -1px  1px 2px ${color},
            1px -1px 2px ${color},
            -1px -1px 2px ${color}`,
          margin: 0,
          display: 'flex',
          height: 100 + '%',
          width: 'auto',
          justifyContent: 'center',
          alignItems: 'center'
        }
      }
      this.$set(this.styles, 'relatedNodeStyles', relatedNodeStyles)
      this.$set(this.styles, 'relatedChildStyles', relatedChildStyles)
    },
    nodeSize (popularity) {
      let size
      if (popularity === 100) {
        size = 140
      } else if (popularity >= 90 && popularity < 100) {
        size = 110
      } else if (popularity >= 80 && popularity < 90) {
        size = 100
      } else if (popularity >= 70 && popularity < 80) {
        size = 90
      } else if (popularity >= 60 && popularity < 70) {
        size = 80
      } else if (popularity >= 50 && popularity < 60) {
        size = 70
      } else if (popularity >= 40 && popularity < 50) {
        size = 60
      } else if (popularity >= 30 && popularity < 40) {
        size = 55
      } else {
        size = 50
      }
      return size
    }
  },
  created () {
    this.getArtistsData()
    this.getArtistAlbums()
  }
})
</script>

<style lang='scss' scoped>
.container {
  display: grid;
  grid-template-columns: 70vw 30vw;
}

h1, h2 {
  font-weight: normal;
}

a {
  color: black;
  text-decoration: none;
}

.nodes {
  position: relative;
  height: 100vh;
  width: 100%;
}

.mask-source {
  height: 100%;
  border-radius: 50%;
}

.mask-related {
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  transition: all  0.5s ease;
}
.mask-related:hover {
  background: rgba(255, 255, 255, 0);
}

.card {
  margin-right: 2vw;
  border-left: 1px solid rgba(0,0,0,0.3);
}

.card div {
  display: inline;
}

.card img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

// タブレット
@media (max-width: 1024px) {
  .container {
    grid-template-columns: none;
  }

  .nodes {
    left: 7%;
    margin-bottom: 7%;
  }

  .card {
    margin: 0px;
    border-left: none;
    border-top: 1px solid rgba(0,0,0,0.3);
  }
}

// スマートフォン
@media (max-width: 500px) {
  .container {
    grid-template-columns: none;
  }

  .nodes {
    left: 0;
    margin: 0;
  }

  .card {
    margin: 0;
    border-left: none;
    border-top: 1px solid rgba(0,0,0,0.3);
  }
}
</style>
