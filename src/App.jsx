import { useState } from 'react'
import './App.css'

const defaultPoster = {
  mainText: '\uc0c1\uc0c1\n\ud3ec\uc2a4\ud130',
  subText: '\uc778\ud130\ub799\ud2f0\ube0c \ud3ec\uc2a4\ud130 \uc2e4\ud5d8\uc2e4 / 2026',
  backgroundStyle: 'gradient',
  textEffect: 'shadow',
  fontSize: 72,
  letterSpacing: 2,
}

const backgroundOptions = ['gradient', 'dark', 'neon', 'paper']
const effectOptions = ['normal', 'shadow', 'neon', 'glitch']

const backgroundLabels = {
  gradient: '\uadf8\ub77c\ub370\uc774\uc158',
  dark: '\ub2e4\ud06c',
  neon: '\ub124\uc628',
  paper: '\uc885\uc774',
}

const effectLabels = {
  normal: '\uae30\ubcf8',
  shadow: '\uadf8\ub9bc\uc790',
  neon: '\ub124\uc628',
  glitch: '\uae00\ub9ac\uce58',
}

const uiLabels = {
  controlPanel: '\ud3ec\uc2a4\ud130 \ucee8\ud2b8\ub864 \ud328\ub110',
  appName: '\ud3ec\uc2a4\ud130 \uc0dd\uc131\uae30',
  title: '\ud3ec\uc2a4\ud130 \uc2e4\ud5d8\uc2e4',
  intro:
    '\ud14d\uc2a4\ud2b8\uc640 \ubd84\uc704\uae30\ub97c \ubc14\uafb8\uba74 \uc624\ub978\ucabd \ud3ec\uc2a4\ud130\uac00 \uc989\uc2dc \ubc18\uc751\ud569\ub2c8\ub2e4.',
  mainText: '\uba54\uc778 \ubb38\uad6c',
  subText: '\uc11c\ube0c \ubb38\uad6c',
  backgroundStyle: '\ubc30\uacbd \uc2a4\ud0c0\uc77c',
  textEffect: '\ud14d\uc2a4\ud2b8 \ud6a8\uacfc',
  fontSize: '\ud3f0\ud2b8 \ud06c\uae30',
  letterSpacing: '\uc790\uac04',
  randomDesign: '\ub79c\ub364 \ub514\uc790\uc778',
  reset: '\ucd08\uae30\ud654',
  download: '\uc774\ubbf8\uc9c0 \uc800\uc7a5',
  downloading: '\uc800\uc7a5 \uc911...',
  preview: '\ud3ec\uc2a4\ud130 \ubbf8\ub9ac\ubcf4\uae30',
  posterKicker: '\uc2dc\uac01 \uc2e4\ud5d8 01',
  downloadError:
    '\uc774\ubbf8\uc9c0 \uc800\uc7a5 \uc911 \ubb38\uc81c\uac00 \uc0dd\uacbc\uc2b5\ub2c8\ub2e4.',
}

const randomMainTexts = [
  '\ud06c\uac8c\n\uc678\uccd0',
  '\ud53d\uc140\uc758\n\uafc8',
  '\uc6f9\n\ud3ec\uc2a4\ud130',
  '\ub124\uc628\n\ubb34\ub4dc',
  '\ub514\uc790\uc778\n\ub180\uc774',
]

const randomSubTexts = [
  '\ud504\ub860\ud2b8\uc5d4\ub4dc \uc2dc\uac01 \uc2e4\ud5d8',
  '\ud37c\ube14\ub9ac\uc2f1 \uc5f0\uad6c \ub178\ud2b8',
  '\ub514\uc9c0\ud138 \ub9e4\uac70\uc9c4 \ucee4\ubc84',
  '\ub9ac\uc561\ud2b8 \ud3ec\uc2a4\ud130 \ub180\uc774\ud130',
  '\ucc3d\uc758\uc801\uc778 \uc6f9 \ub514\ub809\uc158',
]

const posterExportSize = {
  width: 1600,
  height: 2000,
}

function App() {
  const [posterSettings, setPosterSettings] = useState(defaultPoster)
  const [isDownloading, setIsDownloading] = useState(false)

  const updatePosterSetting = (settingName, value) => {
    setPosterSettings((currentSettings) => ({
      ...currentSettings,
      [settingName]: value,
    }))
  }

  const pickRandomItem = (items) => {
    const randomIndex = Math.floor(Math.random() * items.length)
    return items[randomIndex]
  }

  const makeRandomDesign = () => {
    setPosterSettings({
      mainText: pickRandomItem(randomMainTexts),
      subText: pickRandomItem(randomSubTexts),
      backgroundStyle: pickRandomItem(backgroundOptions),
      textEffect: pickRandomItem(effectOptions),
      fontSize: Math.floor(Math.random() * 43) + 56,
      letterSpacing: Math.floor(Math.random() * 9) - 2,
    })
  }

  const resetDesign = () => {
    setPosterSettings(defaultPoster)
  }

  const makeRoundedRect = (context, x, y, width, height, radius) => {
    context.beginPath()
    context.moveTo(x + radius, y)
    context.lineTo(x + width - radius, y)
    context.quadraticCurveTo(x + width, y, x + width, y + radius)
    context.lineTo(x + width, y + height - radius)
    context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
    context.lineTo(x + radius, y + height)
    context.quadraticCurveTo(x, y + height, x, y + height - radius)
    context.lineTo(x, y + radius)
    context.quadraticCurveTo(x, y, x + radius, y)
    context.closePath()
  }

  const fillCircleGradient = (context, x, y, radius, color) => {
    const gradient = context.createRadialGradient(x, y, 0, x, y, radius)
    gradient.addColorStop(0, color)
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
    context.fillStyle = gradient
    context.fillRect(0, 0, posterExportSize.width, posterExportSize.height)
  }

  const drawGrid = (context, gap, color) => {
    context.strokeStyle = color
    context.lineWidth = 3

    for (let x = 0; x <= posterExportSize.width; x += gap) {
      context.beginPath()
      context.moveTo(x, 0)
      context.lineTo(x, posterExportSize.height)
      context.stroke()
    }

    for (let y = 0; y <= posterExportSize.height; y += gap) {
      context.beginPath()
      context.moveTo(0, y)
      context.lineTo(posterExportSize.width, y)
      context.stroke()
    }
  }

  const drawPosterBackground = (context, backgroundStyle) => {
    if (backgroundStyle === 'paper') {
      context.fillStyle = '#f5edcf'
      context.fillRect(0, 0, posterExportSize.width, posterExportSize.height)
      drawGrid(context, 80, 'rgba(23, 18, 15, 0.08)')
      fillCircleGradient(context, 1280, 360, 480, 'rgba(255, 78, 205, 0.52)')
      return
    }

    if (backgroundStyle === 'dark') {
      context.fillStyle = '#08090f'
      context.fillRect(0, 0, posterExportSize.width, posterExportSize.height)
      drawGrid(context, 104, 'rgba(113, 242, 255, 0.12)')
      fillCircleGradient(context, 1180, 480, 560, 'rgba(255, 78, 205, 0.36)')
      return
    }

    if (backgroundStyle === 'neon') {
      const gradient = context.createLinearGradient(0, 0, posterExportSize.width, posterExportSize.height)
      gradient.addColorStop(0, '#101323')
      gradient.addColorStop(0.58, '#28134f')
      gradient.addColorStop(1, '#05040a')
      context.fillStyle = gradient
      context.fillRect(0, 0, posterExportSize.width, posterExportSize.height)
      fillCircleGradient(context, 420, 360, 520, 'rgba(113, 242, 255, 0.92)')
      fillCircleGradient(context, 1200, 1400, 560, 'rgba(255, 78, 205, 0.86)')
      return
    }

    const gradient = context.createLinearGradient(0, 0, posterExportSize.width, posterExportSize.height)
    gradient.addColorStop(0, '#ff4ecd')
    gradient.addColorStop(0.48, '#6737ff')
    gradient.addColorStop(1, '#101323')
    context.fillStyle = gradient
    context.fillRect(0, 0, posterExportSize.width, posterExportSize.height)
    fillCircleGradient(context, 280, 400, 520, 'rgba(255, 231, 102, 0.9)')
    fillCircleGradient(context, 1320, 340, 560, 'rgba(113, 242, 255, 0.9)')
  }

  const drawPosterDecorations = (context, backgroundStyle) => {
    const inkColor = backgroundStyle === 'paper' ? '#17120f' : '#ffffff'

    context.save()
    context.strokeStyle = backgroundStyle === 'paper' ? 'rgba(23, 18, 15, 0.22)' : 'rgba(255, 255, 255, 0.24)'
    context.lineWidth = 3
    makeRoundedRect(context, 56, 56, posterExportSize.width - 112, posterExportSize.height - 112, 70)
    context.stroke()
    context.restore()

    context.save()
    context.strokeStyle = inkColor
    context.globalAlpha = 0.22
    context.lineWidth = 7
    context.translate(460, 380)
    context.rotate((-18 * Math.PI) / 180)
    context.beginPath()
    context.ellipse(0, 0, 580, 145, 0, 0, Math.PI * 2)
    context.stroke()
    context.restore()

    context.save()
    context.strokeStyle = inkColor
    context.globalAlpha = 0.22
    context.lineWidth = 7
    context.translate(1280, 1500)
    context.rotate((24 * Math.PI) / 180)
    context.beginPath()
    context.ellipse(0, 0, 460, 112, 0, 0, Math.PI * 2)
    context.stroke()
    context.restore()

    context.save()
    context.translate(1420, 1800)
    context.rotate((45 * Math.PI) / 180)
    context.globalAlpha = 0.42
    context.strokeStyle = backgroundStyle === 'paper' ? 'rgba(23, 18, 15, 0.34)' : 'rgba(255, 255, 255, 0.32)'
    context.lineWidth = 14
    context.beginPath()
    context.arc(0, 0, 320, 0, Math.PI * 2)
    context.clip()
    for (let x = -420; x <= 420; x += 54) {
      context.beginPath()
      context.moveTo(x, -420)
      context.lineTo(x, 420)
      context.stroke()
    }
    context.restore()
  }

  const measureLetterSpacedText = (context, text, letterSpacing) => {
    const letters = Array.from(text)
    const spacingWidth = Math.max(letters.length - 1, 0) * letterSpacing
    return context.measureText(text).width + spacingWidth
  }

  const drawLetterSpacedText = (context, text, x, y, letterSpacing) => {
    let currentX = x

    Array.from(text).forEach((letter) => {
      context.fillText(letter, currentX, y)
      currentX += context.measureText(letter).width + letterSpacing
    })
  }

  const drawPosterLine = (context, line, x, y, letterSpacing, color, effect) => {
    context.save()
    context.fillStyle = color

    if (effect === 'shadow') {
      context.fillStyle = 'rgba(255, 78, 205, 0.72)'
      drawLetterSpacedText(context, line, x + 22, y + 22, letterSpacing)
      context.fillStyle = 'rgba(113, 242, 255, 0.42)'
      drawLetterSpacedText(context, line, x + 44, y + 44, letterSpacing)
      context.fillStyle = color
    }

    if (effect === 'neon') {
      context.shadowColor = '#71f2ff'
      context.shadowBlur = 46
      context.fillStyle = '#ffffff'
    }

    if (effect === 'glitch') {
      context.fillStyle = '#71f2ff'
      drawLetterSpacedText(context, line, x + 14, y - 10, letterSpacing)
      context.fillStyle = '#ff4ecd'
      drawLetterSpacedText(context, line, x - 14, y + 10, letterSpacing)
      context.fillStyle = color
    }

    drawLetterSpacedText(context, line, x, y, letterSpacing)
    context.restore()
  }

  const drawPosterText = (context, settings) => {
    const isPaper = settings.backgroundStyle === 'paper'
    const textColor = isPaper ? '#17120f' : '#ffffff'
    const accentColor = isPaper ? '#17120f' : '#ffffff'
    const scaledTitleSize = settings.fontSize * 3.04
    const scaledLetterSpacing = settings.letterSpacing * 3.04
    const titleLines = settings.mainText.toUpperCase().split('\n')

    context.textBaseline = 'top'
    context.fillStyle = accentColor
    context.font = '900 42px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    drawLetterSpacedText(context, uiLabels.posterKicker.toUpperCase(), 136, 136, 8)

    let titleSize = scaledTitleSize
    const maxTitleWidth = posterExportSize.width - 272
    while (titleSize > 92) {
      context.font = `1000 ${titleSize}px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
      const widestLine = Math.max(
        ...titleLines.map((line) => measureLetterSpacedText(context, line, scaledLetterSpacing)),
      )

      if (widestLine <= maxTitleWidth) {
        break
      }

      titleSize -= 8
    }

    context.font = `1000 ${titleSize}px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
    const lineHeight = titleSize * 0.86
    const titleBlockHeight = titleLines.length * lineHeight
    let titleY = (posterExportSize.height - titleBlockHeight) * 0.46

    titleLines.forEach((line) => {
      drawPosterLine(
        context,
        line,
        136,
        titleY,
        scaledLetterSpacing,
        textColor,
        settings.textEffect,
      )
      titleY += lineHeight
    })

    context.save()
    context.fillStyle = textColor
    context.font = '800 58px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    const subTextLines = wrapText(context, settings.subText, 980)
    subTextLines.forEach((line, index) => {
      context.fillText(line, 136, 1510 + index * 76)
    })
    context.restore()

    context.save()
    context.fillStyle = textColor
    context.font = '900 36px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    drawLetterSpacedText(context, backgroundLabels[settings.backgroundStyle], 136, 1844, 6)
    const effectLabel = effectLabels[settings.textEffect]
    const effectWidth = measureLetterSpacedText(context, effectLabel, 6)
    drawLetterSpacedText(context, effectLabel, posterExportSize.width - 136 - effectWidth, 1844, 6)
    context.restore()
  }

  const wrapText = (context, text, maxWidth) => {
    const words = text.split(' ')
    const lines = []
    let currentLine = ''

    words.forEach((word) => {
      const testLine = currentLine ? `${currentLine} ${word}` : word

      if (context.measureText(testLine).width > maxWidth && currentLine) {
        lines.push(currentLine)
        currentLine = word
      } else {
        currentLine = testLine
      }
    })

    if (currentLine) {
      lines.push(currentLine)
    }

    return lines.slice(0, 3)
  }

  const drawPosterToCanvas = (settings) => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    canvas.width = posterExportSize.width
    canvas.height = posterExportSize.height

    context.save()
    makeRoundedRect(context, 0, 0, posterExportSize.width, posterExportSize.height, 86)
    context.clip()
    drawPosterBackground(context, settings.backgroundStyle)
    drawPosterDecorations(context, settings.backgroundStyle)
    drawPosterText(context, settings)
    context.restore()

    return canvas
  }

  const downloadPosterImage = async () => {
    if (isDownloading) {
      return
    }

    setIsDownloading(true)

    try {
      await document.fonts?.ready
      const canvas = drawPosterToCanvas(posterSettings)

      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Poster download failed: canvas.toBlob returned null')
          alert(uiLabels.downloadError)
          setIsDownloading(false)
          return
        }

        const objectUrl = URL.createObjectURL(blob)
        const downloadLink = document.createElement('a')
        downloadLink.download = 'interactive-poster.png'
        downloadLink.href = objectUrl
        downloadLink.click()
        setTimeout(() => URL.revokeObjectURL(objectUrl), 1000)
        setIsDownloading(false)
      }, 'image/png')
    } catch (error) {
      console.error('Poster download failed:', error)
      alert(uiLabels.downloadError)
      setIsDownloading(false)
     }
   }

  return (
    <main className="poster-generator">
      <section className="control-panel" aria-label={uiLabels.controlPanel}>
        <div className="panel-header">
          <p className="eyebrow">{uiLabels.appName}</p>
          <h1>{uiLabels.title}</h1>
          <p className="intro">{uiLabels.intro}</p>
        </div>

        <div className="control-group">
          <label htmlFor="mainText">{uiLabels.mainText}</label>
          <textarea
            id="mainText"
            value={posterSettings.mainText}
            onChange={(event) =>
              updatePosterSetting('mainText', event.target.value)
            }
            rows="3"
          />
        </div>

        <div className="control-group">
          <label htmlFor="subText">{uiLabels.subText}</label>
          <input
            id="subText"
            type="text"
            value={posterSettings.subText}
            onChange={(event) =>
              updatePosterSetting('subText', event.target.value)
            }
          />
        </div>

        <div className="control-group">
          <span className="control-label">{uiLabels.backgroundStyle}</span>
          <div className="option-grid">
            {backgroundOptions.map((backgroundStyle) => (
              <button
                key={backgroundStyle}
                type="button"
                className={
                  posterSettings.backgroundStyle === backgroundStyle
                    ? 'option-button active'
                    : 'option-button'
                }
                onClick={() =>
                  updatePosterSetting('backgroundStyle', backgroundStyle)
                }
              >
                {backgroundLabels[backgroundStyle]}
              </button>
            ))}
          </div>
        </div>

        <div className="control-group">
          <span className="control-label">{uiLabels.textEffect}</span>
          <div className="option-grid">
            {effectOptions.map((textEffect) => (
              <button
                key={textEffect}
                type="button"
                className={
                  posterSettings.textEffect === textEffect
                    ? 'option-button active'
                    : 'option-button'
                }
                onClick={() => updatePosterSetting('textEffect', textEffect)}
              >
                {effectLabels[textEffect]}
              </button>
            ))}
          </div>
        </div>

        <div className="control-group">
          <div className="range-heading">
            <label htmlFor="fontSize">{uiLabels.fontSize}</label>
            <span>{posterSettings.fontSize}px</span>
          </div>
          <input
            id="fontSize"
            type="range"
            min="44"
            max="104"
            value={posterSettings.fontSize}
            onChange={(event) =>
              updatePosterSetting('fontSize', Number(event.target.value))
            }
          />
        </div>

        <div className="control-group">
          <div className="range-heading">
            <label htmlFor="letterSpacing">{uiLabels.letterSpacing}</label>
            <span>{posterSettings.letterSpacing}px</span>
          </div>
          <input
            id="letterSpacing"
            type="range"
            min="-4"
            max="10"
            value={posterSettings.letterSpacing}
            onChange={(event) =>
              updatePosterSetting('letterSpacing', Number(event.target.value))
            }
          />
        </div>

        <div className="button-row">
          <button
            type="button"
            className="primary-button"
            onClick={makeRandomDesign}
          >
            {uiLabels.randomDesign}
          </button>
          <button type="button" className="ghost-button" onClick={resetDesign}>
            {uiLabels.reset}
          </button>
          <button
            type="button"
            className="download-button"
            onClick={downloadPosterImage}
            disabled={isDownloading}
          >
            {isDownloading ? uiLabels.downloading : uiLabels.download}
          </button>
        </div>
      </section>

      <section className="preview-section" aria-label={uiLabels.preview}>
        <div className="preview-stage">
          <article
            className={`poster-card ${posterSettings.backgroundStyle}`}
            style={{
              '--poster-font-size': `${posterSettings.fontSize}px`,
              '--poster-letter-spacing': `${posterSettings.letterSpacing}px`,
            }}
          >
            <div className="poster-noise"></div>
            <div className="poster-orbit orbit-one"></div>
            <div className="poster-orbit orbit-two"></div>
            <p className="poster-kicker">{uiLabels.posterKicker}</p>
            <h2
              className={`poster-title ${posterSettings.textEffect}`}
              data-text={posterSettings.mainText}
            >
              {posterSettings.mainText}
            </h2>
            <p className="poster-subtitle">{posterSettings.subText}</p>
            <div className="poster-footer">
              <span>{backgroundLabels[posterSettings.backgroundStyle]}</span>
              <span>{effectLabels[posterSettings.textEffect]}</span>
            </div>
          </article>
        </div>
      </section>
    </main>
  )
}

export default App
