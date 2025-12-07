<script setup>
import { ref, watch } from 'vue'
import { loadStoredQuestions, saveQuestions } from '@/utils/questions'

const buildPublicAssetUrl = (fileName) => {
  const normalizedBase = import.meta.env.BASE_URL?.replace(/\/$/, '') ?? ''
  const normalizedFile = fileName.replace(/^\//, '')
  return `${normalizedBase}/${normalizedFile}`
}

const vocabularyImages = {
  coronalMassEjection: buildPublicAssetUrl('vocabulary1.jpg'),
  solarWind: buildPublicAssetUrl('vocabulary2.gif'),
  magneticField: buildPublicAssetUrl('Vocabulary3.gif'),
}

const auroraImages = [
  buildPublicAssetUrl('aurora1.jpg'),
  buildPublicAssetUrl('aurora2.jpg'),
  buildPublicAssetUrl('aurora3.jpg'),
]

const questionItems = ref(loadStoredQuestions())

const sections = [
  // {
  //   id: 'learning-goal',
  //   title: 'Learning Goal',
  //   type: 'plain',
  //   items: ['What is an Aurora?', 'What makes Aurora happen?'],
  // },
  {
    id: 'aurora',
    title: 'Aurora',
    type: 'aurora',
    description:
      'Auroras happen when tiny particles from the Sun follow Earth’s magnetic field and bump into gases in the sky. \nThese bumps make the sky glow with beautiful colors.',
    images: auroraImages,
  },
  {
    id: 'key-vocabulary',
    title: 'Key Vocabulary',
    type: 'vocab-with-img',
    items: [
      { img: vocabularyImages.coronalMassEjection, word: 'Coronal Mass Ejection' },
      { img: vocabularyImages.solarWind, word: 'Solar Wind' },
      { img: vocabularyImages.magneticField, word: 'Magnetic Field' },
    ],
  },
  {
    id: 'Questions-section',
    title: 'Questions',
    type: 'question',
    items: questionItems.value,
  },
]

const QUESTION_SECTION_ID = 'Questions-section'

// 每一個區塊的開關（預設全部關起來）
const openStates = ref(sections.map(() => false))

const toggleSection = (index) => {
  openStates.value[index] = !openStates.value[index]
}
// ⭐ 只有「Questions」這一區會用到的 input 值
const questionInput = ref('')

// ⭐ 把 input 的內容加進 Questions 的 items 裡
const addQuestion = (sectionIndex) => {
  if (sections[sectionIndex]?.id !== QUESTION_SECTION_ID) return
  const text = questionInput.value.trim()
  if (!text) return
  questionItems.value.push(text)
  questionInput.value = ''
}

const removeQuestion = (itemIndex) => {
  if (itemIndex < 0 || itemIndex >= questionItems.value.length) return
  questionItems.value.splice(itemIndex, 1)
}

watch(questionItems, () => {
  saveQuestions(questionItems.value)
}, { deep: true })
</script>


<template>
  <section class="intro">
    <h2>Introduction</h2>

    <!-- <p class="intro-text">
      This page gives students an overview of the topic and what they will learn in
      the “What is Aurora?” unit.
    </p> -->

   <div class="accordion-list">
      <div
        v-for="(section, index) in sections"
        :key="section.id"
        class="accordion-item"
      >
        <!--Title List-->
        <button class="accordion-header" @click="toggleSection(index)">
        <span class="arrow" :class="{ open: openStates[index] }">▶</span>
        <span class="accordion-title">{{ section.title }}</span>
        </button>

        <!-- 內容區：依照 type 切換 -->
        <div v-show="openStates[index]" class="panel">
          <!-- 1. vocab-with-img：圖片 + 文字卡片 -->
          <template v-if="section.type === 'vocab-with-img'">
            <ul class="vocab-img-list">
              <li
                v-for="item in section.items"
                :key="item.word"
                class="vocab-img-item"
              >
                <img :src="item.img" class="vocab-img" />
                <span class="vocab-img-word">{{ item.word }}</span>
              </li>
            </ul>
          </template>

          <!-- 2. question：條列 + input -->
          <template v-else-if="section.type === 'question'">
            <ul class="question-list">
              <li
                v-for="(item, i) in section.items"
                :key="i"
                class="question-item"
              >
                <span class="question-text">{{ item }}</span>
                <button
                  class="delete-question-btn"
                  type="button"
                  :aria-label="`Remove question ${i + 1}`"
                  @click="removeQuestion(i)"
                >
                  ✕
                </button>
              </li>
            </ul>

            <div class="question-input-box">
              <input
                v-model="questionInput"
                @keyup.enter="addQuestion(index)"
                type="text"
                placeholder="Type your question..."
                class="question-input"
              />
              <button class="add-btn" @click="addQuestion(index)">
                Add
              </button>
            </div>
          </template>

          <!-- 3. aurora：圖片排成一列 + 簡介 -->
          <template v-else-if="section.type === 'aurora'">
            <p class="aurora-description">
              {{ section.description }}
            </p>
            <div class="aurora-image-row">
              <img
                v-for="(img, i) in section.images"
                :key="i"
                :src="img"
                :alt="`Aurora photo ${i + 1}`"
                class="aurora-img"
              />
            </div>
          </template>

          <!-- 4. 其他：當作 plain list （Learning Goal）-->
          <template v-else>
            <ul class="plain-list">
              <li
                v-for="item in section.items"
                :key="item"
                class="plain-item"
              >
                {{ item }}
              </li>
            </ul>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
h2 {
  margin-bottom: 12px;
  font-size: 30px;
}

/* 整個 accordion 區域垂直排列 */
.accordion-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* 每個可收合區塊的外框 */
.accordion-item {
  background: rgba(12, 18, 40, 0.15);
  border-radius: 12px;
  padding: 8px 12px;
}

/* 標題列：左右分佈（文字 + 箭頭） */
.accordion-header {
  width: 100%;
  border: none;
  background: transparent;
  color: inherit;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
  cursor: pointer;
}

.accordion-title {
  font-size: 20px;
  font-weight: 600;
}

/* 箭頭：用旋轉做開關效果 */
.arrow {
  font-size: 18px;
  display: inline-block;
  transition: transform 0.2s ease;
}

.arrow.open {
  transform: rotate(90deg); /* ▶ 轉 90 度，就像 ▼ 的感覺 */
}

/* UL 區塊 */
.collapse {
  margin: 4px 0 4px 14px;
  padding-left: 10px;
}
/* 一般條列 item（Learning Goal 等） */
.plain-item {
  font-size: 20px;
  line-height: 1.7;
  transition: font-size 0.2s ease;
}

.plain-item:hover {
  font-size: 24px;
}

/* Vocabulary with image */
/* Vocabulary cards responsive layout */
.vocab-img-list {
  display: flex;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
}

.vocab-img-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin: 8px 0;
  padding: 8px 10px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.12);
  transition: transform 0.15s ease;
}

.vocab-img-item:hover {
  transform: scale(1.05);
}

.vocab-img {
  width: 240px;
  height: 120px;
  object-fit: contain;
  border-radius: 8px;
}

.vocab-img-word {
  font-size: 20px;
  font-weight: 600;
}

/* ---------- question 區塊 ---------- */

.question-list {
  margin: 6px 0 8px 18px;
  padding-left: 10px;
}

.question-item {
  font-size: 18px;
  margin-bottom: 6px;
  line-height: 1.6;
  display: flex;
  align-items: center;
  gap: 8px;
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

.question-input-box {
  display: flex;
  gap: 8px;
  margin-left: 18px;
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

.aurora-description {
  margin: 8px 0 12px;
  font-size: 18px;
  line-height: 1.7;
  white-space: pre-line;
  margin-left: 18px;
  margin-right: 18px;
}

.aurora-description:hover {
  font-size: 22px;
}

.aurora-image-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
}

.aurora-img {
  width: 100%;
  max-width: 280px;
  height: 170px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
}

</style>
