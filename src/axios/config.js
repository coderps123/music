let base_url = ""

if (process.env.NODE_ENV === "development") {
  base_url = "http://localhost:3000"
} else if (process.env.NODE_ENV === "production") {
  base_url = "https://nicemusic-api.lxhcool.cn/"
}

export default { base_url }
