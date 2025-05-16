if (window.location.protocol === "https:") {
  BMAP_PROTOCOL = "https"; // 全局设置
}

const map = new BMap.Map("map", {
  enableRotate: false, // 禁止旋转
  enableTilt: true, // 可以倾斜
}); // 创建Map实例

map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

// 获取用户当前经纬度
navigator.geolocation.getCurrentPosition(
  function (position) {
    const longitude = position.coords.longitude;
    const latitude = position.coords.latitude;
    init(longitude, latitude);
  },
  function () {
    console.log(`error`);
    init();
  }
);

// ==操作函数==
// --初始化地图
const init = function (lng = 116.404, lat = 39.915) {
  const point = new BMap.Point(lng, lat);
  map.centerAndZoom(point, 14);
  addControl();
  map.clearOverlays();
  localData.forEach((v) => {
    makeMarker(v.point, v.title, v.text);
  });
  throttle(geocoder(), 1000);
};
// --添加控件--
const addControl = function () {
  // 位置参数
  const opts = {
    offset: new BMap.Size(150, 30),
  };
  // 添加版权信息
  map.addControl(new BMap.CopyrightControl());
  // 添加比例尺
  map.addControl(new BMap.ScaleControl(opts));
};
// --创建标点--
const makeMarker = function (point, title, text) {
  const marker = new BMap.Marker(point);
  map.addOverlay(marker);
};
// --添加信息窗口--
const info = function (ob) {
  const content = `${ob.text || "无信息"}`;
  const infoWindow = new BMap.InfoWindow(content);
  const point = new BMap.Point(ob.point.lng, ob.point.lat);
  map.openInfoWindow(infoWindow, point);
};
// --点击事件----逆地址解析--
// 创建临时标注
let tempMarker = null;
const geocoder = function () {
  // 实例化地址解析器
  const geoc = new BMap.Geocoder();
  map.addEventListener("click", function (e) {
    if (tempMarker) {
      // 清除地图上一个的覆盖物;
      map.removeOverlay(tempMarker);
    }
    const pt = e.point;
    const point = new BMap.Point(pt.lng, pt.lat);
    userData.point = point;
    tempMarker = new BMap.Marker(point);
    map.addOverlay(tempMarker);
    title.value = "";
    weatherSel.text = "";
    moodSel.text = "";
    date.value = "";
    text.value = "";
    currentLocal.innerText = "";
    writebox.classList.add("show");
    geoc.getLocation(pt, function (e) {
      const address = e.addressComponents;
      currentLocal.innerText = `${
        address.province +
        address.city +
        address.district +
        address.street +
        address.streetNumber
      }`;
    });
  });
};
// ==节流器==
const throttle = function (fn, delay = 500) {
  let timer = null;
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        fn.apply(this, args);
      }, delay);
    }
  };
};
