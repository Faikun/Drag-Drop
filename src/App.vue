<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue'
import type { inventoryType } from './types'
import InventoryItem from './components/InventoryItem.vue'
import ModalBlock from './components/ModalBlock.vue'
import ModalNotification from './components/ModalNotification.vue';

const size = [5, 5]
const modal = ref(false)
const modalData = ref()
const isSkeleton = ref(true)

onMounted(() => {
  const items: string | null = localStorage.getItem('inventory')
  if (items) {
    console.log(inventory);
    inventory.value = JSON.parse(items)
  }
  else {
    inventory.value = [
      {
        id: 0,
        count: 4,
        coordinates: [1, 1],
        img: 'icons/green_square.png'
      },
      {
        id: 1,
        count: 2,
        coordinates: [2, 1],
        img: 'icons/brown_square.png'
      },
      {
        id: 2,
        count: 5,
        coordinates: [3, 1],
        img: 'icons/bluepurple_square.png'
      },
    ]
  }
})

const inventory = ref<inventoryType[]>()

function findInventory(x: number, y: number) {
  if (inventory.value) {
    return inventory.value.find(item => item.coordinates[0] === y && item.coordinates[1] === x)
  }
}

function onNotification(text: string) {
  notificationText.value = text
  isNotification.value = true
  setTimeout(() => {
    isNotification.value = false
  }, 2000);
}

function onDrop(e: DragEvent, newCoordinates: number[]) {
  if (e.dataTransfer) {
    const itemId = parseInt(e.dataTransfer.getData('itemId'))

    if (findInventory(newCoordinates[1], newCoordinates[0])) {
      onNotification('Данная ячейка занята, выберите другую')
      return
    }

    if (inventory.value) {
      inventory.value = inventory.value.map(x => {
      if (x.id == itemId)
        x.coordinates = newCoordinates
      return x
      })
      localStorage.setItem('inventory', JSON.stringify(inventory.value))
    }
  }
}

const openModal = (e: inventoryType) => {
  modal.value = true
  modalData.value = e
}

const confirm = function (data: {count: Ref<number>, id: number}) {
  if (inventory.value) {
    const confirmedItem = inventory.value.find(el => el.id === data.id)
    if (confirmedItem?.count) {
      if (confirmedItem.count <= data.count.value) {
        inventory.value = inventory.value.filter(el => el !== confirmedItem)
        modal.value = false
        onNotification('Предмет удалён полностью')
      }
      else {
        confirmedItem.count -= data.count.value
        onNotification('Предмет удалён частично')
      }
      localStorage.setItem('inventory', JSON.stringify(inventory.value))
    }
  }
}

const notificationText = ref('')
const isNotification = ref(false)
</script>

<template>
  <div class="content">
    <aside class="aside">
      <img class="aside__image" src="./assets/images/images/aside-img.png" alt="aside">
      <img class="aside__skeleton" src="./assets/images/images/Skeletons.png" alt="skeleton">
    </aside> <!-- ./aside -->

    <table class="inventory">
      <tr v-for="x in size[0]" :key="x">
        <td
          v-for="y in size[1]"
          :key="y"
          @drop="onDrop($event, [y, x])"
          @dragover.prevent
          @dragenter.prevent
        >
          <inventory-item
            :Inventory="findInventory(x,y)"
            @openModal="openModal"
          >
            </inventory-item>
        </td>
      </tr>
      <Transition>
        <modal-block
          :Inventory="modalData"
          v-if="modal"
          @close_modal="modal = false"
          @confirm="confirm"
        />
      </Transition>
    </table> <!-- ./inventory -->
    
    <div class="skeleton" v-if="isSkeleton">
      <img class="skeleton__image" src="./assets/images/images/Skeleton-linear.png" alt="skeleton">
      <img class="skeleton__close" src="./assets/images/icons/carbon_close.png" alt="close" @click="isSkeleton = false">
    </div> <!-- ./skeleton -->

    <Teleport to="body">]
      <Transition name="notification">
        <modal-notification v-if="isNotification" :text="notificationText"/>
      </Transition>
    </Teleport>
  </div> <!-- ./content -->


</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 1s ease;
}

.v-enter-from,
.v-leave-to {
  transform: translateX(600px);
}

.notification-enter-active,
.notification-leave-active {
  transition: opacity .5s ease;
}

.notification-enter-from,
.notification-leave-to {
  opacity: 0;
}
</style>
