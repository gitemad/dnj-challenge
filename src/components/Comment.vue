<template>
    <div class="comment-item">
        <Avatar :user="comment.user" />
        <div class="comment-detail">
            <div class="detail-header">
                <div class="user-name">
                    {{  comment.user.name }}
                </div>
                <div class="time">
                    {{ calculateTimeAgo(comment.date) }} ago
                </div>
            </div>
            <p class="text">
                {{ comment.text }}
            </p>
            <div class="comment-footer">
                <div
                    class="like"
                    :class="{
                        'liked': comment.iLikedIt
                    }"
                    @click="toggleLike(comment)"
                >
                    <LikeIcon
                        :color="comment.iLikedIt ? '#fff' : '#000'"
                    />
                    <span class="count">
                        {{  comment.likes }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import Avatar from "@/components/Avatar.vue";
import LikeIcon from "@/components/LikeIcon.vue";
import type IComment from "@/types/IComment";
import { calculateTimeAgo, toggleLike } from "@/composables/useComment";

defineProps({
    comment: {
        type: Object as PropType<IComment>,
        required: true,
    }
})
</script>

<style scoped lang="scss">
.comment-item {
    padding: 15px;
    display: flex;

    .comment-detail {
        display: flex;
        flex-direction: column;
        .detail-header {
            display: flex;
            .user-name {
                font-weight: 600;
                margin-right: 10px;
            }
            .time {
                color: #a0a8bf;
            }
        }

        .text {
            color: #555f68;
        }
    }

    .comment-footer {
        display: flex;
        .like {
            display: flex;
            align-items: center;
            border-radius: 50px;
            background: #f4f5fa;
            padding: 0 15px;
            cursor: pointer;
            transition: all 0.3s;
            .count {
                color: #000;
                margin-left: 5px;
            }
        }
        .liked {
            background: #235ee7;
            .count {
                color: #fff;
            }
        }
    }
}
</style>
