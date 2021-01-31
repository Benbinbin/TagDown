<template>
  <!-- eslint-disable max-len -->
  <div class="main">
    <h1>BookDown Setting</h1>
    <h2>浏览书签时浮窗的默认大小：</h2>
    <ul>
      <li>
        <label for="width">宽度</label>
        <input type="range" id="width" name="width" min="300" max="800" v-model.number="width">
        <span>{{width}}</span>
      </li>
      <li>
        <label for="height">高度</label>
        <input type="range" id="height" name="height" min="300" max="570" v-model.number="height">
        <span>{{height}}</span>
      </li>
    </ul>

    <h2>浏览书签时的默认模式：</h2>
    <ul>
      <li>
        <input type="radio" id="tree" name="tree" value="tree" v-model="mode">
        <label for="tree">树图模式</label>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style="transform: rotate(-90deg)">
          <title>树图模式</title>
          <path fill-rule="evenodd" d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5v-1zM8.5 5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1zM0 11.5A1.5 1.5 0 0 1 1.5 10h1A1.5 1.5 0 0 1 4 11.5v1A1.5 1.5 0 0 1 2.5 14h-1A1.5 1.5 0 0 1 0 12.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm4.5.5A1.5 1.5 0 0 1 7.5 10h1a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm4.5.5a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z" />
        </svg>
      </li>
      <li>
        <input type="radio" id="nav" name="nav" value="nav" v-model="mode">
        <label for="nav">导航器模式</label>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <title>导航器模式</title>
          <path d="M2.5 4a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm2-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm1 .5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
          <path d="M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v2H1V3a1 1 0 0 1 1-1h12zM1 13V6h4v8H2a1 1 0 0 1-1-1zm5 1V6h9v7a1 1 0 0 1-1 1H6z" />
        </svg>
      </li>
    </ul>
    <div class="buttons-container" v-show="showBtn">
      <button class="btn-success" @click="save">确定</button>
      <button class="btn-cancel" @click="reset">取消</button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      width: 0,
      height: 0,
      mode: '',
      source: null,
    };
  },
  computed: {
    showBtn() {
      if (!this.source) return false;
      if (
        this.width !== this.source.width
        || this.height !== this.source.height
        || this.mode !== this.source.mode
      ) return true;
      return false;
    },
  },
  methods: {
    save() {
      chrome.storage.local.set(
        {
          width: this.width,
          height: this.height,
          mode: this.mode,
        },
        () => {
          this.getStorage().then((data) => {
            this.source = data;
          });
        },
      );
    },
    reset() {
      this.width = this.source.width;
      this.height = this.source.height;
      this.mode = this.source.mode;
    },
    getStorage() {
      return new Promise((resolve, reject) => {
        chrome.storage.local.get(['width', 'height', 'mode'], (data) => {
          resolve(data);
        });
      });
    },
  },
  created() {
    this.getStorage().then((data) => {
      this.source = data;
      this.width = this.source.width;
      this.height = this.source.height;
      this.mode = this.source.mode;
    });
  },
};
</script>

<style lang="scss" scoped>
.main {
  padding: 50px;
}

h1 {
  text-align: center;
}

h2 {
  margin: 20px 0;
}

ul {
  padding-left: 10px;
  li {
    margin: 10px 0;
    list-style: none;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}

label {
  margin: 0 5px;
}

.buttons-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

button {
  padding: 10px;
  color: $light;
  font-weight: bold;
  cursor: pointer;
}

.btn-success {
  border-radius: 0.5rem 0 0 0.5rem;
  border: 2px solid $green;
  background: $green;
}

.btn-cancel {
  border-radius: 0 0.5rem 0.5rem 0;
  border: 2px solid $red;
  background: $red;
}
</style>
