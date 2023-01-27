import type IComment from "@/types/IComment";

// Basic implementation of time ago library
function calculateTimeAgo(time: number) {
    const now = new Date().valueOf()
    const dateDiffMilliSeconds = now - time
    const dateDiffSeconds = Math.floor(dateDiffMilliSeconds / 1000)
    const dateDiffMinutes = Math.floor(dateDiffSeconds / 60)
    const dateDiffHours = Math.floor(dateDiffMinutes / 60)
    const dateDiffDays = Math.floor(dateDiffHours / 24)
    const dateDiffMonths = Math.floor(dateDiffDays / 30)
    const dateDiffYears = Math.floor(dateDiffMonths / 12)

    return dateDiffYears ?
        `${dateDiffYears} years` :
        dateDiffMonths ?
        `${dateDiffMonths} months` :
        dateDiffDays ?
        `${dateDiffDays} days` :
        dateDiffHours ?
        `${dateDiffHours} hours` :
        dateDiffMinutes ?
        `${dateDiffMinutes} minutes` :
        dateDiffSeconds ?
        `${dateDiffSeconds} seconds` :
        `${dateDiffMilliSeconds} milliseconds`
}

function toggleLike(comment: IComment) {
    comment.iLikedIt = !comment.iLikedIt
    comment.iLikedIt ? comment.likes++ : comment.likes--
}

export {
    calculateTimeAgo,
    toggleLike,
}