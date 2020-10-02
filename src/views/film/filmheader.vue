<template>
  <div>
    <ul>
      <router-link to="/movies/nowplaying" tag="li" activeClass="active"
        >正在热映</router-link
      >
      <router-link to="/movies/comingsoon" tag="li" activeClass="active"
        >即将上映</router-link
      >
    </ul>
  </div>
</template>
<style lang="scss" scoped>
ul {
  display: flex;
  li {
    flex: 1;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
}
.active {
  color: red;
  border-bottom: 3px solid red;
}
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  background: white;
  z-index: 10;
}
</style>
