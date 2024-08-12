<template>
  <div class="dot-container" @mousemove="onMouseMove" @mouseleave="onMouseLeave">
    <canvas ref="canvas" class="dot-canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';

// 引用canvas元素和上下文
const canvas = ref<HTMLCanvasElement | null>(null);  // canvas元素
const ctx = ref<CanvasRenderingContext2D | null>(null);  // canvas上下文

// 点阵数据。包括x、y坐标, 目标偏移量, 当前偏移量和鼠标距离
const dots = ref<{ x: number, y: number, offsetX: number, offsetY: number, targetOffsetX: number, targetOffsetY: number, distance: number }[]>([]);
const maxDistance = 120;  // 生效的最大距离
const lerp = (start: number, end: number, t: number) => start + (end - start) * t * (2 - t);  // 线性插值函数

// 初始化点阵图案
const createDots = async () => {
  // const imageSrc = 'https://media.prts.wiki/archive/4/41/20210120051637%21Logo_%E7%BD%97%E5%BE%B7%E5%B2%9B.png';  // 图片路径
  const imageSrc = '/RHODES_ISLAND.png';  // 图片路径
  const image = new Image();
  image.src = imageSrc;

  // 确保图片加载完成
  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = (error) => {
      console.error('Image failed to load:', error);
      reject(error);
    };
  });

  const rows = 400;
  const cols = 400;
  const spacing = 4;  // 调整spacing以控制点之间的距离

  // 创建临时canvas以获取图像像素数据
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');

  tempCanvas.width = cols;
  tempCanvas.height = rows;

  if (tempCtx) {
    tempCtx.drawImage(image, 0, 0, cols, rows);
    const imageData = tempCtx.getImageData(0, 0, cols, rows).data;

    for (let y = 0; y < rows; y += spacing) {
      for (let x = 0; x < cols; x += spacing) {
        const index = (y * cols + x) * 4;  // 计算像素索引
        const r = imageData[index];     // 读取红色通道值
        const g = imageData[index + 1]; // 读取绿色通道值
        const b = imageData[index + 2]; // 读取蓝色通道值
        const alpha = imageData[index + 3];  // 读取alpha通道值

        // 计算亮度 (通常用0.299*r + 0.587*g + 0.114*b)
        const brightness = 0.299 * r + 0.587 * g + 0.114 * b;

        // 判断亮度是否小于阈值，来决定是否创建点。亮度越低，颜色越接近黑色。
        if (brightness < 200 && alpha > 128) {  // 亮度阈值200可根据需要调整，alpha>128确保透明度不太低
          dots.value.push({
            x: x,
            y: y,
            offsetX: 0,
            offsetY: 0,
            targetOffsetX: 0,
            targetOffsetY: 0,
            distance: 0,
          });
        }
      }
    }
  }
};

// const createDots = () => {
//   const rows = 20;
//   const cols = 20;
//   const spacing = 20;

//   for (let y = 0; y < rows; y++) {
//     for (let x = 0; x < cols; x++) {
//       dots.value.push({
//         x: x * spacing + spacing / 2,
//         y: y * spacing + spacing / 2,
//         offsetX: 0,
//         offsetY: 0,
//         targetOffsetX: 0,
//         targetOffsetY: 0,
//         distance: 0, // 记录每个点与鼠标的距离
//       });
//     }
//   }
// };


// 鼠标移动事件处理

const onMouseMove = (event: MouseEvent) => {
  const { offsetX, offsetY } = event;  // 鼠标相对于canvas的坐标
  dots.value.forEach(dot => {
    const dx = offsetX - dot.x;  // 鼠标与点的x坐标差
    const dy = offsetY - dot.y;  // 鼠标与点的y坐标差
    const distance = Math.sqrt(dx * dx + dy * dy);

    dot.distance = distance; // 保存距离用于计算lerpFactor

    if (distance < maxDistance) {
      const force = (maxDistance - distance) / maxDistance * 25;
      const angle = Math.atan2(dy, dx);
      dot.targetOffsetX = - Math.cos(angle) * force;  // 负号代表向外扩散（如果是正号则向内收缩）
      dot.targetOffsetY = - Math.sin(angle) * force;
    } else {
      dot.targetOffsetX = 0;
      dot.targetOffsetY = 0;
    }
  });

  nextTick(() => {
    drawDots();  // nextTick确保在更新DOM后绘制点阵图案
  });
};

// 鼠标离开事件处理
const onMouseLeave = () => {
  dots.value.forEach(dot => {
    dot.targetOffsetX = 0;
    dot.targetOffsetY = 0;
  });

  nextTick(() => {
    drawDots();  // nextTick确保在更新DOM后绘制点阵图案
  });
};


// 绘制点阵图案
const drawDots = () => {
  if (!ctx.value) return;

  ctx.value.clearRect(0, 0, canvas.value!.width, canvas.value!.height);  // 清空画布

  let isAnimating = false;  // 用于判断是否还需要继续动画
  // 开始计时
  let start = performance.now();
  dots.value.forEach(dot => {
    const lerpFactor = 0.01; // 影响过渡速度的因子
    // const lerpFactor = 0.02 * (1 - Math.min(dot.distance / maxDistance, 0.9));  // 根据鼠标距离调整过渡速度
    // const lerpFactor = 0.015 * Math.min(Math.pow(maxDistance/(dot.distance+1), 5), 1);  // 根据鼠标距离调整过渡速度
    const previousOffsetX = dot.offsetX;
    const previousOffsetY = dot.offsetY;

    dot.offsetX = lerp(dot.offsetX, dot.targetOffsetX, lerpFactor);
    dot.offsetY = lerp(dot.offsetY, dot.targetOffsetY, lerpFactor);

    // 如果点的位置有明显变化，则继续动
    if (Math.abs(dot.offsetX - previousOffsetX) > 0.01 || Math.abs(dot.offsetY - previousOffsetY) > 0.01) {
      isAnimating = true;
    }

    ctx.value!.beginPath();
    ctx.value!.arc(dot.x + dot.offsetX, dot.y + dot.offsetY, 1.2, 0, Math.PI * 2);  // 绘制圆点
    ctx.value!.fillStyle = '#66ccff';
    ctx.value!.fill();
    ctx.value!.closePath();
  });
  // 结束计时
  let end = performance.now();
  console.log('Time:', end - start);

  // 继续绘制，直到所有点都接近目标位置
  if (isAnimating) {
    requestAnimationFrame(drawDots);
  }
};

// 组件挂载时初始化Canvas和图案
onMounted(() => {
  if (canvas.value) {
    canvas.value.width = 400; // Canvas宽度
    canvas.value.height = 400; // Canvas高度
    ctx.value = canvas.value.getContext('2d');

    createDots().then(() => {
      drawDots();  // 在点阵图案创建完成后进行绘制
    });
  }
});
</script>


<style>
.dot-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 400px;
  background-color: #ffffff;
}

.dot-canvas {
  width: 100%;
  height: 100%;
}
</style>