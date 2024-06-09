import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        devtools: 'src/devtools/index.html',
        panel: 'src/panel/index.html',
        options: 'src/options/index.html',
        popup: 'src/popup/index.html',
        background: 'src/background/index.ts',
      },
      output: {
        entryFileNames: (chunkInfo) => {
          //@ts-expect-error - includes exists
          const isBackground = chunkInfo.name.includes('background')
          if (isBackground) return 'src/background/index.js'
          return '[name].js'
        },
        chunkFileNames: '[name].js',
        manualChunks: (id) => {
          const matchPattern = /src\/content-scripts\/([^\\.]+)/
          //@ts-expect-error - includes exists
          const isMatch = id.includes('src/content-scripts')
          // console.log('chunk id:', id, isMatch)

          const matchedString = id.match(matchPattern)
          if (matchedString) {
            const match = matchedString[1]
            if (isMatch) {
              return `src/content-scripts/${match}`
            }
          }
        },
      },
    },
  },
})
