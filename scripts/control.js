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
  renderList(userData);
  writebox.classList.remove("show");
};
// 重置
const reset = function () {
  title.value = "";
  weatherSel.text = "";
  moodSel.text = "";
  date.value = "";
  text.value = "";
  currentLocal.innerText = "";
  map.removeOverlay(tempMarker);
};
// 取消
const cancel = function () {
  reset();
  userData.id = "";
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
      renderList(v);
    });
  }
};
// 渲染
const renderList = function (v) {
  const template = `
             <li class="content-li">
              <div class="content" onclick="toggle(event)">
                <h3>${v.title}</h3>
                <div class="tip-info">
                  <span>${v.date}</span> <span>${v.weather}</span><span>${v.mood}</span>
                </div>
                <p>${v.currentLocal}</p>
                <p class="usertext hide">
                 ${v.text}
                </p>
                <span class="delete" onclick="deleteFn(this)" data-id="${v.id}">❌</span>
              </div>
            </li>
            `;
  contentList.insertAdjacentHTML("afterbegin", template);
};
// 删除
const deleteFn = function (e) {
  const id = e.dataset.id;
  console.log(id);
  if (confirm("确定删除记录吗？")) {
    let index = localData.map((item) => console.log(item.id)).indexOf(id);

    console.log(localData);
    console.log(index);
  }
};
//  if (userData.id && confirm("确定删除笔记吗？")) {
//         const arr = this.notes.find((note) => note.id === this.selectedId);
//         const index = this.notes.indexOf(arr);
//         if (index !== -1) {
//           this.notes.splice(index, 1);
//           localStorage.setItem("notes", JSON.stringify(this.notes));
//         }
// 类名转换
const toggle = function (e) {
  const usertext = document.querySelectorAll(".usertext");
  usertext.forEach((v) => v.classList.add("hide"));
  const currentText = e.currentTarget.querySelector(".usertext");
  currentText.classList.toggle("hide");
  e.stopPropagation();
};
