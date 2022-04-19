<template>
  <footer class="footer-bottom">
    <p class="copyright">
      Copyright © 2020 - 2022
      <font-awesome-icon icon="heart" />
      <a href="https://github.com/nekolr/saber">Saber 酱</a>
    </p>
  </footer>
</template>
<script>
export default {
  name: "Footer",
};
</script>
<style>
.footer-bottom {
  margin: 0 auto;
  position: fixed;
  bottom: 0;
  font-size: 15px;
  width: 100%;
  background: #fafafa;
  color: #777;
  text-transform: uppercase;
  text-align: center;
  font-family: "Raleway";
}

.footer-bottom p {
  padding: 10px;
}

.footer-bottom .fa-heart {
  color: #dd1717;
  margin: 0 5px;
  font-size: 13px;
}

.footer-bottom a {
  color: #d3a8a8;
  text-decoration: none;
}

/* 心跳 */
@keyframes pound {
  50% {
    transform: scale(1.2);
  }
}

.fa-heart {
  animation: pound 0.5s infinite;
}
</style>