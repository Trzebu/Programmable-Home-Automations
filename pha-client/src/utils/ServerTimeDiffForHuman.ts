import moment from "moment"

export const serverTimeDiffForHuman = (time: number) => {
    return moment(time * 1000).fromNow();
}