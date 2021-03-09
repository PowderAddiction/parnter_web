export default function getCurPage() {
    let pages = getCurrentPages();
    let curPage = pages[pages.length - 1];
    return curPage;
}