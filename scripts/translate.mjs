// Build-time translation script.
// Reads messages/en.json and produces messages/{es,de,fr,hi,ja,zh}.json
// using Meta NLLB-200 (distilled-600M) running locally via transformers.js.
// Run with:  node scripts/translate.mjs
// First run downloads ~250MB of model weights into ./.cache (then cached).

import { pipeline } from '@huggingface/transformers'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const MESSAGES_DIR = join(ROOT, 'messages')
const CACHE_DIR = join(ROOT, '.cache', 'transformers')

// FLORES-200 codes — required by NLLB.
const FLORES = {
  en: 'eng_Latn',
  es: 'spa_Latn',
  de: 'deu_Latn',
  fr: 'fra_Latn',
  hi: 'hin_Deva',
  ja: 'jpn_Jpan',
  zh: 'zho_Hans',
}

const TARGETS = ['es', 'de', 'fr', 'hi', 'ja', 'zh']

// Strings that should never be translated (brand, tech terms, code, addresses).
// Add more as the dictionaries grow.
const NEVER_TRANSLATE = new Set([
  'MonkDB',
  'your@email.com',
  'AI/ML',
  'BFSI and Capital Markets',
  'GitHub',
  'Slack',
  'Linkedin',
  'Youtube',
  'X',
  'Bluesky',
  'Greptime',
  'AutoMQ',
  'dbend Cloud',
  'dbend Enterprise',
  'dbend Community',
  'MCP',
  'SOC 2 Type II',
  'ISO 27001',
  'GDPR',
  'HIPAA',
  'Air-Gapped Ready',
  // Address proper nouns (NLLB misinterprets these otherwise).
  'Wework Raheja Mindspace Building 9, Floor 13',
  'Mindspace IT Park, Madhapur',
  'Hyderabad 500081, Telangana',
  // Product/feature names that should stay English globally.
  'Monk AIO',
  'SmartX Platforms',
  'SmartMine',
  'SmartMobility',
  'SmartFinance',
  // Short UI labels NLLB tends to mistranslate (Book→noun, etc.).
  // Keep these English globally — they're universal in tech UIs.
  'LIVE',
  'BEST',
  'MCP',
])

// Walk a JSON object, calling fn(value, path) on every leaf string.
async function mapLeafStrings(obj, fn, path = []) {
  if (typeof obj === 'string') return fn(obj, path)
  if (Array.isArray(obj)) {
    const out = []
    for (let i = 0; i < obj.length; i++) {
      out.push(await mapLeafStrings(obj[i], fn, [...path, i]))
    }
    return out
  }
  if (obj && typeof obj === 'object') {
    const out = {}
    for (const [k, v] of Object.entries(obj)) {
      out[k] = await mapLeafStrings(v, fn, [...path, k])
    }
    return out
  }
  return obj
}

// Look up a path inside an object. Returns undefined if any segment is missing.
function getAtPath(obj, path) {
  let cur = obj
  for (const seg of path) {
    if (cur == null || typeof cur !== 'object') return undefined
    cur = cur[seg]
  }
  return cur
}

async function readJsonIfExists(path) {
  try {
    const raw = await readFile(path, 'utf8')
    return JSON.parse(raw)
  } catch {
    return null
  }
}

async function main() {
  // CLI flags:
  //   --full     : retranslate every leaf, even if already present (default: incremental)
  const args = process.argv.slice(2)
  const incremental = !args.includes('--full')

  await mkdir(CACHE_DIR, { recursive: true })
  process.env.TRANSFORMERS_CACHE = CACHE_DIR

  console.log(
    `Loading model: Xenova/nllb-200-distilled-600M (mode: ${incremental ? 'incremental' : 'full'})`,
  )
  const translator = await pipeline(
    'translation',
    'Xenova/nllb-200-distilled-600M',
    { dtype: 'q8' },
  )
  console.log('Model loaded.\n')

  const enRaw = await readFile(join(MESSAGES_DIR, 'en.json'), 'utf8')
  const en = JSON.parse(enRaw)

  for (const lang of TARGETS) {
    const tgt = FLORES[lang]
    const outPath = join(MESSAGES_DIR, `${lang}.json`)
    const existing = incremental ? await readJsonIfExists(outPath) : null

    console.log(
      `→ ${lang} (${tgt}) ${existing ? '[incremental]' : '[full]'} ...`,
    )
    const start = Date.now()
    let translated = 0
    let kept = 0

    const result = await mapLeafStrings(en, async (text, path) => {
      if (!text || !text.trim()) return text
      const trimmed = text.trim()
      if (NEVER_TRANSLATE.has(trimmed)) return text

      if (existing) {
        const prior = getAtPath(existing, path)
        if (typeof prior === 'string' && prior.trim()) {
          kept += 1
          return prior
        }
      }

      const out = await translator(text, {
        src_lang: FLORES.en,
        tgt_lang: tgt,
      })
      translated += 1
      const r = Array.isArray(out) ? out[0] : out
      return (r?.translation_text ?? text).trim()
    })

    await writeFile(outPath, JSON.stringify(result, null, 2) + '\n', 'utf8')
    console.log(
      `  +${translated} new, ${kept} kept, ${((Date.now() - start) / 1000).toFixed(1)}s → ${outPath}\n`,
    )
  }

  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
