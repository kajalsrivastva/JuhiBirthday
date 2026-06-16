$urls = @(
  "https://youtu.be/J_d_Q3pTYcc?si=e3g1mXpIQKUmVcWz",
  "https://youtu.be/m66aEQ3Ssdw?si=Pw50twfCb3yzHZ4S",
  "https://youtu.be/rxMmistOjCA?si=sACXI_PCEI-DbC1G",
  "https://youtu.be/WZ_U_nDi-Zs?si=UCaonpKCFqhcmWeA",
  "https://youtu.be/SzTmJklgIM8?si=WBnyoOFU6cM2alQz",
  "https://youtu.be/aApToDlkBzc?si=sJp8M3SpqM85ZUyv",
  "https://youtu.be/efdx68lDKBw?si=YuU96KD8DxSb2Pi1",
  "https://youtu.be/zC3UbTf4qrM?si=CvOuvicntUOHq7Hs",
  "https://youtu.be/WzvGrz-wNMs?si=SquHFKQ_Wbp1I4Ps",
  "https://youtu.be/8ZPhtWRtntU?si=7TTDGv8RjyI7f8AS",
  "https://youtu.be/UNs50T6EYwE?si=rLLdohluqj71oO-T",
  "https://youtu.be/C8kSrkz8Hz8?si=CWhD_H5k753M6qy6",
  "https://youtu.be/waCexeCPGlw?si=e8VQzBzXWl5zHju6",
  "https://youtu.be/pwKmLIPvEjI?si=HPajFex_0AQFocet",
  "https://youtu.be/i52TYO13Nyg?si=JEU0262_AMQuUyM8",
  "https://youtu.be/3CDOd4GdcUQ?si=pBKWnGlQzSHD2tv1",
  "https://youtu.be/sUf2PtEZris?si=MRVWCc6JcVs-FpSa",
  "https://youtu.be/rxMmistOjCA?si=F9QWqwwVIrZDU5gk"
)

New-Item -ItemType Directory -Force -Path "public\songs\yt_music"

$i = 1
foreach ($url in $urls) {
  $filename = "song_$i.m4a"
  $filepath = "public\songs\yt_music\$filename"
  Write-Host "Downloading $url to $filepath"
  .\yt-dlp.exe -f "bestaudio[ext=m4a]/bestaudio" -o $filepath $url
  $i++
}
