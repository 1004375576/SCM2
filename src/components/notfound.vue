<template>
  <div>
    <div class="notfoud-container container" style="background:#fff ;width:100%;">
    <div class="container" style="padding-top:7% ; margin:0 auto ; text-align: center;">
     <div style="width:280px ; margin:0 auto ; text-align:left ;">
       <section class="error-container">
         <span class="four"><span class="screen-reader-text">4</span></span>
         <span class="zero"><span class="screen-reader-text">0</span></span>
         <span class="four"><span class="screen-reader-text">4</span></span>
       </section>
        <p class="notfound-p">哎呀迷路了...</p>
        <div class="notfound-reason">
          <p>可能的原因：</p>
          <div>
            <p>原来的页面不存在了</p>
            <p>我们的服务器被外星人劫持了</p>
          </div>
        </div>
        <div class="notfound-btn-container">
          <a class="notfound-btn" href="/">返回登陆</a>
        </div>
      </div>
   </div>
    </div>
  </div>
</template>

<script>
</script>

<style>
  .error-container {
      text-align: center;
      font-size: 106px;
      font-family: "Catamaran", sans-serif;
      font-weight: 800;
      color:#003399 ;
      margin: 10px 5px;
  }

 /* .notfoud-container .img-404 {
    height: 155px;
    background: url(images/page404.png) center center no-repeat;
    -webkit-background-size: 150px auto;
    margin-top: 40px;
    margin-bottom: 20px;
  } */
</style>
