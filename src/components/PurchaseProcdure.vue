<template>
    <div class="purchaseConfirmContainer">
        <div class="procdureBar">
            <div class="procdureStep">

            </div>
            <div class="procdureLine">
                <div class="blob red"></div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.purchaseConfirmContainer {
    .procdureBar {
        .procdureLine {
            .blob {
                background: black;
                border-radius: 50%;
                box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
                margin: 10px;
                height: 20px;
                width: 20px;
                transform: scale(1);
                animation: pulse-black 2s infinite;
            }

            .blob.red {
                background: rgba(255, 82, 82, 1);
                box-shadow: 0 0 0 0 rgba(255, 82, 82, 1);
                animation: pulse-red 2s infinite;
            }

            @keyframes pulse-red {
                0% {
                    transform: scale(0.95);
                    box-shadow: 0 0 0 0 rgba(255, 82, 82, 0.7);
                }

                70% {
                    transform: scale(1);
                    box-shadow: 0 0 0 10px rgba(255, 82, 82, 0);
                }

                100% {
                    transform: scale(0.95);
                    box-shadow: 0 0 0 0 rgba(255, 82, 82, 0);
                }
            }
        }
    }
}

@media screen and (max-width: 768px) {
}
</style>

<script setup lang="ts">
</script>