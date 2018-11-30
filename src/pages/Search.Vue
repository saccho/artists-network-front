<template>
  <div class="main">
    <MyHeader></MyHeader>
    <p class="error" v-if="error">{{error}}</p>
    <p v-if="result.artists.err_msg">{{result.artists.err_msg}}</p>
    <table class="result" v-else>
      <tr v-for="(item, index) in result.artists.items" :key=index>
        <td>
          <div v-if=item.image>
            <router-link :to="{name: 'Network', query: {id: item.id}}">
              <img :src="item.image">
            </router-link>
          </div>
          <div v-else>
            <router-link :to="{name: 'Network', query: {id: item.id}}">
              <img src="@/assets/no_image.png">
            </router-link>
          </div>
        </td>
        <td>
          <router-link :to="{name: 'Network', query: {id: item.id}}">
            {{item.name}}
          </router-link>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import MyHeader from '@/components/MyHeader'

export default {
  data () {
    return {
      market: 'US',
      artist_name: null,
      error: null,
      result: {
        artists: {}
      }
    }
  },
  components: {
    MyHeader
  },
  methods: {
    searchArtists () {
      const baseUrl = 'https://artists-network-api.herokuapp.com'
      let endPoint = `/source-artists/${this.$route.query.market}/${this.$route.query.name}`
      axios.get(`${baseUrl}${endPoint}`).then(res => {
        this.$set(this.result, 'artists', res.data)
      })
    },
    linkToSearch () {
      this.$router.push({name: 'Search', query: {name: this.artist_name, market: this.market}})
    },
    checkform () {
      if (this.artist_name) {
        this.linkToSearch()
      }
      if (!this.artist_name) {
        this.$set(this, 'error', 'Artist name is required.')
      }
    }
  },
  created () {
    this.searchArtists()
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: black;
  text-decoration: none;
}

button {
  display: block;
  position: relative;
  margin: 0 auto;
  width: 70pt;
  border: solid 1px silver;
  border-radius: 0.5rem 0.5rem;
  padding: 0.5rem 1.5rem;
  margin-top: 1rem;
  text-decoration: none;
}

table {
  margin-top: 3%;
  display: inline-block;
  text-align: center;
}

img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
}
</style>
