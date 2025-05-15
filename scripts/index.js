// 数据
const userData = {
  id: "",
  title: "",
  weather: "",
  mood: "",
  date: "",
  currentLocal: "",
  text: "",
};
const localData = localStorage.getItem("userData") || [];

// 操作函数
const submit = function () {
  userData.id = Date.now();
  userData.title = title.value === "" ? "未命名" : title.value;
  userData.weather = selectAbout(weatherSel);
  userData.mood = selectAbout(moodSel);
  userData.date = date.value === "" ? "未记录时间" : date.value;
  userData.currentLocal = "";
  console.log(userData.date);
};
// submit();
// 获取select相关数据
const selectAbout = function (select) {
  const options = select.options;
  const value = select.value;
  const index = select.selectedIndex;
  const selectedText = options[index].text;
  return selectedText;
};
// 监听元素
submitBtn.addEventListener("click", submit);

// laydate
layui.use(function () {
  const laydate = layui.laydate;
  // 渲染
  laydate.render({
    elem: "#laydate-button",
  });
});
