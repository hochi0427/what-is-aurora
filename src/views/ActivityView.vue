<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { loadStoredQuestions, saveQuestions, QUESTION_STORAGE_KEY } from '@/utils/questions'

const buildPublicAssetUrl = (fileName) => {
  const normalizedBase = import.meta.env.BASE_URL?.replace(/\/$/, '') ?? ''
  const normalizedFile = fileName.replace(/^\//, '')
  return `${normalizedBase}/${normalizedFile}`
}

const discussionQuestions = ref(loadStoredQuestions())
const questionInput = ref('')
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

const addQuestion = () => {
  const text = questionInput.value.trim()
  if (!text) return
  discussionQuestions.value.push(text)
  questionInput.value = ''
}

const removeQuestion = (index) => {
  if (index < 0 || index >= discussionQuestions.value.length) return
  discussionQuestions.value.splice(index, 1)
}

const handleStorageUpdate = (event) => {
  if (event.key !== QUESTION_STORAGE_KEY) return
  discussionQuestions.value = loadStoredQuestions()
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', handleStorageUpdate)
  }
})

watch(discussionQuestions, () => {
  saveQuestions(discussionQuestions.value)
}, { deep: true })

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('storage', handleStorageUpdate)
  }
})
</script>

<template>
  <section>
    <h3>Question Discuss</h3>
    <ul
      v-if="discussionQuestions.length"
      class="question-list"
    >
      <li
        v-for="(question, index) in discussionQuestions"
        :key="index"
        class="question-item"
      >
        <span class="question-text">{{ question }}</span>
        <button
          class="delete-question-btn"
          type="button"
          :aria-label="`Remove question ${index + 1}`"
          @click="removeQuestion(index)"
        >
          ✕
        </button>
      </li>
    </ul>
    <p v-else class="empty-question-text">
      No questions yet. Add one on the Introduction page!
    </p>
    <label class="question-label" for="activity-question-input">New Question</label>
    <div class="question-input-box">
      <input
        id="activity-question-input"
        v-model="questionInput"
        @keyup.enter="addQuestion"
        type="text"
        placeholder="Type your question..."
        class="question-input"
      />
      <button class="add-btn" @click="addQuestion">
        Add
      </button>
    </div>
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

.question-label {
  display: inline-block;
  margin-left: 25px;
  margin-top: 8px;
  font-weight: 600;
}

.question-list {
  margin: 6px 0 8px 25px;
  padding-left: 12px;
}

.question-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  line-height: 1.7;
}

.question-text {
  flex: 1;
}

.delete-question-btn {
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  transition: background 0.2s ease;
}

.delete-question-btn:hover {
  background: rgba(255, 255, 255, 0.35);
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

.empty-question-text {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  margin-left: 25px;
}

.question-input-box {
  display: flex;
  gap: 8px;
  margin-left: 25px;
  margin-top: 4px;
}

.question-input {
  flex: 1;
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
}

.add-btn {
  padding: 6px 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background: #6d7dd1;
  color: white;
  font-weight: 600;
  transition: background 0.2s;
}

.add-btn:hover {
  background: #545fb5;
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
