<template>
  <div class="launderingContainer">
    <div class="launderingDocuments">
      <div class="launderingDocumentsTitle">
        <h4>聲明書</h4>
      </div>
      <div class="launderingDocumentFiles">
        <div class="launderingDocumentLine">
          <div class="launderingDocumentFile pdfFile" @click="activeLink(1)">
            111年度防制洗錢及打擊資恐內部控制制度聲明書
          </div>
          <div class="launderingDocumentFile pdfFile" @click="activeLink(2)">
            110年度防制洗錢及打擊資恐內部控制制度聲明書
          </div>
        </div>
        <div class="launderingDocumentLine">
          <div class="launderingDocumentFile imageFile" @click="activeLink(3)">
            108年度防制洗錢及打擊資恐內部控制制度聲明書
          </div>
          <div class="launderingDocumentFile imageFile" @click="activeLink(4)">
            107年度防制洗錢及打擊資恐內部控制制度聲明書
          </div>
        </div>
        <div class="launderingDocumentLine">
          <div class="launderingDocumentFile imageFile" @click="activeLink(5)">
            106年度防制洗錢及打擊資恐內部控制制度聲明書
          </div>
        </div>
      </div>
    </div>
    <div class="launderingLinks">
      <div class="launderingLinksTitle">
        <h4>相關資源</h4>
      </div>
      <div class="launderingLinksLine" @click="activeLink(6)">
        證券期貨業防制洗錢及打擊資助恐怖主義專區
      </div>
      <div class="launderingLinksLine" @click="activeLink(7)">期貨公會防制洗錢專區</div>
      <div class="launderingLinksLine" @click="activeLink(8)">
        證券暨期貨市場發展基金會之洗錢防制宣導影片
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.launderingContainer {
  padding: 20px;

  .launderingDocumentFiles {
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 20px;

    .launderingDocumentLine {
      display: grid;
      grid-template-columns: 1fr 1fr;

      .launderingDocumentFile {
        cursor: pointer;
      }
    }
  }

  .launderingDocuments,
  .launderingLinks {
    margin-bottom: 50px;
    border-left: 2px rgb(220, 220, 220) solid;
    border-bottom: 2px rgb(220, 220, 220) solid;
    border-radius: 20px 0px 0px 0px;
  }

  .launderingLinks {
    padding: 20px;
  }

  .launderingDocumentsTitle,
  .launderingLinksTitle {
    padding: 10px 20px;
  }

  .launderingDocumentFile,
  .launderingLinksLine {
    padding: 10px 20px 5px 50px;
    font-size: 1.1rem;
    cursor: pointer;
  }

  .launderingLinksLine {
    padding: 10px 20px 30px 50px !important;
  }

  .pdfFile,
  .imageFile,
  .launderingLinksLine {
    letter-spacing: 3px;
    color: rgb(150, 150, 150);
  }

  .pdfFile {
    background-image: url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" width="80" height="64" class="bi bi-file-pdf" style="fill : rgba(210, 210, 210, .5); transform: rotate(-36deg);" viewBox="0 0 22 22"><path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/><path d="M4.603 12.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.701 19.701 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.187-.012.395-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 0 0 .98 1.686 5.753 5.753 0 0 1 1.334.05c.364.065.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.856.856 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.716 5.716 0 0 1-.911-.95 11.642 11.642 0 0 0-1.997.406 11.311 11.311 0 0 1-1.021 1.51c-.29.35-.608.655-.926.787a.793.793 0 0 1-.58.029zm1.379-1.901c-.166.076-.32.156-.459.238-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361.01.022.02.036.026.044a.27.27 0 0 0 .035-.012c.137-.056.355-.235.635-.572a8.18 8.18 0 0 0 .45-.606zm1.64-1.33a12.647 12.647 0 0 1 1.01-.193 11.666 11.666 0 0 1-.51-.858 20.741 20.741 0 0 1-.5 1.05zm2.446.45c.15.162.296.3.435.41.24.19.407.253.498.256a.107.107 0 0 0 .07-.015.307.307 0 0 0 .094-.125.436.436 0 0 0 .059-.2.095.095 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a3.881 3.881 0 0 0-.612-.053zM8.078 5.8a6.7 6.7 0 0 0 .2-.828c.031-.188.043-.343.038-.465a.613.613 0 0 0-.032-.198.517.517 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822.024.111.054.227.09.346z"/></svg>');
    background-repeat: no-repeat;
    background-position: 5px -3px;
  }

  .pdfFile:hover {
    background-image: url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" width="80" height="64" class="bi bi-file-pdf" style="fill : rgba(255, 0, 0, .5); transform: rotate(-36deg);" viewBox="0 0 22 22"><path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/><path d="M4.603 12.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.701 19.701 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.187-.012.395-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 0 0 .98 1.686 5.753 5.753 0 0 1 1.334.05c.364.065.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.856.856 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.716 5.716 0 0 1-.911-.95 11.642 11.642 0 0 0-1.997.406 11.311 11.311 0 0 1-1.021 1.51c-.29.35-.608.655-.926.787a.793.793 0 0 1-.58.029zm1.379-1.901c-.166.076-.32.156-.459.238-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361.01.022.02.036.026.044a.27.27 0 0 0 .035-.012c.137-.056.355-.235.635-.572a8.18 8.18 0 0 0 .45-.606zm1.64-1.33a12.647 12.647 0 0 1 1.01-.193 11.666 11.666 0 0 1-.51-.858 20.741 20.741 0 0 1-.5 1.05zm2.446.45c.15.162.296.3.435.41.24.19.407.253.498.256a.107.107 0 0 0 .07-.015.307.307 0 0 0 .094-.125.436.436 0 0 0 .059-.2.095.095 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a3.881 3.881 0 0 0-.612-.053zM8.078 5.8a6.7 6.7 0 0 0 .2-.828c.031-.188.043-.343.038-.465a.613.613 0 0 0-.032-.198.517.517 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822.024.111.054.227.09.346z"/></svg>'),
      linear-gradient(transparent 0 60%, rgba(255, 0, 0, 0.1) 90% 100%);
    background-repeat: no-repeat;
    background-position: 5px -3px;
  }

  .imageFile {
    background-image: url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" width="80" height="64" class="bi bi-file-image" style="fill : rgba(210, 210, 210, .5); transform: rotate(-36deg);" viewBox="0 0 22 22"><path d="M8.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/><path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8l-2.083-2.083a.5.5 0 0 0-.76.063L8 11 5.835 9.7a.5.5 0 0 0-.611.076L3 12V2z"/></svg>');
    background-repeat: no-repeat;
    background-position: 5px -3px;
  }

  .imageFile:hover {
    background-image: url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" width="80" height="64" class="bi bi-file-image" style="fill : rgba(50, 200, 150, .5); transform: rotate(-36deg);" viewBox="0 0 22 22"><path d="M8.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/><path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8l-2.083-2.083a.5.5 0 0 0-.76.063L8 11 5.835 9.7a.5.5 0 0 0-.611.076L3 12V2z"/></svg>'),
      linear-gradient(transparent 0 60%, rgba(50, 200, 150, 0.1) 90% 100%);
    background-repeat: no-repeat;
    background-position: 5px -3px;
  }

  .launderingLinksLine {
    background-image: url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" width="80" height="64" class="bi bi-file-image" style="fill : rgba(210, 210, 210, .5); transform: rotate(96deg);" viewBox="0 0 20 20"><path d="M6.598 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.74 8.74 0 0 0-1.921-.306 7.404 7.404 0 0 0-.798.008h-.013l-.005.001h-.001L7.3 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L2.614 8.254a.503.503 0 0 0-.042-.028.147.147 0 0 1 0-.252.499.499 0 0 0 .042-.028l3.984-2.933zM7.8 10.386c.068 0 .143.003.223.006.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96v-.667z"/></svg>');
    background-repeat: no-repeat;
    background-position: -20px -3px;
  }

  .launderingLinksLine:hover {
    background-image: url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" width="80" height="64" class="bi bi-file-image" style="fill : rgba(0, 150, 200, .5); transform: rotate(96deg);" viewBox="0 0 20 20"><path d="M6.598 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.74 8.74 0 0 0-1.921-.306 7.404 7.404 0 0 0-.798.008h-.013l-.005.001h-.001L7.3 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L2.614 8.254a.503.503 0 0 0-.042-.028.147.147 0 0 1 0-.252.499.499 0 0 0 .042-.028l3.984-2.933zM7.8 10.386c.068 0 .143.003.223.006.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96v-.667z"/></svg>'),
      linear-gradient(transparent 0 60%, rgba(0, 150, 200, 0.1) 90% 100%);
    background-repeat: no-repeat;
    background-position: -20px -3px;
  }
}

@media screen and (max-width: 768px) {
  .launderingDocumentLine {
    display: grid;
    grid-template-columns: 1fr !important;
  }
}
</style>

<script setup lang="ts">
const activeLink = (lid: number) => {
  let fileUrl = ''

  switch (lid) {
    case 1:
      fileUrl = 'https://www.hwa-guan.com.tw/img/home/202303281520001.pdf'
      break
    case 2:
      fileUrl = 'https://www.hwa-guan.com.tw/img/home/202203281520001.pdf'
      break
    case 3:
      fileUrl = 'https://www.hwa-guan.com.tw/img/home/202003301520001.png'
      break
    case 4:
      fileUrl = 'https://www.hwa-guan.com.tw/img/home/20190429_01.jpg'
      break
    case 5:
      fileUrl = 'https://www.hwa-guan.com.tw/img/home/img-803113030-0001.jpg'
      break
    case 6:
      fileUrl = 'http://mlpc.twse.com.tw/rules-3.html'
      break
    case 7:
      fileUrl = 'http://www.futures.org.tw/down.asp?cat_id=13&class_id=35'
      break
    case 8:
      fileUrl = 'https://www.youtube.com/playlist?list=PLS9g2LvnYkMkmrmjYoWH0k1yLy6dzM1Tt'
      break
  }

  window.open(fileUrl, 'downloads')
}
</script>
