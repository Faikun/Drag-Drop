<template>
    <div
        class="inventory__item"
        v-if="Inventory"
        @dragstart="onDragStart($event, Inventory)"
        draggable="true"
        @click="$emit('openModal', Inventory)"
    >
        <img class="inventory__image" :src="useImage(Inventory.img)" alt="image">
        <span class="inventory__count">{{ Inventory.count }}</span>
</div>
</template>

<script setup lang="ts">
import type { inventoryType } from '../types'
import type { ItemProps } from '../types'
import { useImage } from '../helpers/useImage'

defineProps<ItemProps>()
defineEmits({
    'openModal': null
})

function onDragStart(e: DragEvent, item: inventoryType) {
    if (e.dataTransfer) {
        e.dataTransfer.dropEffect = 'move'
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('itemId', item.id.toString())
    }
}



</script>
../helpers/useImage