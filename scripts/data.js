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
