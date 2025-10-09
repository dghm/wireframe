// Timeline 和 Card 互動效果
document.addEventListener('DOMContentLoaded', function () {
  const timelineNodes = document.querySelectorAll('.timeline-node.completed');
  const allCards = document.querySelectorAll(
    '.timeline-card.completed, .timeline-card.event'
  );
  const timelineCards = document.querySelectorAll('.timeline-card.completed');
  const eventCard = document.querySelector('.timeline-card.event');
  const eventIcon = document.querySelector('.timeline-event-icon');

  // 當滑鼠移到 Timeline 節點時，高亮對應的卡片
  timelineNodes.forEach((node, index) => {
    node.addEventListener('mouseenter', function () {
      if (allCards[index]) {
        allCards[index].classList.add('highlight');
      }
    });

    node.addEventListener('mouseleave', function () {
      if (allCards[index]) {
        allCards[index].classList.remove('highlight');
      }
    });
  });

  // 當滑鼠移到卡片時，放大對應的 Timeline 節點
  timelineCards.forEach((card, index) => {
    card.addEventListener('mouseenter', function () {
      if (timelineNodes[index]) {
        timelineNodes[index].classList.add('scale-up');
      }
    });

    card.addEventListener('mouseleave', function () {
      if (timelineNodes[index]) {
        timelineNodes[index].classList.remove('scale-up');
      }
    });
  });

  // 當滑鼠移到乾冰卡片時，放大 Timeline 上的乾冰圖示
  if (eventCard && eventIcon) {
    eventCard.addEventListener('mouseenter', function () {
      eventIcon.classList.add('scale-up');
    });

    eventCard.addEventListener('mouseleave', function () {
      eventIcon.classList.remove('scale-up');
    });
  }

  // 當滑鼠移到 Timeline 上的乾冰圖示時，高亮乾冰卡片
  if (eventIcon && eventCard) {
    eventIcon.addEventListener('mouseenter', function () {
      eventCard.classList.add('highlight');
    });

    eventIcon.addEventListener('mouseleave', function () {
      eventCard.classList.remove('highlight');
    });
  }
});
