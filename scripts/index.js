// laydate
layui.use(function () {
  const laydate = layui.laydate;
  // 渲染
  laydate.render({
    elem: "#laydate-button",
  });
});
// 监听元素
window.addEventListener("load", renderList);
submitBtn.addEventListener("click", submit);
resetBtn.addEventListener("click", reset);
cancelBtn.addEventListener("click", cancel);
