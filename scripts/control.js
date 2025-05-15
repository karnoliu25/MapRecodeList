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
  currentDis(userData);
  reset();
  writebox.classList.remove("show");
};
// 重置
const reset = function () {
  userData.id = Date.now();
  userData.title = "";
  title.value = "";
  userData.weather = "";
  userData.mood = "";
  userData.date = "";
  date.value = "";
  userData.currentLocal = "";
  userData.text = "";
  text.value = "";
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
// 历史显示
const contentDis = function () {
  if (localData) {
    localData.forEach((v) => {
      currentDis(v);
    });
  }
};
// 新增显示
const currentDis = function (v) {
  const template = `
             <li class="content-li">
              <div class="content">
                <h3>${v.title}</h3>
                <div class="tip-info">
                  <span>${v.date}</span> <span>${v.weather}</span><span>${v.mood}</span>
                </div>
                <p>${v.currentLocal}</p>
                <p class="usertext hide">
                 ${v.text}
                </p>
                <span class="delete">❌</span>
              </div>
            </li>
            `;
  contentList.insertAdjacentHTML("afterbegin", template);
};
// 删除
// const deleteFn = function () {
//   console.log(deleteBtns);
//   console.log("delete");
// };
// console.log(deleteBtns);
