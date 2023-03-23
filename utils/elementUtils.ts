// 全局滚动的盒子
export let layoutContent: any = null;
// 全局导航盒子
export let layoutNav: any = null;
// 当前的主题
export let theme: number = 1;
// 记录上一次滚动的位置
let lastScrollPos = 0;
export let time;

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

// 设置全局导航样式
export const addNavItemStyle = () => {
    const domList = Array.from(document.querySelectorAll('.nav_item_text'));
    domList.forEach((v: any) => v?.classList.add('nav_item_block'));
    if (!layoutNav) return;
    layoutNav?.classList.add('nav_active_border');
};

// 取消全局导航样式
export const removeNavItemStyle = () => {
    const domList = Array.from(document.querySelectorAll('.nav_item_text'));
    domList.forEach((v: any) => v?.classList.remove('nav_item_block'));
    if (!layoutNav) return;
    layoutNav?.classList.remove('nav_active_border');
};

// 页面滚动事件
export const pageScroll = () => {
    if (!layoutNav) return;
    if (layoutContent?.scrollTop && layoutContent?.scrollTop > 50) {
        layoutNav?.classList.add('nav_active');
        if (lastScrollPos - layoutContent?.scrollTop > 30) {
            lastScrollPos = layoutContent?.scrollTop
            layoutNav?.classList.remove('nav_none');
        }
        if (layoutContent?.scrollTop > 30 && layoutContent?.scrollTop - lastScrollPos > 30) {
            lastScrollPos = layoutContent?.scrollTop
            layoutNav?.classList.add('nav_none');
        }
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
    lastScrollPos = 0;
};

// 获取当前的主题
export const setTheme = (v) => {
    theme = v;
}