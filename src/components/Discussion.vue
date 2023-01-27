<template>
    <div class="discussion-body">
        <div class="start-discussion-section">
            <Avatar :user="user" />
            <input
                type="text"
                placeholder="start a discussion"
                class="text-input"
                v-model="newDiscussionText"
                @keyup.enter="submitDiscussion"
            />
        </div>
        <section class="discussions-section">
            <ul class="discussion-list">
                <li
                    v-for="discussion in discussions"
                    :key="discussion.id"
                    class="discussion-item"
                >
                    <Avatar :user="discussion.user" />
                    <div class="discussion-detail">
                        <div class="detail-header">
                            <div class="user-name">
                                {{  discussion.user.name }}
                            </div>
                            <div class="time">
                                {{ calculateTimeAgo(discussion.date) }} ago
                            </div>
                        </div>
                        <p class="text">
                            {{ discussion.text }}
                        </p>
                        <div class="discussion-footer">
                            <div
                                class="like"
                                :class="{
                                    'liked': discussion.iLikedIt
                                }"
                                @click="toggleLike(discussion)"
                            >
                                <LikeIcon
                                    :color="discussion.iLikedIt ? '#fff' : '#000'"
                                />
                                <span class="count">
                                    {{  discussion.likes }}
                                </span>
                            </div>
                            <button
                                class="reply-button"
                                @click="openReplyInput(discussion)"
                            >
                                Reply
                            </button>
                        </div>
                        
                        <ul class="comment-list">
                            <li
                                v-for="comment in discussion.replies"
                                :key="comment.id"
                            >
                             <Comment :comment="comment" />
                            </li>
                        </ul>
                        <div
                            v-if="openedReplyDiscussionId == discussion.id"
                            class="reply-section"
                        >
                            <Avatar :user="user" />
                            <input
                                type="text"
                                placeholder="Reply"
                                class="text-input"
                                v-model="newReplyText"
                                @keyup.enter="replyDiscussion(discussion)"
                                ref="replyInput"
                            />
                        </div>
                    </div>
                </li>
            </ul>
        </section>
    </div>
</template>

<script setup lang="ts">
import type IDiscussion from "@/types/IDiscussion";
import type { PropType } from "vue";
import { ref } from "vue";
import Avatar from "@/components/Avatar.vue";
import LikeIcon from "@/components/LikeIcon.vue";
import type IUser from "@/types/IUser";
import Comment from "@/components/Comment.vue";
import { calculateTimeAgo, toggleLike } from "@/composables/useComment";
import type IComment from "@/types/IComment";

const props = defineProps({
    discussions: {
        type: Array as PropType<Array<IDiscussion>>,
        required: true,
    }
})

const emit = defineEmits<{
  (e: 'submit-new-discussion', discussion: IDiscussion): void
}>()

// Usually we get user from store after authentication
// but for simplicity I implement it like this
const user : IUser = {
    name: "Beau Lebens",
    avatar: "https://1.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
} 

const newDiscussionText = ref<String>('')

function submitDiscussion() {
    const newDiscussion: IDiscussion = {
        // this id must generated in backend and then we use it
        // but because there is no backend in this challenge
        // I implemented it in this way
        id: props.discussions.reduce((a, b) => a + b.replies.length + 1, 0) + 1,
        date: new Date().valueOf(),
        user: user,
        text: newDiscussionText.value.toString(),
        likes: 0,
        iLikedIt: false,
        replies: [],
    }
        
    emit('submit-new-discussion', newDiscussion)
    
    newDiscussionText.value = ''
}

const newReplyText = ref<String>('')

function replyDiscussion(discussion: IDiscussion) {
    const newComment: IComment = {
        // this id must generated in backend and then we use it
        // but because there is no backend in this challenge
        // I implemented it in this way
        id: props.discussions.reduce((a, b) => a + b.replies.length + 1, 0) + 1,
        date: new Date().valueOf(),
        user: user,
        text: newReplyText.value.toString(),
        likes: 0,
        iLikedIt: false,
    }

    discussion.replies.push(newComment)

    // to close the reply input
    openedReplyDiscussionId.value = -1

    newReplyText.value = ''
}

const openedReplyDiscussionId = ref<Number>(-1)
const replyInput = ref()

function openReplyInput(discussion: IDiscussion) {
    openedReplyDiscussionId.value = discussion.id
    setTimeout(() => {
        replyInput.value[0].focus()
    }, 100)
}
</script>

<style scoped lang="scss">
.discussion-body {
    background: #ebeff3;
    padding: 5px;
    .start-discussion-section,
    .reply-section {
        display: flex;
        align-items: center;
        background: #fafbfc;
        border-radius: 10px 10px 0 0;
        padding: 20px 15px;
    }
    .reply-section {
        background: none;
    }
    .text-input {
        width: 100%;
        height: 45px;
        border-radius: 5px;
        border: 2px solid #e6ebf0;
        padding: 0 15px;

        &::placeholder {
            color: #9aa3bb;
        }
    }
    .discussions-section {
        background: #fff;
        min-height: calc(100vh - 95px);

        .discussion-list {
            padding: 0;
            list-style: none;
            
            .discussion-item {
                padding: 15px;
                border-top: 1px solid #e6ecf0;
                display: flex;

                .discussion-detail {
                    width: 100%;
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

                .discussion-footer {
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
                    .reply-button {
                        color: #3d71ea;
                        background: none;
                        border: none;
                        cursor: pointer;
                        margin-left: 5px;
                        font-weight: 600;
                    }
                }
                .comment-list {
                    list-style: none;
                    padding: 0;
                    margin-top: 10px;
                }
            }
        }
    }
}
</style>
