// 操作函数
// 提交
const submit = function () {
  const newEntry = {
    id: Date.now(),
    title: title.value === "" ? "未命名" : title.value,
    weather: selectAbout(weatherSel),
    mood: selectAbout(moodSel),
    date: date.value === "" ? "未记录时间" : date.value,
    currentLocal: currentLocal.innerText,
    text: text.value === "" ? "未做记录" : text.value,
    point: userData.point,
  };
  localData.push(newEntry);
  save();
  makeMarker(newEntry.point, newEntry.title, newEntry.text);
  renderList();
  writebox.classList.remove("show");
  console.log(localData);
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
// 渲染
const renderList = function () {
  contentList.innerHTML = "";
  if (localData && localData.length) {
    localData.forEach((v) => {
      templateList(v);
    });
  }
};
// 模板
const templateList = function (v) {
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
    let index = localData.findIndex((i) => i.id == id);
    console.log(index);
    if (index !== -1) {
      localData.splice(index, 1);
      save();
      renderList();
    }
  }
};
// 类名转换
const toggle = function (e) {
  const usertext = document.querySelectorAll(".usertext");
  usertext.forEach((v) => v.classList.add("hide"));

  const currentText = e.currentTarget.querySelector(".usertext");
  const currentId = e.currentTarget.querySelector(".delete").dataset.id;
  console.log(currentId);
  let currentObj = localData.find((i) => i.id == currentId);
  info(currentObj);
  console.log(currentObj);

  currentText.classList.toggle("hide");
  e.stopPropagation();
};
