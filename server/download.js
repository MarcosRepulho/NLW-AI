import ytdl from "ytdl-core"

import fs from "fs"
import { resolve } from "path"

export const download = (videoId) => new Promise((resolve, reject) => {

  const videoURL = "https://www.youtube.com/shorts/" + videoId
  console.log('Realizando download do video:', videoId)

  ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
    .on("info", (info) => {
      const seconds = info.formats[0].approxDurationMs / 1000
      console.log(seconds)

      if (seconds > 60) {
        throw new Error("duracao maior que 60 segundos")
      }
    })
    .on("end", () => {
      console.log("download finalizado")
      resolve()

    })

    .on("error", (error) => {
      console.log("nao foi possivel fazer o download do video. Detalhes do erro:", error
      )

      reject(error)

    })

    .pipe(fs.createWriteStream("./tmp/audio.mp4"))

})
