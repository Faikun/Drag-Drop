<template>
    <div class="modal">
        <div class="modal__close">
            <img src="../assets/images/icons/carbon_close.png" alt="close" @click="$emit('close_modal')">
        </div>
        <div class="modal__wrapper">
            <img class="modal__image" :src="useImage(Inventory?.img)" alt="image">
            <img class="modal__skeleton" src="../assets/images/images/Skeletons.png" alt="skeleton">
            <div class="modal__interactive">
                <input v-if="isDelete" v-model.lazy="count" type="number" class="modal__input" placeholder="Введите количество">
                <button v-if="!isDelete" class="btn bg-red white full" @click="isDelete = true">Удалить предмет</button>
                <div class="modal__remove" v-else>
                    <button class="btn bg-white mr-10" @click="isDelete = false">Отмена</button>
                    <button class="btn bg-red white full" @click="confirm">Подтвердить</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ItemProps } from '../types'
import { useImage } from '../helpers/useImage'
import { ref } from 'vue'

const props = defineProps<ItemProps>()
const emit = defineEmits({
    close_modal: null,
    confirm: null
})

const isDelete = ref<Boolean>(false)
const count = ref<number>()
const confirm = () => {
    emit('confirm', {count: count, id: props.Inventory?.id})
    count.value = 0
}
</script>

<style>
.mr-10 {
    margin-right: 10px;
}
</style>