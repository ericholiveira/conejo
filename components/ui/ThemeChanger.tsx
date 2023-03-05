import { useEffect } from 'react'
import { themeChange } from 'theme-change'
type ThemeChangerProps = {
  show?:boolean
}

export default function ThemeChanger(props:ThemeChangerProps) {
  useEffect(() => {
    themeChange(false)
    // 👆 false parameter is required for react project
  }, [])
  const themes= ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"]
  
  return (
    props.show?(
    <select data-choose-theme>
      <option value="">Choose Theme</option>
      {themes.map(t=>(<option key={t} value={t}>{t}</option>))}
    </select>
    ):<></>
  )
}