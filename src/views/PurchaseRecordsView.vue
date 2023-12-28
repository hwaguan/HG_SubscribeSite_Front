<template>
  <div class="mainContainer">
    <div>
      <div class="purchaseTitleContainer">
        <div class="purchaseTitle">訂購記錄</div>
      </div>
      <div class="purchaseProduct">
        <div class="productImageCase">
          <img :src="prodImg" class="productImage" />
        </div>
        <div class="productName">
          <div class="productNameText">{{ productName }}</div>
          <div class="productTeacher">{{ productTeacher }}</div>
          <div class="productInfoTitle">
            <div>訂閱狀態</div>
            <div>方案價格</div>
            <div>下次付款日</div>
            <div>可觀看日</div>
            <div></div>
          </div>
          <div class="productInfo">
            <div class="productStatus">正常</div>
            <div class="productPrice">
              <span class="priceNumber">$ {{ formatPrice(productPrice) }}</span> / 月
            </div>
            <div class="productStatus">2024-03-31</div>
            <div class="productDuedate">2024-03-31</div>
            <div class="cancel"><div class="btn btn-sm btn-danger">取消訂閱</div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<style scoped lang="scss">
.mainContainer {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  justify-items: center;
  background:
    linear-gradient(rgba(255, 255, 255, 0.98) 0% 30%, rgba(255, 255, 255, 0.8) 70% 100%);
  background-size: cover;
  background-repeat: no-repeat;

  .purchaseTitleContainer {
    width: 100%;
    padding: 50px 20px;
    background:
      linear-gradient(90deg, rgba(255, 255, 255, 0.7) 0% 30%, rgba(255, 255, 255, 0.98) 70% 100%),
      url('../assets/images/buying-online-black-friday.jpg') 0px -500px no-repeat;
    background-size: cover;
    display: grid;
    grid-template-columns: 1fr;
    justify-content: center;
    justify-items: center;

    .purchaseTitle {
      width: var(--main-container-width);
      font-size: 1.5rem;
      letter-spacing: 2px;
    }
  }

  .purchaseProduct {
    width: var(--main-container-width);
    padding: 50px 0px;
    display: grid;
    grid-template-columns: 20% auto;
    border-bottom: 1px rgb(210, 210, 210) solid;

    .productImageCase img {
      width: 100%;
      border-radius: 5px;
      box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
    }

    .productName {
      width: 100%;
      padding: 0px 20px;
      display: grid;
      grid-template-columns: 1fr;

      .productNameText {
        font-size: 1.8rem;
      }

      .productTeacher {
        padding-left: 20px;
      }

      .productInfo, .productInfoTitle {
        font-size : 1.5rem;
        padding-left : 20px;
        display : grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;

        .productPrice {
          padding-left: 20px;
          font-size: 1.2rem;
          color: rgb(100, 0, 0);

          .priceNumber {
            font-size: 1.5rem;
          }
        }
      }

      .productInfoTitle{
    border-bottom: 1px rgb(210, 210, 210) solid;
      }
    }
  }
}
</style>
  
<script setup lang="ts">
import { ref } from 'vue'
import prodImg from '@/assets/images/Eason.jpg'

let productImage = ref('Eason.jpg')
let productName = ref('【訂閱制】Eason 說給你聽')
let productTeacher = ref('Eason 顧問')
let productPrice = ref(2000)

const formatPrice = (value: number) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
</script>