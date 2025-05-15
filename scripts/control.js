// 操作函数
// 提交
const submit = function () {
  userData.id = Date.now();
  userData.title = title.value === "" ? "未命名" : title.value;
  userData.weather = selectAbout(weatherSel);
  userData.mood = selectAbout(moodSel);
  userData.date = date.value === "" ? "未记录时间" : date.value;
  userData.currentLocal = currentLocal.innerText;
  userData.text = text.value === "" ? "未做记录" : text.value;
  localData.push(userData);
  save();
  makeMarker(userData.point, userData.title, userData.text);
  writebox.classList.remove("show");
};
// 重置
const reset = function () {
  userData.id = Date.now();
  userData.title = "";
  userData.weather = "";
  userData.mood = "";
  userData.date = "";
  userData.currentLocal = "";
  userData.text = "";
  userData.point = null;
  currentLocal.innerText = "";
  map.removeOverlay(tempMarker);
};
// 取消
const cancel = function () {
  userData.id = "";
  reset();
  writebox.classList.remove("show");
};
console.log(localData);
// 获取select相关数据
const selectAbout = function (select) {
  const options = select.options;
  const index = select.selectedIndex;
  const selectedText = options[index].text;
  return selectedText;
};
// 保存
const save = function () {
  localStorage.setItem("localData", JSON.stringify(localData));
};
