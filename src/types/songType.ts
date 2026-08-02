export type Song = {
    id : number,
    title : string,
    artist:string,
    cover:string,
    audio : string,
    duration:number,
    genre : "Rock" | "EDM" | "Pop" | "Hip-Hop" | "Metal" | "Classic"
}