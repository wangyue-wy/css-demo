<template>
  <div class="map-box">
    <div id="map" style="height: 100%"></div>
    <ul id="popup" class="ol-popup">
      <li v-for="(item, index) in cityPopList" :key="index">{{item.name}}：{{item.value}}</li>
    </ul>
  </div>
</template>

<script>
import 'ol/ol.css'
import { Map, View, Feature } from 'ol' // 地图,视图,用于地理特征的矢量元素，具有几何geometry()和其他属性，类似于矢量文件格式(如GeoJSON)中的特性。
// import OSM from 'ol/source/OSM' // 可以理解为数据源,就是一张图片
import TileLayer from 'ol/layer/Tile' // 可以理解为图层
import XYZ from 'ol/source/XYZ' // 自定义设置图片链接
import { fromLonLat } from "ol/proj" // 将坐标从经度/纬度转换为不同的投影。
import {toLonLat} from 'ol/proj' // 将坐标转换为经度/纬度。
import { transform } from 'ol/proj' // 将坐标从源投影转换为目标投影。这将返回一个新坐标（并且不会修改原始坐标）。
import { toStringHDMS } from 'ol/coordinate'
import { Vector as VectorSource } from 'ol/source' // 数据源
import { Vector as VectorLayer } from 'ol/layer' // 视图层
import { Point } from 'ol/geom' // 用于添加图标的位置
import { Style, Icon, Stroke, Fill, Text } from 'ol/style' // 修改样式和icon
import { defaults } from 'ol/control' // 设置控件参数
import GeoJSON from 'ol/format/GeoJSON'
import anhuiJson from '@/assets/anhui.json'
import hefeiJson from '@/assets/hefei.json'
import chuzhouJson from '@/assets/chuzhou.json'
import Select from 'ol/interaction/Select'
import { pointerMove } from 'ol/events/condition'
import { Overlay } from 'ol' // overlay是覆盖物的意思，主要是放置一些和地图位置相关的元素
export default {
  props: {
    id: {
      type: String,
      default: 'map'
    }
  },
  data () {
    return {
      olMap: null,
      vectorLayer: '', // 图层实例
      iLayer: {},
      cityPopList: [
        { name: '光伏1', value: 100 },
        { name: '光伏2', value: 200 }
      ],
      allPop: [
        {
          id: '340500',
          detail: [
            { name: '光伏1', value: 100 },
            { name: '光伏2', value: 200 }
          ]
        }, // 马鞍山市
        {
          id: '341100',
          detail: [
            { name: '光伏3', value: 100 },
            { name: '光伏4', value: 200 }
          ]
        }, // 滁州市
        {
          id: '340400',
          detail: [
            { name: '光伏5', value: 100 },
            { name: '光伏6', value: 200 }
          ]
        } // 淮南市
      ], // 提示弹窗数据
      centerPoint: [117.20175263827569, 31.791319694500544] // 地图中心点
    }
  },
  mounted () {
    this.initMap()
  },
  methods: {
    // "EPSG:3857"又称为球面墨卡托投影。将地图投影到一个地图平面上。
    // 为了正确的在商业地图API上叠加地图数据，就必须使用该投影。最基本的是在商业地图API上显示栅格瓦片地图——例如TMS，WMS以及其他类似的瓦片。
    // 如果我们不指定特别的投影，OpenLayers的默认投影为EPSG:3857
    // "EPSG:4326",在地图上将经纬度直接当做X/Y对待(最常用)
    // 数据存储在 EPSG:4326中，显示在EPSG:3857中
    // fromLonLat是将EPSG:4326转换为EPSG:3857；而toLonLat是将EPSG:3857转换为EPSG:4326
    // transform是两种格式的相互转换
    // 初始化地图
    initMap () {
      this.olMap = new Map({
        target: 'map',
        layers: [
          new TileLayer({
            // source: new OSM({}) // 外网地图图片，访问不了，所以使用底下自定义
            source: new XYZ({
              // url: 'https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'
              // url: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}'
              url: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}'
            })
          })
        ],
        view: new View({
          center: fromLonLat([117.20175263827569, 31.791319694500544]), 
          // projection: 'EPSG:4326',
          zoom: 7,
          maxZoom: 20
        }),
        // 设置地图控件
        controls: defaults({
          zoom: false, // 不显示放大放小按钮；
          rotate: false, // 不显示指北针控件；
          attribution: false // 不显示右下角的地图信息控件
        }).extend([])
      })
      this.mapEvent()
      this.setIcon()
    },
    // 点击城市下钻
    drillDown (fe) {
      const so = [fe.values_.center[0], fe.values_.center[1]]
      console.log(fe )
      if (fe.values_.level === 'city') {
        if (fe.values_.name === '合肥市' || fe.values_.name === '滁州市') {
          this.removeLayer('sert')
          const json = fe.values_.name === '合肥市' ? hefeiJson : chuzhouJson
          this.setBgf(json)
        } else {
          this.removeLayer('sert')
        }
        this.olMap.getView().setZoom(9)
        this.olMap.getView().setCenter(fromLonLat(so))
      } else {
        this.removeLayer('sert')
        this.olMap.getView().setZoom(11)
        this.olMap.getView().setCenter(fromLonLat(so))
      }
    },
    // 地图事件
    mapEvent () {
      // singleclick:地图单击事件, dblclick:地图双击事件, click:地图点击事件, pointerdrag：鼠标拖拽事件, pointermove：鼠标移动事件。
      this.olMap.on('singleclick', (e) => {
        console.log('地图被单击了', e)
        console.log(e.coordinate)
        // console.log(transform(this.olMap.getEventCoordinate(e.originalEvent), 'EPSG:3857', 'EPSG:4326')) // 获取点击的坐标并且转换
        console.log(this.olMap.getEventCoordinate(e.originalEvent))
        const fe = this.olMap.forEachFeatureAtPixel(e.pixel, (fe) => {
          return fe
        })
        if (fe) {
          this.drillDown(fe)
        }
        // this.clPop(e)
        console.log(this.olMap.getLayers().getArray())
      })
      // change:layerGroup :地图图层增删时触发, change:size :地图窗口发生变化就会触发，与我们常用的窗口resize接近
      // change:target :地图绑定的div发生更改时触发，如map.setTartget方法就会触发该事件
      // change:view :地图view对象发生变化触发。
      // propertychange: Map对象中任意的property值改变时触发。
      this.olMap.on('change:size', (e) => {
        console.log('size改变', e)
      })
      // moveend——移动结束事件，首次会加载
      this.olMap.on('moveend', (e) => {
        console.log(e, 2222222)
      })
      this.setBgf(anhuiJson)
    },
    // 在特定位置添加图片
    setIcon () {
      const iconImg = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png' // 图片地址
      const arr = [
        [13293883.899189748, 3791595.314230861],
        [13374601.401058894, 3943246.378348651]
      ]
      const featureList = []
      arr.map((item, index) => {
        // 设置添加icon的位置
        const feature = new Feature({
          geometry: new Point(item),
          id: index + 1 // 可以无限添加自己想要的参数。
        })
        // 加如icon和样式
        feature.setStyle(new Style({
          image: new Icon({
            opacity: 1,
            src: iconImg,
            // anchor: [0.5, 3], // 偏移位置
            // offset: [0, 1], // 偏移量设置
            scale: 1 // 图标缩放比例
          })
        }))
        featureList.push(feature)
      })
      // 将feature加入数据源
      const vectorSource = new VectorSource({
        features: featureList
      })
      // 将数据源加入图层
      this.vectorLayer = new VectorLayer({
        source: vectorSource,
        id: 'icon'
      })
      // 将图层添加到页面
      this.olMap.addLayer(this.vectorLayer)
      console.log(this.olMap.getView().getZoom())
      console.log(this.vectorLayer.getSource().getFeatures())
      // console.lpg(this.olMap.layers.getSource())
    },
    // 给特定区域加上背景
    setBgf (region) {
      const features = new GeoJSON({ featureProjection: 'EPSG:3857' }).readFeatures(region)
      const source = new VectorSource({
        features
      })
      const styleFunction = (featureData) => {
        return styles(
          featureData.getGeometry().getType(), // 获取几何类型
          '#31969A',
          featureData
        )
      }
      const styles = (type, color = '#31969A', featureData) => {
        const styleType = {
          MultiPolygon: new Style({
            stroke: new Stroke({
              color: '#fff',
              width: 1
            }),
            fill: new Fill({
              color: color
            }),
            text: new Text({
              textAlign: 'center',     //对齐方式
              textBaseline: 'middle',    //文本基线
              font: 'normal 12px 微软雅黑',     //字体样式
              text: featureData.get('name'),    //文本内容
              offsetY: 0, // Y轴偏置
              offsetX: 0, // x轴偏移
              fill: new Fill({        //填充样式
              color: '#ffffff'
              }),
              // backgroundFill: new Fill({      // 填充背景
              //   color: asString([0, 0, 0, 0.6])
              // })
            })
          }),
          Polygon: new Style({
            stroke: new Stroke({
              color: '#fff',
              width: 1
            }),
            fill: new Fill({
              color: color
            }),
            text: new Text({
              textAlign: 'center',     //对齐方式
              textBaseline: 'middle',    //文本基线
              font: 'normal 12px 微软雅黑',     //字体样式
              text: featureData.get('name'),    //文本内容
              offsetY: 0,    // Y轴偏置
              fill: new Fill({        //填充样式
              color: '#ffffff'
              }),
              // backgroundFill: new Fill({      // 填充背景
              //   color: asString([0, 0, 0, 0.6])
              // })
            })
          })
        }
        return styleType[type]
      }
      const layer = new VectorLayer({
        id: 'sert', // 赋予图层id，便于鼠标只有悬浮这个id的图层时才会切换效果
        source: source,
        zIndex: 2,
        // opacity: 0.5,
        style: styleFunction
      })
      this.olMap.addLayer(layer)
      console.log(layer.getSource().getFeatures())
      layer.getSource().getFeatures().map(item => {
        console.log(item.values_.adcode, item.values_.name)
      })
      this.addHo('sert')
    },
    // 添加悬浮样式
    addHo (layerId) {
      // chat gpt
      // this.olMap.getLayers 获取map中的所有图层
      // map.getLayers().getArray() 获取图层数组
      // layer.setVisible(bool) 设置图层是否可见
      let selectPointerMove = new Select({
        condition: pointerMove, // 触发的方法
        layers: [this.getLayer(layerId)], // 设置哪些图层可以被选择，相当于过滤
        style: () => {
          return null
        } // 被选中图层的样式
      })
      // // addInteraction()方法在地图上添加Interaction对象
      // // Interaction，是一个虚基类，不负责实例化，交互功能都继承该基类
      this.olMap.addInteraction(selectPointerMove)
      const styleFunction = (featureData) => {
        return styles(
          featureData.getGeometry().getType(),
          '#35DEE4',
          featureData
        )
      }
      const styles = (type, color = '#35DEE4', featureData) => {
        const styleType = {
          MultiPolygon: new Style({
            stroke: new Stroke({
              color: '#fff',
              width: 1
            }),
            fill: new Fill({
              color: color
            }),
            text: new Text({
              textAlign: 'center',     //对齐方式
              textBaseline: 'middle',    //文本基线
              font: 'normal 12px 微软雅黑',     //字体样式
              text: featureData.get('name'),    //文本内容
              offsetY: 0, // Y轴偏置
              offsetX: 0, // x轴偏移
              fill: new Fill({        //填充样式
              color: '#ffffff'
              }),
              // backgroundFill: new Fill({      // 填充背景
              //   color: asString([0, 0, 0, 0.6])
              // })
            })
          }),
          Polygon: new Style({
            stroke: new Stroke({
              color: '#fff',
              width: 1
            }),
            fill: new Fill({
              color: color
            }),
            text: new Text({
              textAlign: 'center',     //对齐方式
              textBaseline: 'middle',    //文本基线
              font: 'normal 12px 微软雅黑',     //字体样式
              text: featureData.get('name'),    //文本内容
              offsetY: 0,    // Y轴偏置
              fill: new Fill({        //填充样式
              color: '#ffffff'
              }),
              // backgroundFill: new Fill({      // 填充背景
              //   color: asString([0, 0, 0, 0.6])
              // })
            })
          })
        }
        return styleType[type]
      }
      selectPointerMove.on('select', (e) => {
        console.log(e)
        e.target.getFeatures().array_.map(item => {
          item.setStyle(styleFunction(item))
        })
        if (e.selected.length > 0) {
          this.showPop(e.selected)
        } else {
          // 删除弹窗
          const card = this.olMap.getOverlayById('pop')
          if (card) card.setPosition(undefined)
        }
      })
    },
    // 根据id获取对应的图层
    getLayer (id) {
      return this.olMap.getLayers().getArray().find(v => v.values_?.id === id)
    },
    // 根据id删除图层
    removeLayer (id) {
      const layer = this.getLayer(id)
      layer && this.olMap.removeLayer(layer)
    },
    // 展示提示弹窗
    showPop (e) {
      let fe = e[0]
      this.cityPopList = this.allPop.find(v => v.id == fe.values_.adcode)?.detail
      if (this.cityPopList?.length) {
        const container = document.getElementById('popup')
        // 创建一个overlay, 绑定html元素container
        // const acroutes = fe.getGeometry().getCoordinates()
        const acroutes = fromLonLat([fe.values_.center[0], fe.values_.center[1]])
        console.log(acroutes, 33333)
        const overlay = new Overlay({
          id: 'pop', // 为对应的 overlay 设置一个 id，便于使用 ol.Map 的 getOverlayById 方法取得相应的 overlay
          element: container, // domm元素
          offset: [0, -15], // 偏移量，像素为单位，overlay 相对于放置位置（position）的偏移量，默认值是 [0, 0]
          position: [acroutes[0] - 150000, acroutes[0] + 80000], // 在地图所在的坐标系框架下，overlay 放置的位置
          positioning: 'bottom-center', // overlay 对于 position 的相对位置，可能的值包括 bottom-left、bottom-center、bottom-right 、center-left、center-center、center-right、top-left、top-center、top-right，默认是 top-left，也就是 element 左上角与 position 重合
          stopEvent: true, // 地图的事件传播是否停止，默认是 true，即阻止传播
          autoPan: true, // 当触发 overlay setPosition 方法时触发，当 overlay 超出地图边界时，地图自动移动，以保证 overlay 全部可见
          autoPanAnimation: {
            duration: 250
          } // 设置 autoPan 的效果动画
        })
        overlay.setPosition(acroutes)
        this.olMap.addOverlay(overlay)
      } else {
        const card = this.olMap.getOverlayById('pop')
        if (card) card.setPosition(undefined)
      }
    },
    clPop (e) {
      const container = document.getElementById('popup')
      const overlay = new Overlay({
        id: 'wer',
        element: container,
        autoPan: true,
        autoPanAnimation: {
          duration: 250
        }
      })
      // overlay.setPosition(undefined)
      // console.log(e.coordinate, toLonLat(e.coordinate))
      // const we = toStringHDMS(e.coordinate)
      // const we = fromLonLat(e.coordinate)
      console.log(e.coordinate, 1111111111)
      // overlay.setPosition(e.coordinate)
      // this.olMap.addOverlay(overlay)
    }
  }
}
</script>

<style lang="less" scoped>
.map-box {
  width: 100%;
  height: 100%;
  position: relative;
}
.ol-popup {
  width: 130px;
  height: 100px;
  background: skyblue;
  // position: absolute;
  // z-index: 1000;
  // top: 0;
  // left: 0;
  padding: 0 16px;
  li {
    margin-top: 10px;
  }
}
</style>
