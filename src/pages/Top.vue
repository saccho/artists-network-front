<template>
  <div class="top">
    <div class="logo">
      <router-link to="/">
        <img src="@/assets/AN_logo.png">
      </router-link>
    </div>
    <div class="title">
      <h1><router-link to="/">Artist Network</router-link></h1>
    </div>
    <div class="search">
      <div class="selectWrap">
        <select class="select" v-model="market">
          <option>US</option>
          <option>JP</option>
        </select>
      </div>
      <div class="inputWrap">
        <input type="text" v-model="artist_name"
          @keypress.enter="checkform()"
          placeholder="アーティスト名 で検索">
      </div>
      <div class="bottunWrap">
        <button @click="checkform()">Search</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      market: 'US',
      artist_name: null,
      error: null
    }
  },
  methods: {
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
  }
}
</script>

<style scoped>
.logo {
  padding-top: 20vh;
  height: 150px;
}

img {
  height: 100%;
  object-fit: cover;
}

h1, h2 {
  margin: 0;
  padding-top: 20px;
  padding-bottom: 20px;
  font-weight: normal;
}

a {
  color: black;
  text-decoration: none;
}

.inputWrap {
  display: inline-block;
}

.bottunWrap {
  display: inline-block;
}

input {
  display: inline-block;
  border-radius: 5px;
  border: solid 1px silver;
  padding: 7px;
}

.selectWrap{
  width: 70px;
  position: relative;
  display: inline-block;
  background-color: white;
}
.selectWrap::after {
  content: '';
  width: 6px;
  height: 6px;
  border: 0px;
  border-bottom: solid 2px silver;
  border-right: solid 2px silver;
  -ms-transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  position: absolute;
  top: 50%;
  right: 10px;
  margin-top: -4px;
}
.select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 100%;
  height: 28px;
  background: transparent;
  position: relative;
  z-index: 1;
  padding: 0 40px 0 10px;
  border: 1px solid silver;
  border-radius: 2px;
}
select::-ms-expand {
  display: none;
}

button {
  position: relative;
  width: 50pt;
  height: 30px;
  border: solid 1px silver;
  border-radius: 0.5rem 0.5rem;
  text-decoration: none;
}
</style>
