type VSCodeApi = { postMessage: (msg: unknown) => void }

declare global {
  interface Window {
    acquireVsCodeApi?: () => VSCodeApi
  }
}

const fallback: VSCodeApi = {
  postMessage: (msg: unknown) => {
    // Browser mode fallback: keep app functional outside VS Code.
    console.debug('[pixel-agents web fallback] postMessage', msg)
  },
}

export const vscode: VSCodeApi =
  typeof window !== 'undefined' && typeof window.acquireVsCodeApi === 'function'
    ? window.acquireVsCodeApi()
    : fallback
