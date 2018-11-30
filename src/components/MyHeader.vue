<template>
  <header>
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
  </header>
</template>

<script>
export default {
  data () {
    return {
      artist_name: '',
      market: 'US'
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

<style lang='scss' scoped>
header {
  background-image: url("../assets/AN_logo.png");
  background-size: 150px;
  background-repeat: no-repeat;
  height: 50px;
  padding: 10px 0px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: 70vw 30vw;
  border-bottom: 1px solid rgba(128, 128, 128, 0.7);
}

h1, h2 {
  height: 100%;
  margin: 0;
  font-weight: normal;
}

.title {
  text-align: left;
  padding-left: 50px;
}

a {
  color: black;
  text-decoration: none;
}

.search {
  padding-top: 10px;
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

// タブレット
@media (max-width: 1024px) {
  header {
    grid-template-columns: none;
  }

  h1, h2 {
    display: inline-block;
    font-size: 25px;
  }

  .title {
    text-align: left;
    padding-left: 20px;
  }

  .search {
    padding: 0px;
    display: block;
    position: absolute;
    margin-top: 15px;
    right: 5vw;
  }
}

// スマートフォン
@media (max-width: 500px) {
  header {
    height: 70px;
    grid-template-columns: none;
  }

  h1, h2 {
    font-size: 25px;
  }

  .title {
    text-align: left;
    padding-left: 20px;
  }

  .search {
    padding: 0px;
    position: absolute;
    margin-top: 50px;
    margin-left: 5vw;
  }
}
</style>
