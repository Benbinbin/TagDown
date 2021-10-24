<template>
  <div>
    <header class="p-8">
      <h1 class="text-3xl font-bold text-center text-gray-800">
        TagDown Setting
      </h1>
    </header>
    <main class="container p-4 mx-auto">
      <section class="p-8 border-b-2 border-gray-200">
        <h2 class="text-2xl font-bold py-4 text-gray-800">
          UI 设置
        </h2>
        <div class="flex items-start flex-wrap space-x-8">
          <div class="space-y-4">
            <h3 class="text-base font-bold">
              弹出页状态
            </h3>
            <div
              class="p-4 flex flex-col items-center space-y-4 border-2 border-gray-200 border-dashed rounded"
            >
              <button
                title="auto set popup page state"
                class="w-full px-2 py-1 border-2 border-green-400 rounded"
                :class="{
                  'text-white bg-green-400 hover:bg-green-600': popupState === 'auto',
                  'text-green-400 hover:text-white bg-green-50 hover:bg-green-400': popupState !== 'auto',
                }"
                @click="setPopupState('auto')"
              >
                自动判断
              </button>
              <button
                title="set popup page state as edit state"
                class="w-full px-2 py-1 border-2 border-green-400 rounded"
                :class="{
                  'text-white bg-green-400 hover:bg-green-600': popupState === 'edit',
                  'text-green-400 hover:text-white bg-green-50 hover:bg-green-400': popupState !== 'edit',
                }"
                @click="setPopupState('edit')"
              >
                编辑
              </button>
              <button
                title="set popup page state as browser state"
                class="w-full px-2 py-1 border-2 border-green-400 rounded"
                :class="{
                  'text-white bg-green-400 hover:bg-green-600': popupState === 'browser',
                  'text-green-400 hover:text-white bg-green-50 hover:bg-green-400': popupState !== 'browser',
                }"
                @click="setPopupState('browser')"
              >
                浏览
              </button>
            </div>
          </div>
          <div class="space-y-4">
            <h3 class="text-base font-bold">
              弹出页浏览状态行为
            </h3>
            <div
              class="p-4 flex flex-col items-center space-y-4 border-2 border-gray-200 border-dashed rounded"
            >
              <button
                title="set popup browser page as the last folder"
                class="w-full px-2 py-1 border-2 border-green-400 rounded"
                :class="{
                  'text-white bg-green-400 hover:bg-green-600': popupBrowser === 'folder',
                  'text-green-400 hover:text-white bg-green-50 hover:bg-green-400': popupBrowser !== 'folder',
                }"
                @click="setPopupBrowser('folder')"
              >
                展示上一次浏览的文件夹
              </button>
              <button
                title="set popup browser page as the root folder"
                class="w-full px-2 py-1 border-2 border-green-400 rounded"
                :class="{
                  'text-white bg-green-400 hover:bg-green-600': popupBrowser === 'root',
                  'text-green-400 hover:text-white bg-green-50 hover:bg-green-400': popupBrowser !== 'root',
                }"
                @click="setPopupBrowser('root')"
              >
                展示根文件夹
              </button>
              <button
                title="set popup browser page as the star bookmarks"
                class="w-full px-2 py-1 border-2 border-green-400 rounded"
                :class="{
                  'text-white bg-green-400 hover:bg-green-600': popupBrowser === 'star',
                  'text-green-400 hover:text-white bg-green-50 hover:bg-green-400': popupBrowser !== 'star',
                }"
                @click="setPopupBrowser('star')"
              >
                展示常用书签
              </button>
            </div>
          </div>
        </div>
      </section>
      <section class="p-8 border-b-2 border-gray-200">
        <div class="flex justify-between items-center">
          <h2 class="text-2xl font-bold py-4 text-gray-800">
            IndexedDB 数据库
          </h2>
          <button
            title="clear indexedDB database"
            class="px-2 py-1 flex items-center text-sm text-white bg-red-400 hover:bg-red-600 space-x-1 rounded"
            @click="deleteDatabaseHandler"
          >
            <svg
              class="w-5 h-5"
              viewBox="0 0 50 50"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M41.5 11H34.0007V9.5C33.9994 8.30694 33.5249 7.16312 32.6813 6.3195C31.8376 5.47588 30.6938 5.00134 29.5007 5H20.5007C19.3077 5.00134 18.1639 5.47588 17.3202 6.3195C16.4766 7.16312 16.0021 8.30694 16.0007 9.5V11H8.5C8.10217 11 7.72064 11.158 7.43934 11.4393C7.15804 11.7206 7 12.1022 7 12.5C7 12.8978 7.15804 13.2794 7.43934 13.5607C7.72064 13.842 8.10217 14 8.5 14H10V41C10.0009 41.7954 10.3173 42.5579 10.8797 43.1203C11.4421 43.6827 12.2046 43.9991 13 44H37C37.7954 43.9991 38.5579 43.6827 39.1203 43.1203C39.6827 42.5579 39.9991 41.7954 40 41V14H41.5C41.8978 14 42.2794 13.842 42.5607 13.5607C42.842 13.2794 43 12.8978 43 12.5C43 12.1022 42.842 11.7206 42.5607 11.4393C42.2794 11.158 41.8978 11 41.5 11ZM19.0007 9.5C19.0012 9.10233 19.1594 8.72109 19.4406 8.43989C19.7218 8.15869 20.1031 8.0005 20.5007 8H29.5007C29.8984 8.0005 30.2797 8.15869 30.5609 8.43989C30.8421 8.72109 31.0003 9.10233 31.0007 9.5V11H19.0007V9.5ZM37 41H13V14H37V41ZM22.0007 21.5V33.5C22.0007 33.8978 21.8427 34.2794 21.5614 34.5607C21.2801 34.842 20.8986 35 20.5007 35C20.1029 35 19.7214 34.842 19.4401 34.5607C19.1588 34.2794 19.0007 33.8978 19.0007 33.5V21.5C19.0007 21.1022 19.1588 20.7206 19.4401 20.4393C19.7214 20.158 20.1029 20 20.5007 20C20.8986 20 21.2801 20.158 21.5614 20.4393C21.8427 20.7206 22.0007 21.1022 22.0007 21.5ZM31.0007 21.5V33.5C31.0007 33.8978 30.8427 34.2794 30.5614 34.5607C30.2801 34.842 29.8986 35 29.5007 35C29.1029 35 28.7214 34.842 28.4401 34.5607C28.1588 34.2794 28.0007 33.8978 28.0007 33.5V21.5C28.0007 21.1022 28.1588 20.7206 28.4401 20.4393C28.7214 20.158 29.1029 20 29.5007 20C29.8986 20 30.2801 20.158 30.5614 20.4393C30.8427 20.7206 31.0007 21.1022 31.0007 21.5Z"
              />
            </svg>
            <span>清空</span>
          </button>
        </div>
        <div class="flex items-start flex-wrap space-x-8">
          <div class="space-y-4">
            <h3 class="text-base font-bold">
              手动备份
            </h3>
            <div
              class="p-4 flex flex-col items-center space-y-4 border-2 border-gray-200 border-dashed rounded"
            >
              <button
                title="export indexedDB database"
                class="px-2 py-1 flex items-center text-white bg-green-400 hover:bg-green-600 space-x-1 rounded"
                @click="exportDatabase"
              >
                <svg
                  class="w-6 h-6"
                  viewBox="0 0 50 50"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.3349 15.0472C16.1999 14.9131 16.0927 14.7538 16.0197 14.5786C15.9466 14.4033 15.909 14.2155 15.909 14.0258C15.9091 13.8361 15.9467 13.6482 16.0199 13.473C16.093 13.2978 16.2002 13.1385 16.3353 13.0044L23.9716 5.42291C24.2444 5.15212 24.6143 5 25 5C25.3857 5 25.7556 5.15212 26.0284 5.42291L33.6647 13.0044C33.8023 13.138 33.9118 13.2973 33.9869 13.4732C34.0621 13.6491 34.1013 13.838 34.1024 14.0291C34.1035 14.2201 34.0664 14.4095 33.9933 14.5862C33.9202 14.7629 33.8125 14.9234 33.6765 15.0585C33.5405 15.1936 33.3788 15.3006 33.2009 15.3732C33.0229 15.4459 32.8322 15.4827 32.6399 15.4817C32.4475 15.4806 32.2572 15.4417 32.0801 15.3671C31.903 15.2925 31.7425 15.1838 31.608 15.0472L26.4545 9.93102V26.6667C26.4545 27.0498 26.3013 27.4172 26.0285 27.6881C25.7557 27.959 25.3858 28.1111 25 28.1111C24.6142 28.1111 24.2443 27.959 23.9715 27.6881C23.6987 27.4172 23.5455 27.0498 23.5455 26.6667V9.93102L18.392 15.0472C18.2569 15.1814 18.0966 15.2878 17.9201 15.3604C17.7436 15.433 17.5545 15.4704 17.3635 15.4704C17.1724 15.4704 16.9833 15.433 16.8068 15.3604C16.6303 15.2878 16.47 15.1814 16.3349 15.0472ZM38.0909 19.4445H33.7273C33.3415 19.4445 32.9715 19.5967 32.6988 19.8675C32.426 20.1384 32.2727 20.5058 32.2727 20.8889C32.2727 21.272 32.426 21.6394 32.6988 21.9103C32.9715 22.1812 33.3415 22.3334 33.7273 22.3334H38.0909V41.1111H11.9091V22.3334H16.2727C16.6585 22.3334 17.0285 22.1812 17.3012 21.9103C17.574 21.6394 17.7273 21.272 17.7273 20.8889C17.7273 20.5058 17.574 20.1384 17.3012 19.8675C17.0285 19.5967 16.6585 19.4445 16.2727 19.4445H11.9091C11.1378 19.4453 10.3984 19.75 9.85301 20.2916C9.30764 20.8331 9.00087 21.5674 9 22.3334V41.1111C9.00087 41.877 9.30764 42.6113 9.85301 43.1529C10.3984 43.6945 11.1378 43.9991 11.9091 44H38.0909C38.8622 43.9991 39.6016 43.6945 40.147 43.1529C40.6924 42.6113 40.9991 41.877 41 41.1111V22.3334C40.9991 21.5674 40.6924 20.8331 40.147 20.2916C39.6016 19.75 38.8622 19.4453 38.0909 19.4445Z"
                  />
                </svg>
                <span class="text-base">导出</span>
              </button>
              <input
                id="importDatabase"
                ref="importDatabase"
                type="file"
                name="importDatabase"
                class="hidden"
                accept=".json"
                @change="inputFile"
              >
              <button
                title="import indexedDB database"
                class="px-2 py-1 flex items-center text-base text-white bg-green-400 hover:bg-green-600 space-x-1 rounded"
                @click="importDatabaseHandler"
              >
                <svg
                  class="w-6 h-6"
                  viewBox="0 0 50 50"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M33.2496 28.4169C33.5622 28.7295 33.7378 29.1534 33.7378 29.5955C33.7378 30.0376 33.5622 30.4616 33.2496 30.7742L26.1785 37.8452C26.169 37.8548 26.1587 37.8629 26.149 37.8721C26.1194 37.9002 26.0898 37.9283 26.0583 37.9542C26.0448 37.9652 26.0302 37.975 26.0165 37.9854C25.9871 38.0081 25.9579 38.031 25.9269 38.0517C25.9156 38.0594 25.9033 38.0656 25.8917 38.0729C25.8573 38.0948 25.8229 38.1165 25.7867 38.1358C25.7783 38.1404 25.769 38.1442 25.7604 38.1485C25.7208 38.169 25.6806 38.1887 25.639 38.2058C25.6333 38.2083 25.6273 38.21 25.6215 38.2121C25.577 38.2303 25.5317 38.2466 25.4858 38.2608C25.4798 38.2629 25.4735 38.2637 25.4677 38.2656C25.4217 38.2793 25.3751 38.291 25.3281 38.3006C25.3146 38.3033 25.3006 38.3046 25.2871 38.3069C25.2473 38.314 25.2073 38.3208 25.1663 38.3248C25.0556 38.336 24.9442 38.336 24.8335 38.3248C24.7925 38.3206 24.7525 38.3137 24.7127 38.3069C24.6992 38.3044 24.6854 38.3033 24.6721 38.3006C24.6249 38.291 24.5782 38.2793 24.5321 38.2656C24.5262 38.2637 24.5202 38.2627 24.5142 38.2608C24.4683 38.2467 24.4232 38.2305 24.3787 38.2123L24.361 38.206C24.3198 38.1885 24.2793 38.1693 24.2396 38.1485C24.231 38.1442 24.2219 38.1404 24.2133 38.136C24.1776 38.1163 24.1426 38.0952 24.1083 38.0729C24.0967 38.0656 24.0844 38.0594 24.0729 38.0517C24.0421 38.0308 24.0129 38.0081 23.9835 37.9854C23.9698 37.975 23.9552 37.9652 23.9419 37.9542C23.9106 37.9279 23.8803 37.9005 23.851 37.8721C23.8412 37.8629 23.831 37.8548 23.8215 37.8452L16.7504 30.7742C16.4378 30.4616 16.2621 30.0376 16.2621 29.5956C16.2621 29.1535 16.4376 28.7295 16.7502 28.4169C17.0628 28.1043 17.4867 27.9286 17.9288 27.9286C18.3709 27.9285 18.7949 28.1041 19.1075 28.4167L23.3333 32.6431V20C23.3333 19.558 23.5089 19.134 23.8215 18.8215C24.134 18.5089 24.558 18.3333 25 18.3333C25.442 18.3333 25.866 18.5089 26.1785 18.8215C26.4911 19.134 26.6667 19.558 26.6667 20V32.6431L30.8925 28.4169C31.2051 28.1044 31.629 27.9289 32.071 27.9289C32.513 27.9289 32.937 28.1044 33.2496 28.4169V28.4169ZM45 13.3333V41.6667C44.999 42.5504 44.6475 43.3977 44.0226 44.0226C43.3977 44.6475 42.5504 44.999 41.6667 45H8.33333C7.44958 44.999 6.60231 44.6475 5.97741 44.0226C5.3525 43.3977 5.00099 42.5504 5 41.6667V13.3333C5.00019 13.2718 5.00374 13.2103 5.01062 13.1492C5.0125 13.134 5.01562 13.119 5.01771 13.1038C5.02396 13.0577 5.03146 13.0121 5.04167 12.9673C5.04542 12.9502 5.05021 12.9337 5.05458 12.9167C5.07001 12.8566 5.08879 12.7974 5.11083 12.7394C5.12667 12.6983 5.14403 12.658 5.16292 12.6185C5.1675 12.6085 5.17083 12.5977 5.17604 12.5879L8.50938 5.92125C8.6478 5.64443 8.86057 5.41162 9.12384 5.24891C9.38712 5.0862 9.6905 5.00001 10 5H40C40.3095 5.00001 40.6129 5.0862 40.8762 5.24891C41.1394 5.41162 41.3522 5.64443 41.4906 5.92125L44.824 12.5879C44.829 12.5979 44.8323 12.6085 44.8373 12.6185C44.8827 12.7142 44.9189 12.814 44.9454 12.9165C44.9496 12.9335 44.9546 12.9504 44.9583 12.9675C44.9683 13.0121 44.9758 13.0573 44.9823 13.1033C44.9844 13.1185 44.9875 13.134 44.9894 13.1492C44.9963 13.2103 44.9998 13.2718 45 13.3333V13.3333ZM9.36333 11.6667H40.6367L38.97 8.33333H11.03L9.36333 11.6667ZM41.6687 41.6667L41.6667 15H8.33333V41.6667H41.6687Z"
                  />
                </svg>

                <span class="text-base">导入</span>
              </button>
            </div>
          </div>
          <WebdavBackup />
        </div>
      </section>
      <GistShare />
      <section class="p-8 border-b-2 border-gray-200">
        <div class="flex justify-between items-center">
          <h2 class="text-2xl font-bold py-4 text-gray-800">
            按标签导出书签
          </h2>
          <div class="flex items-center space-x-2">
            <button
              titile="select all tags"
              class="px-2 py-1 text-sm text-white bg-green-400 hover:bg-green-600 rounded"
              @click="selectTags = new Set(allTags)"
            >
              全选
            </button>
            <button
              title="unselect all tags"
              class="px-2 py-1 text-sm text-white bg-red-400 hover:bg-red-600 rounded"
              @click="selectTags.clear()"
            >
              全不选
            </button>
            <button
              title="export bookmarks order by tags"
              class="px-2 py-1 text-sm text-white bg-green-400 hover:bg-green-600 rounded"
              :class="{
                'opacity-10': selectTags.size === 0
              }"
              :disabled="selectTags.size === 0"
              @click="exportBookmarks('tag')"
            >
              导出书签
            </button>
          </div>
        </div>
        <div class="p-2 flex items-center space-x-1">
          <input
            id="tagShareable"
            v-model="tagShareable"
            type="checkbox"
            name="tagShareable"
          >
          <label
            for="tagShareable"
            class="flex items-center text-green-400"
          >
            <svg
              class="w-5 h-5"
              viewBox="0 0 50 50"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M34.9183 30.7139C33.9734 30.7136 33.0381 30.9046 32.1678 31.2756C31.2974 31.6466 30.5098 32.1901 29.8515 32.8738L21.6901 27.5808C22.331 25.9199 22.331 24.0769 21.6901 22.416L29.8515 17.1232C31.0766 18.3875 32.7235 19.148 34.4728 19.2571C36.2221 19.3662 37.9493 18.8163 39.3196 17.7139C40.6898 16.6114 41.6055 15.0351 41.8892 13.2903C42.1729 11.5455 41.8043 9.75662 40.855 8.27038C39.9056 6.78413 38.4431 5.7064 36.7509 5.24608C35.0586 4.78576 33.2573 4.97564 31.6959 5.77891C30.1346 6.58219 28.9245 7.94165 28.3002 9.59377C27.6759 11.2459 27.6819 13.073 28.317 14.7209L20.1554 20.0139C19.1726 18.9959 17.9111 18.2967 16.5324 18.0057C15.1536 17.7146 13.7201 17.845 12.4151 18.3801C11.1101 18.9153 9.99303 19.8308 9.20656 21.0098C8.42009 22.1887 8 23.5775 8 24.9985C8 26.4196 8.42009 27.8083 9.20656 28.9873C9.99303 30.1662 11.1101 31.0818 12.4151 31.6169C13.7201 32.152 15.1536 32.2824 16.5324 31.9914C17.9111 31.7003 19.1726 31.0011 20.1554 29.9831L28.317 35.2759C27.7706 36.6983 27.6899 38.2598 28.0868 39.7318C28.4837 41.2037 29.3373 42.5089 30.5226 43.4561C31.7079 44.4033 33.1627 44.9428 34.6739 44.9957C36.1852 45.0486 37.6735 44.612 38.921 43.7499C40.1685 42.8877 41.1096 41.6454 41.6066 40.2047C42.1036 38.764 42.1304 37.2006 41.6829 35.7434C41.2355 34.2863 40.3374 33.0119 39.1202 32.1069C37.9029 31.2018 36.4304 30.7137 34.9183 30.7139ZM34.9183 7.85223C35.7587 7.85223 36.5802 8.10363 37.279 8.57465C37.9777 9.04566 38.5224 9.71513 38.844 10.4984C39.1656 11.2817 39.2497 12.1436 39.0858 12.9751C38.9218 13.8066 38.5171 14.5704 37.9229 15.1699C37.3286 15.7693 36.5715 16.1776 35.7472 16.343C34.923 16.5084 34.0686 16.4235 33.2922 16.0991C32.5157 15.7746 31.8521 15.2252 31.3852 14.5203C30.9183 13.8154 30.6691 12.9866 30.6691 12.1388C30.6703 11.0023 31.1184 9.91276 31.915 9.10915C32.7116 8.30554 33.7917 7.85351 34.9183 7.85223ZM15.0888 29.2851C14.2484 29.2851 13.4268 29.0337 12.7281 28.5627C12.0293 28.0916 11.4847 27.4222 11.1631 26.6389C10.8415 25.8556 10.7573 24.9938 10.9213 24.1622C11.0852 23.3307 11.4899 22.5669 12.0842 21.9674C12.6784 21.368 13.4356 20.9597 14.2598 20.7943C15.0841 20.6289 15.9384 20.7138 16.7149 21.0382C17.4913 21.3627 18.1549 21.9121 18.6218 22.617C19.0887 23.3219 19.338 24.1507 19.338 24.9985C19.3367 26.135 18.8886 27.2246 18.092 28.0282C17.2954 28.8318 16.2153 29.2838 15.0888 29.2851ZM34.9183 42.1448C34.0778 42.1448 33.2563 41.8934 32.5575 41.4224C31.8588 40.9514 31.3141 40.2819 30.9925 39.4986C30.6709 38.7153 30.5868 37.8535 30.7507 37.0219C30.9147 36.1904 31.3194 35.4266 31.9136 34.8272C32.5079 34.2277 33.265 33.8194 34.0893 33.654C34.9135 33.4886 35.7679 33.5735 36.5443 33.8979C37.3208 34.2224 37.9844 34.7718 38.4513 35.4767C38.9182 36.1817 39.1674 37.0104 39.1674 37.8582C39.1662 38.9947 38.7181 40.0843 37.9215 40.8879C37.1249 41.6915 36.0448 42.1435 34.9183 42.1448Z"
              />
            </svg>
            <span class="text-sm">仅导出可分享书签</span>
          </label>
        </div>
        <div>
          <div class="flex flex-wrap">
            <button
              v-for="tag of allTags"
              :key="tag"
              title="toggle select tag"
              class="p-1 mt-2 ml-2 flex items-center border-2 border-green-400 space-x-1 rounded"
              :class="{
                'text-green-600 hover:text-white hover:bg-green-400 ': !selectTags.has(tag),
                'text-white bg-green-400 hover:bg-green-600': selectTags.has(tag)
              }"
              @click="toggleTagHandler(tag)"
            >
              <svg
                class="w-5 h-5"
                viewBox="0 0 50 50"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M43.1947 23.754L25.2464 5.80594C24.9268 5.48534 24.5327 5.24888 24.0993 5.11767C23.666 4.98646 23.2069 4.96459 22.7631 5.05401L8.90377 7.82581C8.63772 7.87911 8.39338 8.00993 8.20151 8.2018C8.00964 8.39366 7.87882 8.638 7.82552 8.90405L5.05386 22.7632C4.96461 23.2071 4.98654 23.6661 5.11771 24.0993C5.24888 24.5326 5.48521 24.9267 5.80563 25.2465L23.7537 43.1944C24.009 43.4498 24.3121 43.6524 24.6457 43.7906C24.9793 43.9288 25.3369 44 25.698 44C26.0591 44 26.4166 43.9289 26.7502 43.7907C27.0839 43.6525 27.387 43.45 27.6423 43.1946L43.1945 27.6424C43.4499 27.3871 43.6524 27.084 43.7906 26.7504C43.9288 26.4168 44 26.0593 44 25.6982C44 25.3372 43.9289 24.9796 43.7907 24.646C43.6526 24.3124 43.45 24.0093 43.1947 23.754ZM25.6982 41.2505L7.74974 23.3024L10.3418 10.3423L23.3023 7.75021L41.2506 25.6983L25.6982 41.2505ZM18.4508 16.389C18.4508 16.7968 18.3299 17.1955 18.1033 17.5346C17.8767 17.8737 17.5547 18.1379 17.1779 18.294C16.8011 18.4501 16.3865 18.4909 15.9865 18.4114C15.5865 18.3318 15.2191 18.1354 14.9308 17.847C14.6424 17.5587 14.446 17.1913 14.3664 16.7913C14.2869 16.3913 14.3277 15.9767 14.4838 15.5999C14.6398 15.2231 14.9041 14.9011 15.2432 14.6745C15.5823 14.448 15.981 14.327 16.3888 14.327C16.9355 14.3276 17.4596 14.5451 17.8462 14.9316C18.2328 15.3182 18.4502 15.8423 18.4508 16.389Z"
                />
              </svg>
              <span class="text-sm">{{ tag }}</span>
            </button>
          </div>
        </div>
      </section>
      <section class="p-8 border-b-2 border-gray-200">
        <div class="flex justify-between items-center">
          <h2 class="text-2xl font-bold py-4 text-gray-800">
            按分组导出书签
          </h2>
          <div class="flex items-center space-x-2">
            <button
              titile="select all groups"
              class="px-2 py-1 text-sm text-white bg-green-400 hover:bg-green-600 rounded"
              @click="selectGroups = new Set(allGroups)"
            >
              全选
            </button>
            <button
              title="unselect all groups"
              class="px-2 py-1 text-sm text-white bg-red-400 hover:bg-red-600 rounded"
              @click="selectGroups.clear()"
            >
              全不选
            </button>
            <button
              title="export bookmarks order by groups"
              class="px-2 py-1 text-sm text-white bg-green-400 hover:bg-green-600 rounded"
              :class="{
                'opacity-10': selectGroups.size === 0
              }"
              :disabled="selectGroups.size === 0"
              @click="exportBookmarks('group')"
            >
              导出书签
            </button>
          </div>
        </div>
        <div class="p-2 flex items-center space-x-1">
          <input
            id="groupShareable"
            v-model="groupShareable"
            type="checkbox"
            name="groupShareable"
          >
          <label
            for="groupShareable"
            class="flex items-center text-green-400"
          >
            <svg
              class="w-5 h-5"
              viewBox="0 0 50 50"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M34.9183 30.7139C33.9734 30.7136 33.0381 30.9046 32.1678 31.2756C31.2974 31.6466 30.5098 32.1901 29.8515 32.8738L21.6901 27.5808C22.331 25.9199 22.331 24.0769 21.6901 22.416L29.8515 17.1232C31.0766 18.3875 32.7235 19.148 34.4728 19.2571C36.2221 19.3662 37.9493 18.8163 39.3196 17.7139C40.6898 16.6114 41.6055 15.0351 41.8892 13.2903C42.1729 11.5455 41.8043 9.75662 40.855 8.27038C39.9056 6.78413 38.4431 5.7064 36.7509 5.24608C35.0586 4.78576 33.2573 4.97564 31.6959 5.77891C30.1346 6.58219 28.9245 7.94165 28.3002 9.59377C27.6759 11.2459 27.6819 13.073 28.317 14.7209L20.1554 20.0139C19.1726 18.9959 17.9111 18.2967 16.5324 18.0057C15.1536 17.7146 13.7201 17.845 12.4151 18.3801C11.1101 18.9153 9.99303 19.8308 9.20656 21.0098C8.42009 22.1887 8 23.5775 8 24.9985C8 26.4196 8.42009 27.8083 9.20656 28.9873C9.99303 30.1662 11.1101 31.0818 12.4151 31.6169C13.7201 32.152 15.1536 32.2824 16.5324 31.9914C17.9111 31.7003 19.1726 31.0011 20.1554 29.9831L28.317 35.2759C27.7706 36.6983 27.6899 38.2598 28.0868 39.7318C28.4837 41.2037 29.3373 42.5089 30.5226 43.4561C31.7079 44.4033 33.1627 44.9428 34.6739 44.9957C36.1852 45.0486 37.6735 44.612 38.921 43.7499C40.1685 42.8877 41.1096 41.6454 41.6066 40.2047C42.1036 38.764 42.1304 37.2006 41.6829 35.7434C41.2355 34.2863 40.3374 33.0119 39.1202 32.1069C37.9029 31.2018 36.4304 30.7137 34.9183 30.7139ZM34.9183 7.85223C35.7587 7.85223 36.5802 8.10363 37.279 8.57465C37.9777 9.04566 38.5224 9.71513 38.844 10.4984C39.1656 11.2817 39.2497 12.1436 39.0858 12.9751C38.9218 13.8066 38.5171 14.5704 37.9229 15.1699C37.3286 15.7693 36.5715 16.1776 35.7472 16.343C34.923 16.5084 34.0686 16.4235 33.2922 16.0991C32.5157 15.7746 31.8521 15.2252 31.3852 14.5203C30.9183 13.8154 30.6691 12.9866 30.6691 12.1388C30.6703 11.0023 31.1184 9.91276 31.915 9.10915C32.7116 8.30554 33.7917 7.85351 34.9183 7.85223ZM15.0888 29.2851C14.2484 29.2851 13.4268 29.0337 12.7281 28.5627C12.0293 28.0916 11.4847 27.4222 11.1631 26.6389C10.8415 25.8556 10.7573 24.9938 10.9213 24.1622C11.0852 23.3307 11.4899 22.5669 12.0842 21.9674C12.6784 21.368 13.4356 20.9597 14.2598 20.7943C15.0841 20.6289 15.9384 20.7138 16.7149 21.0382C17.4913 21.3627 18.1549 21.9121 18.6218 22.617C19.0887 23.3219 19.338 24.1507 19.338 24.9985C19.3367 26.135 18.8886 27.2246 18.092 28.0282C17.2954 28.8318 16.2153 29.2838 15.0888 29.2851ZM34.9183 42.1448C34.0778 42.1448 33.2563 41.8934 32.5575 41.4224C31.8588 40.9514 31.3141 40.2819 30.9925 39.4986C30.6709 38.7153 30.5868 37.8535 30.7507 37.0219C30.9147 36.1904 31.3194 35.4266 31.9136 34.8272C32.5079 34.2277 33.265 33.8194 34.0893 33.654C34.9135 33.4886 35.7679 33.5735 36.5443 33.8979C37.3208 34.2224 37.9844 34.7718 38.4513 35.4767C38.9182 36.1817 39.1674 37.0104 39.1674 37.8582C39.1662 38.9947 38.7181 40.0843 37.9215 40.8879C37.1249 41.6915 36.0448 42.1435 34.9183 42.1448Z"
              />
            </svg>
            <span class="text-sm">仅导出可分享书签</span>
          </label>
        </div>
        <div>
          <div class="flex flex-wrap">
            <button
              v-for="group of allGroups"
              :key="group"
              title="toggle select group"
              class="p-1 mt-2 ml-2 flex items-center border-2 border-green-400 space-x-1 rounded"
              :class="{
                'text-green-600 hover:text-white hover:bg-green-400 ': !selectGroups.has(group),
                'text-white bg-green-400 hover:bg-green-600': selectGroups.has(group)
              }"
              @click="toggleGroupHandler(group)"
            >
              <svg
                class="w-5 h-5"
                viewBox="0 0 50 50"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M42.6412 15.0387C42.6367 15.0302 42.6333 15.0215 42.6284 15.0131C42.6265 15.0096 42.6239 15.0062 42.6218 15.0027C42.374 14.5747 42.0172 14.221 41.5882 13.9781L26.3576 5.35549C25.9426 5.12238 25.4753 5 25 5C24.5247 5 24.0574 5.12238 23.6424 5.35549L8.41144 13.9781C7.98088 14.2222 7.6231 14.5778 7.37523 15.0081C7.37263 15.0128 7.36935 15.017 7.36658 15.0218C7.3626 15.0293 7.35948 15.0372 7.35533 15.0448C7.12275 15.4609 7.00039 15.9302 7 16.4075V33.5903C7.00036 34.0848 7.13125 34.5703 7.37928 34.9972C7.62731 35.424 7.98358 35.7769 8.41162 36.0196L23.6426 44.6422C24.0262 44.8581 24.4555 44.9788 24.8948 44.9944C24.9263 44.9969 24.9576 44.9997 24.9896 45H25.0021C25.0457 45 25.0888 44.9976 25.1314 44.9936C25.5617 44.9743 25.9817 44.854 26.3576 44.6422L41.5884 36.0196C42.0165 35.7769 42.3728 35.424 42.6209 34.9971C42.8689 34.5701 42.9998 34.0845 43 33.59V16.4075C42.9996 15.9278 42.876 15.4564 42.6412 15.0389V15.0387ZM25 7.78479L38.8017 15.5984L33.5021 18.6287L19.5377 10.8771L25 7.78479ZM25.1575 23.3998L11.2194 15.5864L16.6991 12.4842L30.6774 20.2436L25.1575 23.3998ZM26.4057 41.417L26.5418 25.8138L32.1 22.6358V29.2684C32.1 29.638 32.2458 29.9925 32.5055 30.2538C32.7652 30.5151 33.1174 30.662 33.4846 30.662C33.8518 30.662 34.204 30.5151 34.4636 30.2538C34.7233 29.9925 34.8692 29.638 34.8692 29.2684V21.0524L40.2308 17.9868V33.5902L26.4057 41.417Z"
                />
              </svg>
              <span class="text-sm">{{ group }}</span>
            </button>
          </div>
        </div>
      </section>
      <section class="p-8">
        <h2 class="text-2xl font-bold py-4 text-gray-800">
          相关信息
        </h2>
        <ul class="list-disc">
          <li class="text-base">
            项目简介：
            <a
              class="text-blue-400"
              href="https://github.com/Benbinbin/TagDown/blob/main/README-CN.md"
              target="_blank"
            >README</a>
          </li>
          <li class="text-base">
            代码仓库：
            <a
              class="text-blue-400"
              href="https://github.com/Benbinbin/TagDown"
              target="_blank"
            >Github</a>
          </li>
          <li class="text-base">
            许可协议：
            <a
              class="text-blue-400"
              href="https://github.com/Benbinbin/TagDown/blob/main/LICENSE"
              target="_blank"
            >MIT License</a>
          </li>
          <li class="text-base">
            反馈邮箱：
            <a
              class="text-blue-400"
              href="mailto:benthomsonbin@gmail.com"
            >benthomsonbin@gmail.com</a>
          </li>
        </ul>
      </section>
    </main>
    <transition name="dissolve">
      <div
        v-if="showMsg && msg"
        class="fixed top-4 right-4 z-10 p-4 text-white rounded shadow"
        :class="{
          'bg-green-400': msg.state === true,
          'bg-red-400': msg.state === false
        }"
      >
        {{ msg.title }}
      </div>
    </transition>

    <PromptModal
      v-if="showDeleteIndexedDBConfirmModal"
      v-model:show="showDeleteIndexedDBConfirmModal"
      @result="getDeleteIndexedDBResult"
    >
      <template #title>
        <h2 class="p-4 text-xl font-bold">
          删除数据库
        </h2>
      </template>
      <template #msg>
        <p class="p-2 text-base text-center">
          该操作不可恢复
        </p>
      </template>
    </PromptModal>
  </div>
</template>

<script>
import {
  ref, inject, onMounted,
} from 'vue';
import {
  importDB, exportDB, importInto, peakImportFile,
} from 'dexie-export-import';
import PromptModal from './components/Modal/PromptModal.vue';
import WebdavBackup from './components/WebdavBackup.vue';
import GistShare from './components/GistShare.vue';

export default {
  components: {
    PromptModal,
    WebdavBackup,
    GistShare,
  },
  setup(props) {
    const db = inject('db');

    /**
     * UI
     */
    // popup state
    const popupState = ref('');
    const getPopState = () => {
      chrome.storage.local.get('popupState', (result) => {
        popupState.value = result.popupState;
      });
    };
    getPopState();

    const setPopupState = async (value) => {
      if (popupState.value === value) return;
      await chrome.storage.local.set({ popupState: value });
      getPopState();
    };

    // popup browser
    const popupBrowser = ref('');
    const getpopupBrowser = () => {
      chrome.storage.local.get('popupBrowser', (result) => {
        popupBrowser.value = result.popupBrowser;
      });
    };
    getpopupBrowser();
    const setPopupBrowser = async (value) => {
      if (popupBrowser.value === value) return;
      await chrome.storage.local.set({ popupBrowser: value });
      getpopupBrowser();
    };

    /**
     * popup msg
     */
    const showMsg = ref(false);
    const msg = ref(null);

    const setMsg = (state, title, refresh = false, duration = 1000) => {
      msg.value = {
        state,
        title,
      };
      showMsg.value = true;
      if (!refresh) {
        let timer = setTimeout(() => {
          showMsg.value = false;
          msg.value = null;
          timer = null;
        }, duration);
      } else {
        const timer = setTimeout(() => {
          showMsg.value = false;
          msg.value = null;
          window.location.reload();
        }, duration);
      }
    };

    /**
     * export and import indexedDB manual
     */
    const exportJsonFile = (blob, fileName) => {
      if (!blob) return;
      const a = document.createElement('a');
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = `${fileName}.json`;
      a.click();
    };

    // export indexedDb
    const exportDatabase = async () => {
      const blob = await exportDB(db, {
        prettyJson: true,
      });
      const date = new Date();
      const filename = `tagdown_${date.getTime()}`;
      exportJsonFile(blob, filename);
    };

    // import indexedDb
    const importDatabase = ref(null);
    const importDatabaseHandler = () => {
      if (importDatabase.value) importDatabase.value.click();
    };

    const inputFile = async (event) => {
      if (!event.target.files || event.target.files.length === 0) return;
      const file = event.target.files[0];
      await importInto(db, file, {
        overwriteValues: true,
      }).then(() => {
        console.log('import database successful!');
        setMsg(true, '成功');
      }).catch((err) => {
        console.log(err);
        setMsg(false, '失败');
      });
    };

    /**
     * delete indexedDb
     */
    const showDeleteIndexedDBConfirmModal = ref(false);

    const deleteDatabaseHandler = () => {
      showDeleteIndexedDBConfirmModal.value = true;
    };

    const getDeleteIndexedDBResult = async (value) => {
      if (value) {
        const promiseArr = [];
        promiseArr.push(db.bookmark.clear());
        promiseArr.push(db.star.clear());
        promiseArr.push(db.share.clear());
        Promise.all(promiseArr).then(() => {
          console.log('database delete successful!');
          setMsg(true, '成功', true);
        }).catch((err) => {
          console.log(err);
          setMsg(false, '失败', true);
        });
      }
    };

    /**
     * export bookmarks
     */
    // export bookmarks by tags
    const tagShareable = ref(false);
    const allTags = ref([]);
    const selectTags = ref(new Set());
    onMounted(async () => {
      allTags.value = await db.bookmark.orderBy('tags').uniqueKeys();
    });
    const toggleTagHandler = (tag) => {
      if (selectTags.value.has(tag)) {
        selectTags.value.delete(tag);
      } else {
        selectTags.value.add(tag);
      }
    };

    const getBookmarksByTag = (tag, shareableIds = []) => new Promise((resolve, reject) => {
      if (tagShareable.value) {
        db.bookmark.where('tags').equals(tag).filter((item) => shareableIds.includes(item.id)).toArray()
          .then((result) => {
            resolve({
              tag,
              bookmarks: result,
            });
          });
      } else {
        db.bookmark.where('tags').equals(tag).toArray().then((result) => {
          resolve({
            tag,
            bookmarks: result,
          });
        });
      }
    });

    // export bookmarks by groups
    const groupShareable = ref(false);
    const allGroups = ref([]);
    const selectGroups = ref(new Set());
    onMounted(async () => {
      allGroups.value = await db.bookmark.orderBy('groups').uniqueKeys();
    });
    const toggleGroupHandler = (group) => {
      if (selectGroups.value.has(group)) {
        selectGroups.value.delete(group);
      } else {
        selectGroups.value.add(group);
      }
    };

    const getBookmarksByGroup = (group, shareableIds = []) => new Promise((resolve, reject) => {
      if (groupShareable.value) {
        db.bookmark.where('groups').equals(group).filter((item) => shareableIds.includes(item.id)).toArray()
          .then((result) => {
            resolve({
              group,
              bookmarks: result,
            });
          });
      } else {
        db.bookmark.where('groups').equals(group).toArray().then((result) => {
          resolve({
            group,
            bookmarks: result,
          });
        });
      }
    });

    const getShareableIds = async () => {
      const result = await db.share.where('share').equals(1).primaryKeys();
      return result;
    };

    const exportBookmarks = async (type) => {
      console.log('export bookmarks');
      let result = [];
      const promiseArr = [];
      let shareableIds = [];

      if (type === 'tag' && selectTags.value.size > 0) {
        const selectTagsArr = [...selectTags.value];
        if (tagShareable.value) {
          shareableIds = await getShareableIds();
        }
        selectTagsArr.forEach((tag) => {
          promiseArr.push(getBookmarksByTag(tag, shareableIds));
        });
        result = await Promise.all(promiseArr);
      } else if (type === 'group' && selectGroups.value.size > 0) {
        const selectGroupsArr = [...selectGroups.value];
        if (groupShareable.value) {
          shareableIds = await getShareableIds();
        }
        selectGroupsArr.forEach((group) => {
          promiseArr.push(getBookmarksByGroup(group, shareableIds));
        });
        result = await Promise.all(promiseArr);
      }
      if (result.length === 0) return;
      const jsonFile = JSON.stringify(result, null, 2);
      const blob = new Blob([jsonFile], { type: 'application/json' });
      const date = new Date();
      const filename = `bookmarks_by_${type}_${date.getTime()}`;
      exportJsonFile(blob, filename);
    };

    return {
      popupState,
      setPopupState,
      popupBrowser,
      setPopupBrowser,
      showMsg,
      msg,
      exportDatabase,
      importDatabase,
      importDatabaseHandler,
      inputFile,
      deleteDatabaseHandler,
      showDeleteIndexedDBConfirmModal,
      getDeleteIndexedDBResult,
      tagShareable,
      allTags,
      selectTags,
      toggleTagHandler,
      groupShareable,
      allGroups,
      selectGroups,
      toggleGroupHandler,
      exportBookmarks,
    };
  },
};
</script>

<style lang="scss" scoped>
.dissolve-enter-from,
.dissolve-leave-to {
  opacity: 0;
}

.dissolve-enter-active,
.dissolve-leave-active {
  transition: opacity 0.5s ease-out;
}

label,
button {
  user-select: none;
}
</style>
