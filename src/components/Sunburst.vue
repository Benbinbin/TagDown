<template>
  <!-- eslint-disable max-len -->
  <svg :viewBox="`0, 0, ${this.width}, ${this.height}`">
    <g class="container" :transform="`translate(${this.width/2}, ${this.height/2})`">
      <g class="outer">
        <g class="path">
          <path v-for="node of outerNodes" :key="node.id" :fill="color(node)" :fill-opacity="arcVisible(node.current) ? (node.children ?  0.6 : 0.4) : 0" :d="arcPath(node.current)" style="cursor: pointer;" @click="clickHandler(node, $event)">
            <title>{{ node.data.title }}</title>
          </path>
        </g>
        <g class="label" text-anchor="middle" pointer-events="none" style="user-select: none;">
          <text v-for="node of outerNodes" :key="node.id" dy="0.25em" :fill-opacity="labelVisible(node.current) ? 1 : 0" :transform="labelTransform(node.current)" font-size="1em" fill="white">{{ node.data.title }}</text>
        </g>
      </g>
      <g class="center">
        <g class="center-path">
          <path v-for="node of centerNodes" :key="node.id" :fill="centerColor(node)" pointer-events="all" :d="centerArcPath(node)" :filter="node === current ? null : 'url(#shadow)'" style="cursor: pointer;" @click="clickHandler(node, $event)"></path>
        </g>
        <g class="center-label" pointer-events="none" style="user-select: none;">
          <path v-for="node of centerNodes" :key="node.id" :d="centerLabelArc(node)" :id="node.data.title" fill="none"></path>
          <text v-for="node of centerNodes" :key="node.id" dy="0.25em" text-anchor="middle" font-size="1em">
            <textPath :xlink:href="`#${node.data.title}`" startOffset="50%">{{ node.data.title }}</textPath>
          </text>
        </g>
      </g>
    </g>
    <defs>
      <filter id="shadow">
        <feDropShadow in="SourceGraphic" stdDeviation="2 2"></feDropShadow>
      </filter>
    </defs>
  </svg>
</template>

<script>
import * as d3 from 'd3';

export default {
  props: ['bookmarks'],
  data() {
    return {
      width: 500,
      height: 500,
      radius: 0,
      root: null,
      current: null,
      select: [],
    };
  },
  computed: {
    outerNodes() {
      // console.log(this.root.descendants().slice(1));
      const arr = [];
      const children = [];
      const subChildren = [];
      this.current.children.forEach((node) => {
        if (node.height !== 0) {
          arr.push(node);
          children.push(node);
        }
      });
      children.forEach((item) => {
        item.children.forEach((node) => {
          if (node.height !== 0) {
            arr.push(node);
            subChildren.push(node);
          }
        });
      });
      subChildren.forEach((item) => {
        item.children.forEach((node) => {
          if (node.height !== 0) {
            arr.push(item);
          }
        });
      });
      console.log(children);
      console.log(subChildren);
      console.log(arr);
      // return this.root.descendants().slice(1);
      return arr;
    },
    centerNodes() {
      // console.log(this.current.ancestors());
      return this.current.ancestors();
    },
    colorScale() {
      const colorScale = d3.scaleOrdinal(
        d3.quantize(d3.interpolateRainbow, this.current.children.length + 1),
      );

      return colorScale;
    },
  },
  methods: {
    arcVisible(d) {
      return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
    },
    labelVisible(d) {
      return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
    },
    color(d) {
      while (d.parent !== this.current && d.depth > this.current.depth) {
        d = d.parent;
      }
      return this.colorScale(d.data.title);
    },
    arcPath(node) {
      const arc = d3
        .arc()
        .startAngle((d) => d.x0)
        .endAngle((d) => d.x1)
        .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.02))
        .padRadius(this.radius)
        .innerRadius((d) => d.y0 * this.radius)
        .outerRadius((d) => Math.max(d.y0 * this.radius, d.y1 * this.radius - 1.5))(node);
      return arc;
    },
    labelTransform(d) {
      const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
      const y = ((d.y0 + d.y1) / 2) * this.radius;
      return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
    },
    centerColor(node) {
      const colorScale = d3.quantize(
        d3.interpolate('rgb(180, 180, 180)', 'rgb(255, 255, 255)'),
        this.centerNodes.length + 1,
      );

      if (!node.parent) {
        // 设置为根节点为白色
        return 'rgb(255, 255, 255)';
      }
      return colorScale[this.centerNodes.indexOf(node)];
    },
    centerArcPath(node) {
      const centerRadius = this.radius / this.centerNodes.length;

      const arc = d3
        .arc()
        .startAngle(0)
        .endAngle(2 * Math.PI)
        .innerRadius((d) => d.y0 * centerRadius)
        .outerRadius((d) => Math.max(d.y0 * centerRadius, d.y1 * centerRadius))(
          node,
        );

      return arc;
    },
    centerLabelArc(node) {
      const centerRadius = this.radius / this.centerNodes.length;

      const path = d3.path();
      if (node.parent) {
        // 对于其他节点（完整的圆环），字体对应的路径是曲线（位于环形中心）
        path.arc(0, 0, ((node.y0 + node.y1) / 2) * centerRadius, -Math.PI, 0);
      } else {
        // 对于根节点（在中心，圆形形式），字体对应的路径是直线（位于圆心）
        path.moveTo(-centerRadius / 2, 0);
        path.lineTo(centerRadius / 2, 0);
      }

      return path;
    },
    clickHandler(p, event) {
      this.current = p;
      // 基于点击的节点为参考标准，重新计算其他节点的定位
      this.outerNodes.forEach((d) => {
        d.current = {
          x0:
            Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0)))
            * 2
            * Math.PI,
          x1:
            Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0)))
            * 2
            * Math.PI,
          y0: Math.max(0, d.y0 - p.depth),
          y1: Math.max(0, d.y1 - p.depth),
        };
      });
    },
  },
  created() {
    // 结构化数据
    this.root = d3
      .hierarchy(this.bookmarks)
      .eachAfter((d) => {
        if (d.height === 0) {
          d.value = 0;
        } else if (d.height === 1) {
          d.value = 1;
        } else {
          let value = 0;

          d.children.forEach((item) => {
            value += item.value;
          });
          d.value = value;
        }
      })
      .sort((a, b) => b.value - a.value);

    console.log(this.root);
    // 计算节点的层次布局
    const tree = d3.partition().size([2 * Math.PI, this.root.height + 1])(
      this.root,
    );

    tree.each((d) => {
      d.current = {
        x0: d.x0,
        x1: d.x1,
        y0: d.y0,
        y1: d.y1,
      };
    });

    this.current = this.root;

    // 设置径向树环形的宽度
    this.radius = this.width > this.height ? this.height / 6 : this.width / 6;
  },
};
</script>

<style lang="scss" scoped>
svg {
  width: 100%;
  height: 100%;
}
</style>
