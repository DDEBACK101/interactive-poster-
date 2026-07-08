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
  preview: '\ud3ec\uc2a4\ud130 \ubbf8\ub9ac\ubcf4\uae30',
  posterKicker: '\uc2dc\uac01 \uc2e4\ud5d8 01',
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

function App() {
  const [posterSettings, setPosterSettings] = useState(defaultPoster)

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

  return (
    <main className="poster-generator">
      <section
        className="control-panel"
        aria-label={uiLabels.controlPanel}
      >
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
        </div>
      </section>

      <section
        className="preview-section"
        aria-label={uiLabels.preview}
      >
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
