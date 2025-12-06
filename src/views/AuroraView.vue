<script setup>
// 現在先用 YouTube 的示意連結，你之後可以改成自己的動畫影片 URL
// 例如: 'https://www.youtube.com/embed/你的影片ID'
const videoUrl = 'https://www.youtube.com/embed/PgIKsuZ3RZU?si=OzXEkzrp6ioNLefm'
</script>
<template>
  <section class="aurora-page">
    <!-- Part 1 標題區 -->
    <header class="section-header">
      <p class="part-label">Part 1 · Animation Video</p>
      <h2>How Does Aurora Happen?</h2>
      <!-- <p class="section-subtitle">
        This animation helps students visualize how solar wind interacts with
        Earth’s magnetic field and atmosphere to create auroras.
      </p> -->
    </header>

    <!-- Part 1 影片區 -->
    <div class="video-block">
      <div class="video-card">
        <div class="video-wrapper">
          <!-- 方式一：嵌入影片平台（YouTube / Vimeo） -->
          <iframe
            :src="videoUrl"
            title="Aurora animation"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
<!-- 
          方式二：如果你有自己的 mp4 檔案，可以改用這段（把上面的 iframe 註解掉）：

          <video controls class="video-element">
            <source src="/aurora-animation.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          -->
        </div>

        <div class="video-caption">
          <h3>Key Points</h3>
          <ul>
            <li>
              While the video plays, pause at key moments to highlight
              <strong>solar wind</strong>, <strong>magnetic field</strong>,
              and <strong>atmosphere</strong>.
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 先預留一個 Part 2 的標題，之後再一起做卡片互動 -->
    <section class="coming-soon">
      <p class="part-label">Part 2 · Key Steps</p>
      <p class="hint-text">
        之後我們會在這裡放四個可點擊放大的卡片：
        <br />
        Solar wind originates from the sun · Earth’s magnetic field forms a protective layer ·
        Particles are guided to the poles · Collisions produce different colors of light.
      </p>
    </section>
  </section>
</template>

<style scoped>
.aurora-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Part 標題區 */
.section-header {
  margin-bottom: 8px;
}

.part-label {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: rgba(15, 23, 42, 0.35);
  color: #e5e7ff;
}

.section-header h2 {
  margin: 8px 0;
  font-size: 26px;
}

.section-subtitle {
  font-size: 14px;
  line-height: 1.7;
  opacity: 0.9;
}

/* 影片外框 */
.video-block {
  display: flex;
  justify-content: center;
}

.video-card {
  width: 100%;
  max-width: 900px;
  border-radius: 18px;
  padding: 18px 18px 20px;
  background: rgba(12, 18, 40, 0.18);
  border: 1px solid rgba(148, 163, 253, 0.35);
  box-shadow: 0 16px 45px rgba(15, 23, 42, 0.55);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

/* 使影片保持 16:9，且可自適應 */
.video-wrapper {
  position: relative;
  width: 100%;
  border-radius: 14px;
  overflow: hidden;
  background: #020617;
}

/* 用 padding-top 做 16:9 比例盒子 */
.video-wrapper::before {
  content: '';
  display: block;
  padding-top: 56.25%; /* 16:9 */
}

.video-wrapper iframe,
.video-wrapper .video-element {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

/* 底下文字說明 */
.video-caption h3 {
  margin: 0 0 6px;
  font-size: 18px;
}

.video-caption ul {
  margin: 0 0 4px;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.6;
}

.small-note {
  font-size: 12px;
  opacity: 0.8;
}

/* 預留 Part 2 區塊 */
.coming-soon {
  margin-top: 12px;
  padding: 12px 14px;
  border-radius: 12px;
  background: rgba(15, 23, 42, 0.14);
}

.hint-text {
  margin-top: 6px;
  font-size: 13px;
  line-height: 1.6;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .video-card {
    padding: 14px;
  }

  .section-header h2 {
    font-size: 22px;
  }
}

</style>