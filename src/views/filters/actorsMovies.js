import Vue from "vue";

Vue.filter("actorsmovies", data => {
  // console.log(data);
  // return '11111';
  var result = data.map(item => item.name);
  return result.join(" ");
});
