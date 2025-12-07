<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <!-- 上方導覽列 -->
    <header class="header">
      <div class="logo">
        <h1>What is Aurora?</h1>
        <p class="subtitle">Learning Website</p>
      </div>

      <nav class="nav">
        <RouterLink to="/" class="nav-link" active-class="nav-link-active">
          Introduction
        </RouterLink>

        <RouterLink to="/aurora" class="nav-link" active-class="nav-link-active">
          What is Aurora
        </RouterLink>

        <RouterLink to="/activity" class="nav-link" active-class="nav-link-active">
          Activity
        </RouterLink>
      </nav>
    </header>

    <!-- 下面顯示各頁內容 -->
    <main class="main">
      <div class="section">
      <RouterView />
      </div>
    </main>
  </div>
</template>

<style>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #ADB9D3;
  color: #f4f4ff;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    sans-serif;
}

/* 導覽列 */
.header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 16px 32px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(6, 10, 25, 0.8);
  backdrop-filter: blur(10px);
}

.logo h1 {
  margin: 0;
  font-size: 30px;
}

.subtitle {
  margin: 4px 0 0;
  font-size: 12px;
  opacity: 0.7;
}

.nav {
  display: flex;
  gap: 10px;
}

.nav-link {
  text-decoration: none;
  font-size: 14px;
  padding: 6px 14px;
  border-radius: 999px;
  color: #c7d2ff;
  border: 1px solid transparent;
  transition: 0.15s;
}

.nav-link:hover {
  border-color: rgba(255, 255, 255, 0.3);
}

.nav-link-active {
  background: linear-gradient(135deg, #6366f1, #a855f7);
  color: white;
}

/* 內容區 */
.main {
  flex: 1;
  width: 100%;
  padding: 24px 32px 40px;
  box-sizing: border-box;
  background: #ADB9D3;
  display: flex;
  align-items: flex-start; /* 讓內容高度由自身決定 */
}
.section {
  max-width: 960px;          /* 中間內容的寬度上限 */
  margin: 0 auto;            /* 置中 */
  width: 100%;
  padding: 24px 32px 40px;   /* 內距，讓字不要貼邊 */
  box-sizing: border-box;
  background: rgba(12, 18, 40, 0.15); /* 想要更乾淨可以改成 transparent */
  border-radius: 18px;
  backdrop-filter: blur(4px);
}
</style>
