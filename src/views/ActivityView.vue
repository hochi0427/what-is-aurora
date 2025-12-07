<script setup>
import { ref } from 'vue'

const buildPublicAssetUrl = (fileName) => {
  const normalizedBase = import.meta.env.BASE_URL?.replace(/\/$/, '') ?? ''
  const normalizedFile = fileName.replace(/^\//, '')
  return `${normalizedBase}/${normalizedFile}`
}

const activityImages = [
  {
    src: buildPublicAssetUrl('activity1.png'),
    alt: 'Aurora diagram activity step 1',
  },
  {
    src: buildPublicAssetUrl('activity2.png'),
    alt: 'Aurora diagram activity step 2',
  },
]

const selectedImage = ref(null)

const openLightbox = (image) => {
  selectedImage.value = image
}

const closeLightbox = () => {
  selectedImage.value = null
}
</script>

<template>
  <section>
    <h3>Question Discuss</h3>
    <ul>
      <li>Do other planets get auroras?</li>
      <li>Are there only Northen Lights?</li>
      <li>What colors can you see?</li>
    </ul>
    <h3 class="activity-title">
      <span class="star-icon" aria-hidden="true">★</span>
      Activity - Diagram Labeling
    </h3>
    <p>Filling the missing parts of an aurora diagram~</p>
    <div class="activity-image-list">
      <img
        v-for="(image, index) in activityImages"
        :key="index"
        :src="image.src"
        :alt="image.alt"
        class="activity-img"
        @click="openLightbox(image)"
      />
    </div>
    <div
      v-if="selectedImage"
      class="image-lightbox"
      @click.self="closeLightbox"
    >
      <button class="lightbox-close" @click="closeLightbox" aria-label="Close image">
        ×
      </button>
      <img :src="selectedImage.src" :alt="selectedImage.alt" class="lightbox-img" />
    </div>
  </section>
</template>

<style scoped>
h2 {
  margin-bottom: 12px;
  font-size: 24px;
}
h3 {
  margin-bottom: 12px;
  font-size: 22px;
  font-weight: bold;
}

.activity-title {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.star-icon {
  font-size: 24px;
  color: #f9c74f;
  line-height: 1;
}

ul {
  margin-bottom: 12px;
}

p {
  font-size: 20px;
  line-height: 1.7;
  margin-left: 25px;
}

li {
  font-size: 20px;
  line-height: 1.7;
  transition: font-size 0.2s ease;
}

li:hover {
  font-size: 24px;
}

.activity-image-list {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 16px;
  margin-top: 12px;
  flex-wrap: wrap;
}

.activity-img {
  width: min(100%, 360px);
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.activity-img:hover {
  transform: scale(1.02);
}

.image-lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 24px;
}

.lightbox-img {
  max-width: min(90vw, 700px);
  max-height: 85vh;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.lightbox-close {
  position: absolute;
  top: 24px;
  right: 24px;
  background: transparent;
  border: none;
  font-size: 32px;
  color: #fff;
  cursor: pointer;
}
</style>
