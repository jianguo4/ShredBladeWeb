/**
 * 图片防护工具 - 禁止用户直接下载图片
 */

export function initImageProtection() {
  // 禁止右键菜单
  document.addEventListener('contextmenu', (e) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'IMG') {
      e.preventDefault();
      return false;
    }
  }, true);

  // 禁止拖拽图片
  document.addEventListener('dragstart', (e) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'IMG') {
      e.preventDefault();
      return false;
    }
  }, true);

  // 禁止长按保存
  document.addEventListener('touchstart', (e) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'IMG') {
      // 对于某些浏览器可能不完全有效，但可以减轻风险
    }
  }, true);

  // 禁止图片被保存到剪贴板
  document.addEventListener('copy', (e) => {
    const selection = window.getSelection();
    if (selection && selection.toString().length === 0) {
      // 如果选择为空且可能是图片操作
      const activeElement = document.activeElement as HTMLElement;
      if (activeElement?.tagName === 'IMG') {
        e.preventDefault();
        return false;
      }
    }
  }, true);

  console.log('✅ 图片防护已启用 - 禁止下载');
}

/**
 * 为特定元素添加额外防护
 */
export function protectImage(imgElement: HTMLImageElement) {
  imgElement.style.userSelect = 'none';
  imgElement.style.webkitUserSelect = 'none';
  // 注：msUserSelect 在 TypeScript 中不支持，使用 setAttribute 代替
  imgElement.setAttribute('style', (imgElement.getAttribute('style') || '') + '; -ms-user-select: none;');
  imgElement.style.pointerEvents = 'none';
  imgElement.setAttribute('draggable', 'false');
  imgElement.setAttribute('ondragstart', 'return false');
}

/**
 * 为图片容器添加防护
 */
export function protectImageContainer(container: HTMLElement) {
  const images = container.querySelectorAll('img');
  images.forEach((img) => {
    protectImage(img as HTMLImageElement);
  });
}
