<template>
    <img
        v-if="user.avatar"
        :src="user.avatar"
        :width="size"
        :height="size"
        class="avatar"
    />
    <div
        v-else
        class="avatar"
        :style="`width: ${size}px; height: ${size}px`"
    >
        <span class="text">
            {{ userNameSplited[0][0] }}{{ userNameSplited?.[1]?.[0] }}
        </span>
    </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import { computed } from "vue";
import type IUser from '@/types/IUser';

const props = defineProps({
    user: {
        type: Object as PropType<IUser>,
        required: true,
    },
    size: {
        type: Number,
        default: 45,
    },
})

const userNameSplited = computed(() => {
    return props.user.name.split(' ')
})
</script>
<style scoped lang="scss">
    .avatar {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        margin-right: 15px;
        background: #deedfc;
        .text {
            color: #175fa3;
            font-weight: 600;
        }
    }
</style>