<template>
  <header>hahah</header>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { iframe } from './iframe/index'
import { collaborate } from './service/index'
import type { ICollaborativeOpt } from './service/index'
import { parseStringify } from './utils'

function collaborativeInit(sdkMsg: any) {
  const { docId, collaConfig, traceId, realName } = sdkMsg
  const option: ICollaborativeOpt = {
    docId,
    scene: collaConfig?.scene,
    authenticate: {
      traceId,
      realName,
      ...collaConfig?.authentication
    },
    WSDocumentPlugin: {
      ...collaConfig?.collabOptions,
      awarenessDebounceMs: 100 //awareness防抖间隔默认为100
    }
  }
  collaborate.init(option)
  collaborate.registryAwareNess()
  collaborate.factoryAddListener()
}

iframe.init().then((res) => {
  const { data, ...sdkMsg } = res.initialize
  console.log('iframe nodeTree :>> ', parseStringify(data, 'parse'))
  collaborativeInit(sdkMsg)
})

function clipboard() {
  navigator.clipboard.read().then((res) => {
    res.forEach((item) => {
      console.log('item :>> ', item)
      // item.getType('text/html').then((re) => {
      //   re.text().then((text) => {
      //     console.log('text :>> ', text)
      //   })
      // })
      item.getType('text/plain').then((re) => {
        re.text().then((text) => {
          console.log('text :>> ', text)
        })
      })
    })
  })
}

onMounted(() => {
  document.addEventListener('copy', clipboard)
})
onUnmounted(() => {
  document.removeEventListener('copy', clipboard)
})
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
