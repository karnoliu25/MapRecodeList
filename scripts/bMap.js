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
  map.centerAndZoom(point, 12);
  addControl();
  mapClick();
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
  // 添加城市列表
  // map.addControl(new BMapGL.CityListControl());
};
// --创建标点--
const makeMarker = function (point) {
  const marker = new BMap.Marker(point);
  map.addOverlay(marker);
  marker.addEventListener("click", function () {
    const title = `这个是标题`;
    const content = `这里是内容部分啦`;
    info(title, content, point);
  });
};
// --添加信息窗口--
const info = function (title = "hello", content = "world", point) {
  const opts = {
    window: 250,
    height: 100,
    title: title,
  };
  const infoWindow = new BMap.InfoWindow(content, opts);
  map.openInfoWindow(infoWindow, point);
};
// --点击事件--
const mapClick = function () {
  let minDistance = 10;
  let existingMarkers = [];
  map.addEventListener("click", function (e) {
    const zoom = map.getZoom();
    const newPoint = e.point;
    console.log(newPoint);
    map.panTo(newPoint);
    console.log(zoom);
    if (zoom !== 19) {
      map.setZoom(19);
    }
    if (Math.floor(zoom) === 19) {
      // 检查新点是否与已有标记点距离过近
      const isTooClose = existingMarkers.some((point) => {
        return map.getDistance(point, newPoint) < minDistance;
      });
      if (!isTooClose) {
        makeMarker(newPoint);
        existingMarkers.push(newPoint);
      }
    }
  });
};
