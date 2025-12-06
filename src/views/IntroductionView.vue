<script setup>
import { ref } from 'vue'

const sections = [
  {
    id: 'learning-goal',
    title: 'Learning Goal',
    type: 'plain',
    items: ['What is an Aurora?', 'What makes Aurora happen?'],
  },
  {
    id: 'key-vocabulary',
    title: 'Key Vocabulary',
    type: 'vocab-with-img',
    items: [
    {img: 'public/vocabulary1.jpg',
    word: 'Coronal Mass Ejection'},
    {img: 'public/vocabulary2.gif',
    word: 'Solar Wind'},
    {img: 'public/vocabulary3.gif',
    word: 'Earth Magnetic Field'},
    ],
  },
  {
    id: 'Questions-section',
    title: 'Questions',
    type: 'question',
    items: [
      'Do other planets get auroras?',
    ],
  },
]

// 每一個區塊的開關（預設全部關起來）
const openStates = ref(sections.map(() => false))

const toggleSection = (index) => {
  openStates.value[index] = !openStates.value[index]
}
// ⭐ 只有「Questions」這一區會用到的 input 值
const questionInput = ref('')

// ⭐ 把 input 的內容加進 Questions 的 items 裡
const addQuestion = (sectionIndex) => {
  const text = questionInput.value.trim()
  if (!text) return
  sections[sectionIndex].items.push(text)
  questionInput.value = ''
}
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
                {{ item }}
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

          <!-- 3. 其他：當作 plain list （Learning Goal）-->
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

</style>