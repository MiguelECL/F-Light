export const handleSort = (flag: number) => {
    const SORTURL = import.meta.env.SORTURL

    fetch(SORTURL + flag, {
        method: "GET"
    }).then(() => {

    })


}