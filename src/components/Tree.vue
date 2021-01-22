<template>
  <div class="tree-container">
  </div>
</template>

<script>
import * as d3 from 'd3';

/**
 * 预设参数和构建 svg 相关元素的容器
 */
// <svg> 元素的尺寸
const width = 500;
const height = 500;
// 树布局的节点尺寸
const dx = 25;
const dy = width / 4;

// 创建 svg 元素，设置合适的视窗 viewBox 大小
const svg = d3
  .create('svg')
  .attr('viewBox', [-2 * dy, -height / 2, width, height])
  .style('font', '14px sans-serif');

// 所有树图元素的容器 <g>
const container = svg.append('g').attr('class', 'container');

// 创建节点间连线容器 <g>，并设置线条的样式
const gLink = container
  .append('g')
  .attr('fill', 'none')
  .attr('stroke', '#555')
  .attr('stroke-opacity', 0.4)
  .attr('stroke-width', 1.5);

// 创建节点容器 <g>，并设置鼠标悬浮时的样式
const gNode = container
  .append('g')
  .attr('cursor', 'pointer')
  .attr('pointer-events', 'all');

/**
 * 响应用户主动缩放和拖移操作
 */
function zoomHandler(event) {
  const { x, y, k } = event.transform;
  container.attr('transform', `translate(${x}, ${y}) scale(${k})`);
}

const zoom = d3.zoom().scaleExtent([0.5, 10]).on('zoom', zoomHandler);

svg.call(zoom);

export default {
  props: ['bookmarks'],
  data() {
    return {
      root: null,
    };
  },
  methods: {
    update(source, duration = 250) {
      /**
       * 基于「更新」的 this.root 数据重新计算节点的层次布局坐标，更新画面
       */
      d3.tree().nodeSize([dx, dy])(this.root);

      this.root.eachBefore((d) => {
        d.x0 = d.x;
        d.y0 = d.y;
      });

      this.drawNodes(source);
      this.drawLines(source);
    },
    drawNodes(source) {
      /**
       * 绘制节点
       */
      const nodesData = this.root.descendants(); // 节点数据
      const nodes = gNode.selectAll('g').data(nodesData, (d) => d.id);

      const nodeEnter = nodes
        .enter()
        .append('g')
        .attr('transform', (d) => `translate(${source.y0},${source.x0})`)
        .attr('fill-opacity', 0)
        .attr('stroke-opacity', 0);

      // 筛选出新增的节点中具有子节点的节点，绑定点击事件
      nodeEnter
        .filter((d) => d.data.children)
        .on('click', (event, d) => {
          this.clickHandler(event, d);
        });

      // 为新增的节点添加圆形图标
      nodeEnter.append('circle')
        .attr('r', 2.5)
        .attr('fill', (d) => (d._children ? '#555' : '#999'))
        .attr('stroke-width', 10);

      // 为新增的节点添加文本
      nodeEnter
        .append('text')
        .attr('dy', '0.25em')
        .attr('x', (d) => (d._children ? -6 : 6))
        .attr('text-anchor', (d) => (d._children ? 'end' : 'start'))
        .text((d) => d.data.title)
        .clone(true)
        .lower()
        .attr('stroke-linejoin', 'round')
        .attr('stroke-width', 3)
        .attr('stroke', 'white');

      // 将新增节点移动到层次布局计算得到的坐标上
      nodes
        .merge(nodeEnter)
        .attr('transform', (d) => `translate(${d.y},${d.x})`)
        .attr('fill-opacity', 1)
        .attr('stroke-opacity', 1);

      // 移除多余的节点（收缩子树的场景）
      nodes.exit().remove();
      // .attr("transform", (d) => `translate(${source.y},${source.x})`)
      // .attr("fill-opacity", 0)
      // .attr("stroke-opacity", 0);
    },
    drawLines(source) {
      /**
       * 绘制连线
       */
      const linksData = this.root.links(); // 连线数据
      const links = gLink.selectAll('path').data(linksData, (d) => d.target.id);

      const linkEnter = links
        .enter()
        .append('path')
        .attr('d', () => {
          const o = { x: source.x0, y: source.y0 };

          return d3
            .linkHorizontal()
            .x((d) => d.y)
            .y((d) => d.x)({ source: o, target: o });
        });

      links.merge(linkEnter).attr(
        'd',
        d3
          .linkHorizontal()
          .x((d) => d.y)
          .y((d) => d.x),
      );

      // 从页面上移除 exiting 结点集合，使用前面预设的动效，节点缩回父节点处
      links.exit().remove();
      // .attr("d", (d) => {
      //   const o = { x: source.x, y: source.y };
      //   return d3
      //     .linkHorizontal()
      //     .x((d) => d.y)
      //     .y((d) => d.x)({ source: o, target: o });
      // });
    },
    clickHandler(event, d) {
      if (!d.parent) return; // 根节点不可操作
      // duration = event.altKey ? 1000 : 250;
      // 切换 children 属性值（在 null 和预先设置的 _children 之间切换）
      d.children = d.children ? null : d._children;

      if (d.children) {
        // 展开子树
        d.parent.children.forEach((item) => {
          if (item !== d) {
            // 同时收起同层其他节点下的子树
            item.children = null;
            this.update(item);
          }
        });
        this.adjustZoom(d, true);
      } else {
        // 收缩子树
        this.adjustZoom(d, false);
      }
      this.update(d);
    },
    adjustZoom(d, isExpand) {
      /**
       * 点击节点如果展开子树，则节点移动到垂直居中位置
       * 点击节点如果收缩节点，其上一级父节点移动到垂直居中位置
       */
      let scale = 1;
      let x;
      let y;
      if (isExpand) {
        // 展开子树
        scale = height / ((d.children.length + 2) * dx);
        x = d.y;
        y = d.x;
      } else {
        //  收缩子树
        scale = height / ((d.parent.children.length + 2) * dx);
        x = d.parent.y;
        y = d.parent.x;
      }

      if (scale > 1) {
        scale = 1;
      }

      svg
        .transition()
        .duration(500)
        .call(zoom.transform, d3.zoomIdentity.translate(-x, -y).scale(scale));
    },
  },
  mounted() {
    console.log(this.bookmarks);

    /**
     * 结构化数据
     */
    this.root = d3.hierarchy(this.bookmarks);

    this.root.descendants().forEach((d, i) => {
      d.id = i;
      d._children = d.children;
      if (d.depth >= 1) d.children = null;
    });
    // console.log(root);
    this.update(this.root);
    d3.select('.tree-container').append(() => svg.node());
  },
};
</script>

<style lang="scss" scoped>
.tree-container {
  width: 600px;
  height: 600px;
}
</style>
