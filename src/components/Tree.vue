<template>
  <!-- eslint-disable max-len -->
  <svg class="tree-diagram" :viewBox="viewBox">
    <circle cx="0" cy="0" r="5" fill="red"></circle>
    <g class="container" ref="container" :transform="adjustTransform">
      <g class="links-container" fill="none" stroke="#555" stroke-opacity="0.4" stroke-width="1.5">
        <path v-for="link of links" :key="link.target.id" :d="linkPath(link)"></path>
      </g>
      <g class="nodes-cotainer" cursor="pointer" pointer-events="all" style="font: 12px sans-serif;">
        <g v-for="node of nodes" :key="node.id" @click="clickHandler(node, $event)" :transform="`translate(${node.y}, ${node.x})`">
          <text dy="0.35em" x="0.8em" text-anchor="start" stroke-linejoin="round" stroke-width="5" stroke="white">
            {{ text(node) }}
          </text>
          <text dy="0.35em" x="0.8em" text-anchor="start">
            {{ text(node) }}
          </text>
          <svg v-if="!node._children && node.parent" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2f89fc" class="bi bi-bookmark-fill" viewBox="0 0 16 16" x="-0.6em" y="-0.6em">
            <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
          </svg>
          <svg v-if="node._children && node.parent" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#feb062" class="bi bi-folder-fill" viewBox="0 0 16 16" x="-0.6em" y="-0.6em">
            <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z" />
          </svg>
          <title>{{ node.data.title }}</title>
        </g>
      </g>
    </g>
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
      dx: 25,
      root: null,
      nodes: null,
      links: null,
      zoom: null,
      transform: {
        x: 0,
        y: 0,
        k: 1,
      },
      zoomType: 'click',
    };
  },
  computed: {
    dy() {
      return this.width / 4;
    },
    viewBox() {
      return `${-2 * this.dy}, ${-this.height / 2}, ${this.width}, ${
        this.height
      }`;
    },
    adjustTransform() {
      if (this.zoomType === 'click') {
        return `scale(${this.transform.k}) translate(${this.transform.x}, ${this.transform.y})`;
      }
      return `translate(${this.transform.x}, ${this.transform.y}) scale(${this.transform.k}) `;
    },
  },
  methods: {
    tree() {
      // 计算节点的层次布局，为 this.root 的每个节点添加坐标属性
      d3.tree().nodeSize([this.dx, this.dy])(this.root);

      // 节点数据数组
      this.nodes = this.root.descendants();
      // 连线数据数组
      this.links = this.root.links();
    },
    linkPath(link) {
      const linkGenerator = d3
        .linkHorizontal()
        .x((d) => d.y)
        .y((d) => d.x);
      return linkGenerator(link);
    },
    text(node) {
      const len = Math.floor(this.dy / 12);
      if (node.data.title.length > len) {
        return `${node.data.title.substr(0, len).trim()}...`;
      }
      return node.data.title;
    },
    clickHandler(d, event) {
      if (!d.parent) return; // 根节点不可操作
      if (!d._children) {
        // 处理叶子节点的点击事件
        console.log(d.data.title);
      } else {
        // 处理非叶子节点的点击事件
        // 切换 children 属性值（在 null 和预先设置的 _children 之间切换）
        d.children = d.children ? null : d._children;

        if (d.children) {
          // 展开子树
          d.parent.children.forEach((item) => {
            if (item !== d) {
              // 同时收起同层其他节点下的子树
              item.children = null;
            }
          });
          this.tween(d, true);
        } else {
          // 收缩子树
          this.tween(d, false);
        }
        this.tree();
      }
    },
    tween(d, isExpand) {
      /**
       * 点击节点如果展开子树，则节点移动到垂直居中位置
       * 点击节点如果收缩节点，其上一级父节点移动到垂直居中位置
       */
      let scale = 1;
      let x;
      let y;
      if (isExpand) {
        // 展开子树
        scale = this.height / ((d.children.length + 2) * this.dx);
        x = d.y;
        y = d.x;
      } else {
        //  收缩子树
        scale = this.height / ((d.parent.children.length + 2) * this.dx);
        x = d.parent.y;
        y = d.parent.x;
      }

      if (scale > 1.2) {
        // 最大放大倍数是 1.2
        scale = 1.2;
      }

      this.zoomType = 'click';

      d3.transition()
        .duration(500)
        .tween('adjustTransform', () => {
          const interpolate = d3.interpolate(this.transform, {
            x: -x,
            y: -y,
            k: scale,
          });
          return (t) => {
            this.transform = interpolate(t);
          };
        });
    },
    zoomHandler(event) {
      this.zoomType = 'click';

      // console.log(event);
      // const { x, y, k } = event.transform;
      this.transform = event.transform;
    },
  },
  created() {
    // 结构化数据
    this.root = d3.hierarchy(this.bookmarks);

    this.root.descendants().forEach((d, i) => {
      d.id = i;
      d._children = d.children;
      if (d.depth >= 1) d.children = null; // 初始化只显示两个层级
    });

    // 计算节点的层次布局
    this.tree();
  },
  mounted() {
    // 响应用户主动缩放和拖移操作
    this.zoom = d3.zoom().scaleExtent([0.5, 10]).on('zoom', this.zoomHandler);
    d3.select('.tree-diagram').call(this.zoom);
  },
};
</script>

<style lang="scss" scoped>
svg {
  width: 100%;
  height: 100%;
}
</style>
