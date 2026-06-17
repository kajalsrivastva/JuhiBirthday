$urls = @(
  "https://youtu.be/ZKFeodUKkxw?si=8VAYJBC7_DYVB89S",
  "https://youtu.be/rW9_-dVCmrM?si=5Vjgscr5xGivIP5U",
  "https://youtu.be/Ee_9J9lGgS0?si=31vhffCM3J5yK03I",
  "https://youtu.be/IFYJNLZT_B0?si=IInAAwhmMJ-Q49T4",
  "https://youtu.be/KxCjVIFxZNo?si=GP9On2Kug_Mjh8p8",
  "https://youtu.be/CIORW-UrH6Y?si=Ulwu966sABKEahb2",
  "https://youtu.be/YyepU5ztLf4?si=TidRVtvjaTX26h5z",
  "https://youtu.be/jWPQnqYC6Pg?si=BWjh7_xeBD0oL4qg",
  "https://youtu.be/GFljvZMZI0U?si=jBO0fxQWYdDe2HvU",
  "https://youtu.be/ypSSrlyi5RQ?si=rbHnB6ihUbVadicM",
  "https://youtu.be/kT5bDApaX_0?si=OPVBtHUndgUkUnPh",
  "https://youtu.be/LYEqeUr-158?si=HZXoz2FneODXWLF2",
  "https://youtu.be/1cDoRqPnCXU?si=cg0TUTCrzYQGoCy0",
  "https://youtu.be/jCEdTq3j-0U?si=2hlh3zvHJbxVcZ-5",
  "https://youtu.be/HgIW7P4dsXU?si=tWdTV1I6n2j4VdLu",
  "https://youtu.be/mwFGCLIJJ7k?si=qqOBfN42syM8UkOS",
  "https://youtu.be/eatYXfscY9Q?si=2d3fT-GuH6v5UXLR",
  "https://youtu.be/XLqmL9cPN1E?si=S4iSwRZbyNuYAlqg",
  "https://youtu.be/UbMgcdmYC70?si=7X71NRp5v88rb-Gl",
  "https://youtu.be/W2mjfazc9eM?si=pNYBHQYnmeU5PcNE",
  "https://youtu.be/Q7ZMrWQmJbQ?si=7gapg3fAzh7z0V2V",
  "https://youtu.be/mcL6ZErM49Q?si=qYKjMU63Z5wnrDBP",
  "https://youtu.be/iEJPDYrLtsI?si=6jR3DuxgZ8w36Otc",
  "https://youtu.be/VAt6TO2gdko?si=RzVL0WATQd-g8ZEK",
  "https://youtu.be/9a4izd3Rvdw?si=SLT821ZuGYzmzcLV",
  "https://youtu.be/aNcxgxHcGYg?si=8kF1nU0cqTyT4DkM",
  "https://youtu.be/smn3mDBOUy4?si=Cj2fyTUVnMQZlM05",
  "https://youtu.be/kzTWRX9Dhrg?si=SflZDb1jey0iE6Ux",
  "https://youtu.be/EEX_XM6SxmY?si=F0ktp64OtXhtHbp4",
  "https://youtu.be/LwjR20lX4aY?si=hbrmngEPhDCilcr6",
  "https://youtu.be/iZ5UItyEpGE?si=F04KkUU4aXViM5bW",
  "https://youtu.be/2Psd1XZxjOE?si=k_lpJhZKnW67vn54"
)

$i = 19
foreach ($url in $urls) {
  $filename = "song_$i.m4a"
  $filepath = "public\songs\yt_music\$filename"
  Write-Host "Downloading $url to $filepath"
  .\yt-dlp.exe -f "bestaudio[ext=m4a]/bestaudio" -o $filepath $url
  $i++
}
