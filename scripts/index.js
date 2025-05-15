// 数据
const userData = {
  id: "",
  title: "",
  weather: "",
  mood: "",
  date: "",
  currentLocal: "",
  point: null,
  text: "",
};
const localData = JSON.parse(localStorage.getItem("localData")) || [];

// 删除
const deleteFn = function () {
  console.log("delete");
};
// laydate
layui.use(function () {
  const laydate = layui.laydate;
  // 渲染
  laydate.render({
    elem: "#laydate-button",
  });
});
// 监听元素
submitBtn.addEventListener("click", submit);
resetBtn.addEventListener("click", reset);
cancelBtn.addEventListener("click", cancel);
