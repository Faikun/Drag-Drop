<script setup lang="ts">
import type { Notification } from '../types'
defineProps<Notification>()
</script>

<template>
    <div class="notification">
        <span>{{ text }}</span>
    </div>
</template>