// 全局滚动的盒子
export let layoutContent: any = null;
// 全局导航盒子
export let layoutNav: any = null;
// 当前的主题
export let theme: number = 1;

// 初始化获取全局元素
export const getLayoutDom = () => {
    layoutContent = document.getElementById('__next');
    layoutNav = document.getElementById('layout_nav');
};

// 取消全局导航的样式
export const removeLayoutNavStyle = () => {
    if (!layoutNav) return;
    layoutNav?.classList.remove('nav_active');
};

// 设置全局导航样式
export const addLayoutNavStyle = () => {
    if (!layoutNav) return;
    layoutNav?.classList.add('nav_active');
};

// 页面滚动事件
export const pageScroll = () => {
    if (!layoutNav) return;
    if (layoutContent?.scrollTop && layoutContent?.scrollTop > 300) {
        layoutNav?.classList.add('nav_active');
    } else {
        layoutNav?.classList.remove('nav_active');
    }
};

// 设置页面滚动事件
export const bindHandleScroll = () => {
    if (!layoutContent) return;
    layoutContent.addEventListener('scroll', pageScroll, false);
};

// 卸载页面滚动事件
export const removeScroll = () => {
    if (!layoutContent) return;
    layoutContent.removeEventListener('scroll', pageScroll, false);
};