import type IComment from "@/types/IComment";

interface IDiscussion extends IComment {
    replies: IComment[];
}

export default IDiscussion;