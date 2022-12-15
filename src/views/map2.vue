<template>
  <div id="content">
    <div id="map" ref="map"></div>
  </div>
</template>
<script>
import "ol/ol.css";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import { Vector as VectorSource } from "ol/source";
import XYZ from "ol/source/XYZ";
import Map from 'ol/Map';
import View from 'ol/View';
import GeoJSON from "ol/format/GeoJSON";
import Feature from 'ol/Feature';
import { Style, Stroke, Fill } from "ol/style";
import { Polygon, MultiPolygon } from "ol/geom";
import { defaults as defaultControls, OverviewMap } from "ol/control";
import { fromLonLat } from "ol/proj";
import ZoomSlider from "ol/control/ZoomSlider";
 
import chinaGeo from "@/assets/anhui.json";  //中国范围
 
export default {
    name: 'OlJson02',
    data() {
        return {
            map: null,
            areaLayer: {},
            areaSource: {},
            vs: {},
        };
    },
    methods: {
        /**
         * 初始化地图
         */
        initMap(){
          let view = new View({
            center: fromLonLat([117.20175263827569, 31.791319694500544]),
            zoom: 7
          });
          let vs = new VectorSource({  //重要：读取Geojson格式数据的方式--之前出现
            features: (new GeoJSON({featureProjection: 'EPSG:3857'})).readFeatures(chinaGeo)  //读取Geojson格式数据，只有通过这种方式才能出来！！！
          });
          this.vs = vs;
          const styleFunction = (featureData) => {
            console.log(featureData, featureData.getGeometry().getType())
            return styles(
              featureData.getGeometry().getType()
            )
          }
          const styles = (type, color = '#31969A') => {
            const styleType = {
              MultiPolygon: new Style({
                stroke: new Stroke({
                  color: '#fff',
                  width: 1
                }),
                fill: new Fill({
                  color: 'red'
                })
              }),
              Polygon: new Style({
                stroke: new Stroke({
                  color: '#fff',
                  width: 1
                }),
                fill: new Fill({
                  color: color
                })
              })
            }
            return styleType[type]
          }
          this.map = new Map({
            layers: [
              new TileLayer({
                source: new XYZ({  //黑色底图
                    url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}"
                }),
              }),
              new VectorLayer({
                source: this.vs,
                zIndex: 2,
                style: styleFunction,
                opacity: 0.5
              })
            ],
            target: "map",
            view: view,
            controls: defaultControls().extend([new ZoomSlider()])
          });
        }
 
    },
    mounted() {
        this.initMap();//初始化地图方法
    }
};
</script>
<style lang="less" scoped>
// 此处非核心内容，已删除
#map{
    height: 100vh;
    width: 100%;
}
</style>