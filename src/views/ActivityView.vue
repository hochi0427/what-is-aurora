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
      Activity
    </h3>
    <p>In this activity, you will try to explain auroras just as if you were teaching a friend.</p>
    <p>Example:</p>
    <ul>
      <li>What cuases auroras?</li>
      <li>The role of solar wind</li>
      <li>Why different colors appear?</li>
    </ul>
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
}

li {
  font-size: 20px;
  line-height: 1.7;
  transition: font-size 0.2s ease;
}

li:hover {
  font-size: 24px;
}
</style>
