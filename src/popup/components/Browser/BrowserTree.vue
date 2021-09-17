<template>
  <svg
    class="tree-diagram select-none"
    :viewBox="viewBox"
  >
    <g :transform="`translate(${transform.x}, ${transform.y}) scale(${transform.k}) `">
      <g
        class="links-container"
        fill="none"
        stroke="#D1D5DB"
        stroke-opacity="1"
        stroke-width="1.5"
      >
        <path
          v-for="link of linksData"
          :key="link.target.data.id"
          :d="linkPathGenerator(link)"
        />
      </g>

      <g
        class="nodes-container"
        pointer-events="all"
      >
        <g
          v-for="node of nodesData"
          :key="node.data.id"
          cursor="pointer"
          @click="clickHandler(node)"
        >
          <g
            class="node-icon"
            :transform="`translate(${node.y}, ${node.x})`"
          >
            <svg
              v-if="!node._children"
              width="24px"
              height="24px"
              xmlns="http://www.w3.org/2000/svg"
              fill="#60A5FA"
              viewBox="0 0 50 50"
              x="-12px"
              y="-12px"
            >
              <path
                d="M0 4C0 1.79086 1.79086 0 4 0H46C48.2091 0 50 1.79086 50 4V46C50 48.2091 48.2091 50 46 50H4C1.79086 50 0 48.2091 0 46V4Z"
                fill="white"
              />
              <path
                d="M35.8889 5H14.1111C13.2863 5.00093 12.4955 5.32994 11.9122 5.91485C11.329 6.49977 11.0009 7.29281 11 8.12V42.44C11 42.7185 11.0743 42.9919 11.2153 43.2318C11.3562 43.4717 11.5586 43.6694 11.8015 43.8044C12.0443 43.9394 12.3188 44.0068 12.5964 43.9995C12.874 43.9921 13.1445 43.9105 13.38 43.7629L24.9986 36.4796L36.62 43.7629C36.8555 43.9105 37.126 43.9921 37.4036 43.9995C37.6812 44.0068 37.9557 43.9394 38.1985 43.8044C38.4414 43.6694 38.6438 43.4717 38.7847 43.2318C38.9257 42.9919 39 42.7185 39 42.44V8.12C38.9991 7.29281 38.671 6.49977 38.0878 5.91485C37.5045 5.32994 36.7137 5.00093 35.8889 5ZM35.8889 39.6256L25.8229 33.3171C25.5757 33.1622 25.29 33.08 24.9984 33.08C24.7069 33.08 24.4212 33.1622 24.174 33.3171L14.1111 39.6254V8.12H35.8889V39.6256Z"
              />
            </svg>
            <svg
              v-if="node._children && !node.children"
              width="24px"
              height="24px"
              xmlns="http://www.w3.org/2000/svg"
              fill="#FBBF24"
              viewBox="0 0 50 50"
              x="-12px"
              y="-12px"
            >
              <path
                d="M0 4C0 1.79086 1.79086 0 4 0H46C48.2091 0 50 1.79086 50 4V46C50 48.2091 48.2091 50 46 50H4C1.79086 50 0 48.2091 0 46V4Z"
                fill="white"
              />
              <path
                d="M41 14H25.1212L20 8.87901C19.7222 8.5995 19.3916 8.37788 19.0276 8.227C18.6635 8.07612 18.2731 7.99896 17.879 8.00001H8C7.20459 8.0008 6.44199 8.31713 5.87956 8.87957C5.31712 9.442 5.00079 10.2046 5 11V38.1157C5.00104 38.8806 5.30544 39.6138 5.84641 40.1545C6.38738 40.6952 7.12075 40.9993 7.88562 41H41.1669C41.918 40.999 42.638 40.7002 43.1691 40.1691C43.7002 39.638 43.999 38.918 44 38.1669V17.0002C43.9992 16.2048 43.6829 15.4422 43.1204 14.8798C42.558 14.3173 41.7954 14.001 41 14.0002V14ZM8 11H17.879L20.879 14H8V11Z"
              />
            </svg>
            <svg
              v-if="node._children && node.children"
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              fill="#FBBF24"
              viewBox="0 0 50 50"
              x="-12px"
              y="-12px"
            >
              <path
                d="M0 4C0 1.79086 1.79086 0 4 0H46C48.2091 0 50 1.79086 50 4V46C50 48.2091 48.2091 50 46 50H4C1.79086 50 0 48.2091 0 46V4Z"
                fill="white"
              />
              <path
                d="M43.4674 21.1866C43.2053 20.8197 42.861 20.5209 42.4626 20.3147C42.0643 20.1084 41.6233 20.0006 41.1758 20H38.8982V17.1429C38.8974 16.3854 38.5995 15.6591 38.0699 15.1235C37.5403 14.5879 36.8223 14.2866 36.0734 14.2857H23.8324L18.9361 10.5714C18.4464 10.2017 17.852 10.0013 17.241 10H7.82485C7.07591 10.0009 6.35789 10.3021 5.82831 10.8378C5.29873 11.3734 5.00084 12.0996 5 12.8571V38.5714C5 38.5805 5.00124 38.5893 5.00141 38.5984C5.00177 38.6186 5.00318 38.6384 5.00424 38.6586C5.00636 38.6925 5.00936 38.7263 5.01359 38.7596C5.01595 38.7777 5.01871 38.7958 5.02189 38.8137C5.02807 38.8504 5.03566 38.8863 5.04449 38.9218C5.0482 38.9366 5.05155 38.9514 5.05579 38.9661C5.06797 39.0088 5.0821 39.0504 5.09781 39.0912C5.10081 39.0987 5.10311 39.1066 5.10611 39.1141C5.12628 39.164 5.14927 39.2126 5.17496 39.2598C5.17779 39.265 5.18114 39.2698 5.18397 39.2748C5.20657 39.3153 5.23105 39.3543 5.25741 39.392C5.26077 39.3968 5.26324 39.402 5.2666 39.4068C5.27277 39.4155 5.28019 39.4229 5.28672 39.4316C5.341 39.5044 5.40214 39.5718 5.46928 39.6327C5.48058 39.6429 5.49135 39.6537 5.50282 39.6636C5.54204 39.6973 5.58307 39.7287 5.62571 39.7579L5.62924 39.76C5.67115 39.7881 5.71453 39.8139 5.75918 39.8373C5.77048 39.8432 5.78213 39.8484 5.79361 39.8541C5.84237 39.8782 5.89248 39.8994 5.94368 39.9177C5.97922 39.9303 6.01536 39.9415 6.05208 39.9513C6.06691 39.9554 6.08174 39.9595 6.09657 39.9629C6.13435 39.9716 6.17284 39.9782 6.21169 39.9839C6.22581 39.9859 6.2394 39.9888 6.25353 39.9904C6.30628 39.9966 6.35932 39.9998 6.41243 40H37.4858C37.7823 40 38.0712 39.9057 38.3117 39.7304C38.5522 39.555 38.7321 39.3077 38.8258 39.0232L43.8559 23.7607C43.9968 23.3311 44.0351 22.8739 43.9676 22.4264C43.9001 21.979 43.7287 21.5541 43.4674 21.1866ZM17.241 12.8571L22.1373 16.5714C22.627 16.9412 23.2213 17.1416 23.8324 17.1429H36.0734V20H13.0801C12.4871 19.9994 11.909 20.1879 11.4278 20.5386C10.9467 20.8892 10.5871 21.3844 10.4001 21.9536L7.82485 29.7682V12.8571H17.241Z"
              />
            </svg>
          </g>
          <g
            v-if="node.data.id !== currentNode.id"
            class="node-text"
            style="font: 12px sans-serif"
          >
            <path
              :id="`path-${node.data.id}`"
              :key="node.data.id"
              :d="textPathGenerator(node)"
            />
            <text
              dy="6px"
              x="14px"
              stroke-linejoin="round"
              stroke-width="6px"
              stroke="#fff"
            >
              <textPath :href="`#path-${node.data.id}`">{{ textGenerator(node) }}</textPath>
            </text>
            <text
              dy="6px"
              x="14px"
              fill="#4B5563"
            >
              <textPath :href="`#path-${node.data.id}`">{{ textGenerator(node) }}</textPath>
            </text>
          </g>

          <g
            v-if="node.data.id === currentNode.id"
            class="root-node-text"
            style="font: 12px sans-serif"
          >
            <text
              dy="6px"
              x="-14px"
              text-anchor="end"
              font-weight="bold"
              stroke-linejoin="round"
              stroke-width="6px"
              stroke="#fff"
            >
              {{ textGenerator(node) }}
            </text>
            <text
              dy="6px"
              x="-14px"
              text-anchor="end"
              font-weight="bold"
              fill="#4B5563"
            >
              {{ textGenerator(node) }}
            </text>
          </g>

          <title>{{ textGenerator(node) }}</title>
        </g>
      </g>
    </g>
  </svg>
</template>

<script>
import {
  ref, computed, watch, onMounted,
} from 'vue';
import * as d3 from 'd3';

export default {
  props: {
    currentNode: {
      type: Object,
      default() {
        return {};
      },
    },
    width: {
      type: Number,
      default: 800,
    },
    height: {
      type: Number,
      default: 422,
    },
  },
  setup(props) {
    /**
     * (horizontal) tree size parameters setting
     */
    const dx = 32; // node height
    const dy = computed(() => props.width / 5); // node width, divide the width to 5 parts, to show 3 nodes and 2 lines by default
    // set the view origin
    const viewBox = computed(() => `${-dy.value}, ${-props.height / 2}, ${props.width}, ${props.height}`);

    /**
     * build tree
     */
    // process raw data to get the hierarchy structure tree data
    let treeData = null;
    const setTreeData = () => {
      if (!props.currentNode) return;
      treeData = d3.hierarchy(props.currentNode);
      // in order to achieve the fold and unfold tree branch feature
      // copy the children data to _children property for each node
      treeData.descendants().forEach((d, i) => {
        if (d.children) d._children = d.children;
        if (d.children && d.depth >= 2) d.children = null; // show child nodes within three sub layers by default
      });
    };

    // calculate the nodes & (text) pathes & links UI components position values
    const nodesData = ref([]);
    const linksData = ref([]);
    const buildTree = () => {
      if (!treeData) return;
      const tree = d3.tree().nodeSize([dx, dy.value])(treeData);
      nodesData.value = tree.descendants();
      linksData.value = tree.links();
    };

    // generate horizontal link path base on link data
    const linkPathGenerator = (link) => {
      const linkGenerator = d3
        .linkHorizontal()
        .x((d) => d.y)
        .y((d) => d.x);
      return linkGenerator(link);
    };

    // generate text base on node data
    const textGenerator = (node) => {
      let text = node.data.title;
      if (!node.data.parentId) text = 'root';
      return text;
    };

    // generate text path base on node data
    const textPathGenerator = (node) => {
      const path = d3.path();
      if (node.data.id === props.currentNode.id) {
        path.moveTo(node.y - dy.value, node.x);
        path.lineTo(node.y, node.x);
      } else {
        path.moveTo(node.y, node.x);
        path.lineTo(node.y + dy.value, node.x);
      }
      return path.toString();
    };

    // listen currentNode change and re-calculate the tree layout
    watch(
      () => props.currentNode,
      (newValues, prevValues) => {
        console.log(props.currentNode);
        setTreeData();
        buildTree();
      },
      {
        immediate: true,
      },
    );

    /**
     * zoom interaction
     */
    // listen zoom event
    const transform = ref({
      x: 0,
      y: 0,
      k: 1,
    });

    const zoomHandler = (event) => {
      transform.value = event.transform;
    };

    let zoom = null;

    onMounted(() => {
      zoom = d3.zoom().scaleExtent([0.5, 5]).on('zoom', zoomHandler);
      d3.select('.tree-diagram').call(zoom);
    });

    const resizeTransform = () => {
      d3.select('.tree-diagram')
        .transition()
        .duration(500)
        .call(zoom.transform, d3.zoomIdentity);
    };

    /**
     * click interaction
     */
    // open bookmark or fold/unfold folder and adjust location of tree
    const adjustTransform = (d, isExpand) => {
      const scale = 1;
      let x;
      let y;
      if (isExpand) {
        // if unfold folder, move folder node to center
        x = d.y;
        y = d.x;
      } else {
        // if fold folder, move the parent node to center
        x = d.parent.y;
        y = d.parent.x;
      }

      // d3.zoomIdentity represend coordinate=[0, 0] and scale=1
      d3.select('.tree-diagram')
        .transition()
        .duration(500)
        .call(zoom.transform, d3.zoomIdentity.translate(-x, -y).scale(scale));
    };

    const clickHandler = (node) => {
      if (!node._children) {
        // bookmark
        console.log('click bookmark');
        console.log(node);
      } else {
        console.log('click folder');
        console.log(node);
        // cann't fold/unfold, "currentNode" node
        // because we should move the tree to its parent node when the folder be folded
        if (node.data.id === props.currentNode.id) return; // node.id is Number, props.currentNode.id is String
        // folder
        if (node.children) {
          // already unfold folder
          // when click fold it
          node.children = null;
          adjustTransform(node, false); // adjust the tree location
        } else {
          // already fold folder
          // when click unfold it
          node.children = node._children;
          adjustTransform(node, true); // adjust the tree location
        }
        buildTree();
      }
    };

    return {
      viewBox,
      dy,
      nodesData,
      linksData,
      linkPathGenerator,
      textGenerator,
      textPathGenerator,
      transform,
      resizeTransform,
      clickHandler,
    };
  },
};
</script>
<style lang="scss" scoped>
</style>
