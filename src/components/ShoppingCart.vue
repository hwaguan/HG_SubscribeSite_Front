<template>
    <div class="shoppingCartContainer">
        <div class="shoppingCartTitle">購物車</div>
        <div class="shoppingCartList">
            <div class="shoppingCartLine" v-for="(cart, index) in memberInfo.cart" :key="index">
                <div class="productIndex">{{ index + 1 }}.</div>
                <div class="productImage"></div>
                <div class="productIntro">
                    <div class="ProductName"></div>
                    <div class="ProductPrice"></div>
                </div>
                <div class="removeProduct"></div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.shoppingCartContainer{

}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import swal from 'sweetalert2'
import sysAlarm from '@/assets/ts/sysAlarm';

let memberInfo = ref({
    id: sessionStorage.getItem("memberID"),
    number: sessionStorage.getItem("memberNo"),
    name: sessionStorage.getItem("memberName"),
    gender: sessionStorage.getItem("memberGender"),
    email: sessionStorage.getItem("memberEmail"),
    mobile: sessionStorage.getItem("memberMobile"),
    tel: sessionStorage.getItem("memberTel"),
    address: sessionStorage.getItem("memberAddress"),
    cart: JSON.parse("" + sessionStorage.getItem("memberCart")),
    order: JSON.parse("" + sessionStorage.getItem("memberOrder"))
})
</script>